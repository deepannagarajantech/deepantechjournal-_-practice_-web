package com.deepantechjournal.practiceweb.config;

import com.deepantechjournal.practiceweb.models.User;
import com.deepantechjournal.practiceweb.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminDataLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminDataLoader(UserRepository userRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        userRepository.findByEmail("admin@testcrafthub.com")
                .orElseGet(() -> userRepository.save(
                        User.builder()
                                .name("Admin User")
                                .email("admin@testcrafthub.com")
                                .password(passwordEncoder.encode("Admin@123"))
                                .role("ADMIN")
                                .build()
                ));
        System.out.println("Default ADMIN ready: admin@testcrafthub.com / Admin@123");
    }
}

