package com.deepantechjournal.practiceweb.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

@RestController
@RequestMapping("/api/security")
@CrossOrigin(origins = "*")
public class SecurityController {

    private final AtomicInteger counter = new AtomicInteger(0);

    @PostMapping("/xss-test")
    public ResponseEntity<Map<String, String>> xssTest(@RequestBody Map<String, String> body) {
        String text = body.getOrDefault("text", "");
        return ResponseEntity.ok(Map.of("received", text));
    }

    @PostMapping("/sql-test")
    public ResponseEntity<Map<String, String>> sqlTest(@RequestBody Map<String, String> body) {
        String query = body.getOrDefault("query", "");
        boolean isInjection = query.contains("' OR '1'='1") || query.toLowerCase().contains("drop");
        return ResponseEntity.ok(Map.of(
                "query", query,
                "status", isInjection ? "injection-detected" : "safe"
        ));
    }

    @GetMapping("/csrf-check")
    public ResponseEntity<Map<String, String>> csrfCheck(
            @RequestHeader(value = "X-CSRF-TOKEN", required = false) String token) {
        if (token == null) {
            return ResponseEntity.status(403).body(Map.of("error", "Missing CSRF Token"));
        }
        return ResponseEntity.ok(Map.of("status", "Valid CSRF Token"));
    }

    @GetMapping("/rate-limit")
    public ResponseEntity<Map<String, String>> rateLimit() {
        int count = counter.incrementAndGet();
        if (count > 5) {
            return ResponseEntity.status(429).body(Map.of(
                    "error", "Too Many Requests",
                    "limit", "5 requests max"
            ));
        }
        return ResponseEntity.ok(Map.of("count", String.valueOf(count)));
    }
}

