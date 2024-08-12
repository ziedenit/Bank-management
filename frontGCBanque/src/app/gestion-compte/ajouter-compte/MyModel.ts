public Financement patchFinancementChamps(String idFinancement, Financement financementToUpdate) throws InvocationTargetException, IllegalAccessException {
    Financement existingFinancement = getFinancementByIdFinancement(idFinancement);

    // Update simple fields of Financement
    merge(existingFinancement, financementToUpdate);

    // Update ObjetFinancement list
    if (financementToUpdate.getObjetFinancement() != null) {
        for (ObjetFinancement updatedObjet : financementToUpdate.getObjetFinancement()) {
            boolean found = false;
            for (ObjetFinancement existingObjet : existingFinancement.getObjetFinancement()) {
                if (existingObjet.getIdObjetFinancement().equals(updatedObjet.getIdObjetFinancement())) {
                    merge(existingObjet, updatedObjet);
                    found = true;
                    break;
                }
            }
            if (!found) {
                existingFinancement.getObjetFinancement().add(updatedObjet);
            }
        }
    }

    // Save and delete the existing Financement
    Financement savedFinancement = financementRepository.save(existingFinancement);
    financementRepository.deleteByIdFinancement(existingFinancement.getIdFinancement());

    return savedFinancement;
}

private void merge(Object target, Object source) throws InvocationTargetException, IllegalAccessException {
    Map<String, Method> targetSetters = new HashMap<>();
    for (Method method : target.getClass().getMethods()) {
        if (method.getName().startsWith("set") && method.getParameterCount() == 1) {
            targetSetters.put(method.getName().substring(3).toLowerCase(), method);
        }
    }
    for (Method method : source.getClass().getMethods()) {
        if (method.getName().startsWith("get") && method.getParameterCount() == 0) {
            String fieldName = method.getName().substring(3).toLowerCase();
            Object value = method.invoke(source);
            if (value != null && targetSetters.containsKey(fieldName)) {
                Method setter = targetSetters.get(fieldName);
                setter.invoke(target, value);
            }
        }
    }
}
