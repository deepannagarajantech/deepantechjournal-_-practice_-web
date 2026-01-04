package com.deepantechjournal.practiceweb.repositories;

import com.deepantechjournal.practiceweb.models.Product;
import com.deepantechjournal.practiceweb.models.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ProductImageRepository extends JpaRepository<ProductImage, UUID> {
    List<ProductImage> findByProduct(Product product);
}

