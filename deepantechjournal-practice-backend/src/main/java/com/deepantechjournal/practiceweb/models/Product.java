package com.deepantechjournal.practiceweb.models;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "products")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class Product {

    @Id
    @GeneratedValue
    private UUID id;

    private String name;
    private String description;

    @Column(precision = 10, scale = 2)
    private BigDecimal price;

    private Integer stock;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    private Instant createdAt = Instant.now();
}

