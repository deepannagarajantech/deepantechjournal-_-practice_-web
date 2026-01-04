package com.deepantechjournal.practiceweb.controllers;

import com.deepantechjournal.practiceweb.models.Product;
import com.deepantechjournal.practiceweb.models.ProductImage;
import com.deepantechjournal.practiceweb.repositories.ProductImageRepository;
import com.deepantechjournal.practiceweb.repositories.ProductRepository;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.*;
import java.util.*;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductImageController {

    private final ProductRepository productRepository;
    private final ProductImageRepository imageRepository;

    @Value("${app.storage.product-images-dir}")
    private String productImagesDir;

    public ProductImageController(ProductRepository productRepository,
            ProductImageRepository imageRepository) {
        this.productRepository = productRepository;
        this.imageRepository = imageRepository;
    }

    @PostMapping("/{productId}/images")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> uploadProductImage(
            @PathVariable UUID productId,
            @RequestParam("file") MultipartFile file) {

        Optional<Product> productOpt = productRepository.findById(productId);
        if (productOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Product not found"));
        }
        Product product = productOpt.get();

        try {
            Path dir = Paths.get(productImagesDir).toAbsolutePath().normalize();
            Files.createDirectories(dir);

            String originalFilename = Objects.requireNonNull(file.getOriginalFilename());
            String ext = originalFilename.substring(originalFilename.lastIndexOf('.'));
            String baseName = UUID.randomUUID().toString();

            String imageFileName = baseName + ext;
            String thumbFileName = baseName + "_thumb" + ext;

            Path imagePath = dir.resolve(imageFileName);
            Path thumbPath = dir.resolve(thumbFileName);

            file.transferTo(imagePath.toFile());

            Thumbnails.of(imagePath.toFile())
                    .size(400, 400)
                    .keepAspectRatio(true)
                    .toFile(thumbPath.toFile());

            String imageUrl = "/images/" + imageFileName;
            String thumbUrl = "/images/" + thumbFileName;

            ProductImage pi = ProductImage.builder()
                    .product(product)
                    .imageUrl(imageUrl)
                    .thumbnailUrl(thumbUrl)
                    .build();
            imageRepository.save(pi);

            return ResponseEntity.ok(Map.of(
                    "message", "Image uploaded",
                    "imageUrl", imageUrl,
                    "thumbnailUrl", thumbUrl));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Upload failed", "details", e.getMessage()));
        }
    }

    @GetMapping("/{productId}/images")
    public ResponseEntity<List<Map<String, String>>> getProductImages(@PathVariable UUID productId) {
        Optional<Product> productOpt = productRepository.findById(productId);
        if (productOpt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        Product product = productOpt.get();
        var images = imageRepository.findByProduct(product);

        List<Map<String, String>> result = new ArrayList<>();
        for (ProductImage img : images) {
            result.add(Map.of(
                    "id", img.getId().toString(),
                    "imageUrl", img.getImageUrl(),
                    "thumbnailUrl", img.getThumbnailUrl() == null ? img.getImageUrl() : img.getThumbnailUrl()));
        }
        return ResponseEntity.ok(result);
    }
}

