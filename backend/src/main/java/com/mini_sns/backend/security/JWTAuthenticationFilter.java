package com.mini_sns.backend.security;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import com.mini_sns.backend.service.CustomUserDetailsService;

import java.io.IOException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JWTAuthenticationFilter extends OncePerRequestFilter {
    private final JWTUtils jwtUtils;
    private final CustomUserDetailsService userDetailsService;

    public JWTAuthenticationFilter(JWTUtils jwtUtils, CustomUserDetailsService service) {
        this.jwtUtils = jwtUtils;
        this.userDetailsService = service;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // 🔍 디버그용 변수
        String requestPath = request.getRequestURI();
        String requestToken = null;

        // 🔍 디버그 로그 출력
        System.out.println("[JWT FILTER] Incoming Path: " + requestPath);

        String path = request.getRequestURI();

        // permitAll 경로는 JWT 검사 X
        if (path.startsWith("/api/member/join") ||
                path.startsWith("/api/member/check") ||
                path.startsWith("/api/auth/login")) {
            filterChain.doFilter(request, response);
            return;
        }
        String token = null;
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            token = header.substring(7);
        }

        if (token == null) {
            if (request.getCookies() != null) {
                for (Cookie cookie : request.getCookies()) {
                    if ("token".equals(cookie.getName())) {
                        token = cookie.getValue();
                        break;
                    }
                }
            }
        }

        if (token != null && jwtUtils.validateToken(token)) {
            String email = jwtUtils.extractEmail(token);
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);

            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(userDetails, null,
                    userDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(auth);
        }

        filterChain.doFilter(request, response);
    }
}
