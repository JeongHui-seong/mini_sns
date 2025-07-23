package com.mini_sns.backend.controller;

import java.sql.Connection;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @Autowired
    private DataSource dataSource;

    @GetMapping("/health")
    public String healthCheck() {
        try (Connection conn = dataSource.getConnection()) {
            return "DB Connected: " + conn.getCatalog();
        } catch (Exception e) {
            return "DB Connection Failed: " + e.getMessage();
        }
    }
}
