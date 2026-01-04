package com.deepantechjournal.practiceweb.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "*")
public class FileController {

    @PostMapping("/upload")
    public ResponseEntity<String> upload(@RequestParam("file") MultipartFile file) {
        String info = "File received: " + file.getOriginalFilename() + " (" + file.getSize() + " bytes)";
        return ResponseEntity.ok(info);
    }
}

