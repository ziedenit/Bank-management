   // Act and Assert
        mockMvc.perform(get("/listObjetFinancement/" + idFinancement)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json("[{\"idObjetFinancement\":\"obj1\"},{\"idObjetFinancement\":\"obj2\"}]"));
    }
