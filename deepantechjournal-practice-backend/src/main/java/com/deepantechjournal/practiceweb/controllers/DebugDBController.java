package com.deepantechjournal.practiceweb.controllers;

import com.deepantechjournal.practiceweb.repositories.ProductRepository;
import com.deepantechjournal.practiceweb.repositories.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/debug/db")
@CrossOrigin(origins = "*")
public class DebugDBController {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final JdbcTemplate jdbcTemplate;

    public DebugDBController(UserRepository userRepository,
                             ProductRepository productRepository,
                             JdbcTemplate jdbcTemplate) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> users() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @GetMapping("/products")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> products() {
        return ResponseEntity.ok(productRepository.findAll());
    }

    @PostMapping("/execute")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> executeSql(@RequestBody Map<String, String> body) {
        String sql = body.getOrDefault("sql", "").trim();
        if (sql.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "SQL query is required"));
        }

        try {
            // Very basic safety check - in reality, do NOT expose this in prod!
            String lowerSql = sql.toLowerCase();
            if (lowerSql.startsWith("select")) {
                List<Map<String, Object>> result = jdbcTemplate.queryForList(sql);
                return ResponseEntity.ok(result);
            } else {
                int rows = jdbcTemplate.update(sql);
                return ResponseEntity.ok(Map.of("status", "success", "rowsAffected", rows));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}

