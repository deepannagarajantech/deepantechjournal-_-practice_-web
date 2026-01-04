package com.deepantechjournal.practiceweb.controllers;

import com.deepantechjournal.practiceweb.models.Category;
import com.deepantechjournal.practiceweb.models.Product;
import com.deepantechjournal.practiceweb.repositories.CategoryRepository;
import com.deepantechjournal.practiceweb.repositories.ProductRepository;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.math.BigDecimal;
import java.util.*;

@RestController
@RequestMapping("/api/products/bulk")
@CrossOrigin(origins = "*")
public class ProductBulkController {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductBulkController(ProductRepository productRepository,
                                 CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    // -------- CSV Upload (simple) ----------
    @PostMapping("/upload")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> uploadCSV(@RequestParam("file") MultipartFile file) {

        List<String> errors = new ArrayList<>();
        List<String> skipped = new ArrayList<>();
        int successCount = 0;

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            int row = 0;

            while ((line = reader.readLine()) != null) {
                row++;
                if (row == 1) continue;

                try {
                    String[] parts = line.split(",");
                    String name = parts[0].trim();
                    BigDecimal price = new BigDecimal(parts[1].trim());
                    String description = parts[2].trim();
                    Integer stock = Integer.parseInt(parts[3].trim());

                    Optional<Product> existing = productRepository.findByName(name);
                    if (existing.isPresent()) {
                        skipped.add("Row " + row + ": " + name + " | Duplicate (SKIPPED)");
                        continue;
                    }

                    Product product = Product.builder()
                            .name(name)
                            .price(price)
                            .description(description)
                            .stock(stock)
                            .build();

                    productRepository.save(product);
                    successCount++;

                } catch (Exception e) {
                    errors.add("Row " + row + ": " + line + " | Error: " + e.getMessage());
                }
            }

            String reportId = null;
            if (!errors.isEmpty() || !skipped.isEmpty()) {
                reportId = UUID.randomUUID().toString();
                generateCsvReport(reportId, errors, skipped);
            }

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("successCount", successCount);
            response.put("errorCount", errors.size());
            response.put("skippedCount", skipped.size());
            response.put("errorReportId", reportId);

            return ResponseEntity.ok(response);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Invalid file"));
        }
    }

    // -------- Excel Upload (Enterprise-style) ----------
    @PostMapping("/upload-xlsx")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> uploadExcel(@RequestParam("file") MultipartFile file) {

        List<String> errors = new ArrayList<>();
        List<String> skipped = new ArrayList<>();
        int successCount = 0;

        try (InputStream is = file.getInputStream();
             Workbook workbook = new XSSFWorkbook(is)) {

            Sheet sheet = workbook.getSheetAt(0);
            int rowNum = 0;

            for (Row row : sheet) {
                rowNum++;
                if (rowNum == 1) continue; // header

                try {
                    String name = getCellString(row.getCell(0));
                    String sku = getCellString(row.getCell(1));
                    String variant = getCellString(row.getCell(2)); // color/size
                    String categoryName = getCellString(row.getCell(3));
                    BigDecimal price = new BigDecimal(getCellString(row.getCell(4)));
                    Integer stock = Integer.parseInt(getCellString(row.getCell(5)));

                    if (name.isBlank()) {
                        skipped.add("Row " + rowNum + ": missing product name (SKIPPED)");
                        continue;
                    }

                    Optional<Product> existing = productRepository.findByName(name);
                    if (existing.isPresent()) {
                        skipped.add("Row " + rowNum + ": " + name + " | Duplicate (SKIPPED)");
                        continue;
                    }

                    Category category = categoryRepository
                            .findByNameIgnoreCase(categoryName)
                            .orElseGet(() -> categoryRepository.save(
                                    Category.builder().name(categoryName).build()
                            ));

                    Product product = Product.builder()
                            .name(name + (variant.isBlank() ? "" : " - " + variant))
                            .description("SKU: " + sku)
                            .price(price)
                            .stock(stock)
                            .category(category)
                            .build();

                    productRepository.save(product);
                    successCount++;

                } catch (Exception e) {
                    errors.add("Row " + rowNum + ": Error: " + e.getMessage());
                }
            }

            String reportId = null;
            if (!errors.isEmpty() || !skipped.isEmpty()) {
                reportId = UUID.randomUUID().toString();
                generateExcelReport(reportId, errors, skipped);
            }

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("successCount", successCount);
            response.put("errorCount", errors.size());
            response.put("skippedCount", skipped.size());
            response.put("errorReportId", reportId);

            return ResponseEntity.ok(response);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Invalid Excel file"));
        }
    }

    private String getCellString(Cell cell) {
        if (cell == null) return "";
        if (cell.getCellType() == CellType.STRING) return cell.getStringCellValue().trim();
        if (cell.getCellType() == CellType.NUMERIC) return String.valueOf((long) cell.getNumericCellValue());
        return cell.toString().trim();
    }

    private void generateCsvReport(String id, List<String> errors, List<String> skipped) {
        try {
            File dir = new File("error-reports");
            if (!dir.exists()) dir.mkdirs();

            File file = new File(dir, id + ".csv");
            try (PrintWriter writer = new PrintWriter(file)) {
                writer.println("Type,Message");
                for (String e : errors) {
                    writer.println("ERROR," + e.replace(",", ";"));
                }
                for (String s : skipped) {
                    writer.println("SKIPPED," + s.replace(",", ";"));
                }
            }
        } catch (Exception e) {
            System.out.println("Failed to write CSV report: " + e.getMessage());
        }
    }

    private void generateExcelReport(String id, List<String> errors, List<String> skipped) {
        try {
            File dir = new File("error-reports");
            if (!dir.exists()) dir.mkdirs();

            File file = new File(dir, id + "-excel.csv");
            try (PrintWriter writer = new PrintWriter(file)) {
                writer.println("Type,Message");
                for (String e : errors) {
                    writer.println("ERROR," + e.replace(",", ";"));
                }
                for (String s : skipped) {
                    writer.println("SKIPPED," + s.replace(",", ";"));
                }
            }
        } catch (Exception e) {
            System.out.println("Failed to write Excel error report: " + e.getMessage());
        }
    }

    @GetMapping("/download/{reportId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<org.springframework.core.io.Resource> downloadErrorReport(@PathVariable String reportId) throws IOException {
        File file = new File("error-reports/" + reportId + ".csv");
        if (!file.exists()) {
            file = new File("error-reports/" + reportId + "-excel.csv");
            if (!file.exists()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        }
        org.springframework.core.io.InputStreamResource resource = new org.springframework.core.io.InputStreamResource(new FileInputStream(file));
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, "text/csv")
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + file.getName())
                .body(resource);
    }
}

