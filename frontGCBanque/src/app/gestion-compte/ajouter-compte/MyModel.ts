package com.cl.msofd.service;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Service
public class IdGeneratorService {
    private IdGeneratorService() {
    }

    public String generateId(String objet) {
    	
        StringBuilder idfdBuilder = new StringBuilder();
        String characters = "abcdefghijklmnopqrstuvwxyz0123456789";
        SecureRandom secureRandom = new SecureRandom();
        for (int i = 0; i < 8; i++) {
            int randomIndex = (int) (secureRandom.nextDouble() * characters.length());
            char randomChar = characters.charAt(randomIndex);
            idfdBuilder.append(randomChar);
        }
        return objet+idfdBuilder.toString().toUpperCase();
    }
}

