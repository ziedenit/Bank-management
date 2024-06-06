      // Construct the query
        Query query = new Query();
        query.addCriteria(Criteria.where("Intervenant.idReper").in(ids));

        // Execute the query and retrieve the results
        List<Financement> financements = mongoTemplate.find(query, Financement.class);

        // Extract DPE objects from the retrieved Financement objects
        return financements.stream()
                .map(financement -> {
                    ObjetFinancement firstObjetFinancement = financement.getObjetFinancement().get(0);
                    return firstObjetFinancement != null ? firstObjetFinancement.getBien().getDpeActuel() : null;
                })
                .collect(Collectors.toList());
    }
