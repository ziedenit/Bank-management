import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

public class FinancementService {

    private FinancementRepository financementRepository;

    public Financement patchFinancementChamps(String idFinancement, Financement financementToUpdate) throws Exception {
        Financement existingFinancement = financementRepository.findByidFinancement(idFinancement)
                .orElseThrow(() -> new FinancementNotFoundException(String.format("Le financement à modifier %s est inexistant", idFinancement)));

        merge(existingFinancement, financementToUpdate);

        return financementRepository.save(existingFinancement);
    }

    private void merge(Object target, Object source) throws Exception {
        Field[] fields = source.getClass().getDeclaredFields();
        List<String> bienFields = Arrays.asList(
                "codeBatiment", "typeBatiment", "numeroVoie", "typeVoie", "nomRue", "batiment", "escalier", "etage", "porte", "codePostal", "nomCommune",
                "paysBien", "adresseComplete", "codeNormeThermique", "etatBien", "typeEnergie", "codeTypeEnergie", "codeDepartement", "codeInseeCommune",
                "numeroLot", "numeroNomRue", "typeUsage", "anneeConstruction", "periodeConstruction", "dateDepotPc", "dateDebutConstruction", "surfaceBien",
                "numeroFiscalLocal", "coordonneeCartographiqueX", "coordonneeCartographiqueY", "prixBien", "montantFinanceLCL", "partLCL"
        );

        List<String> dpeFields = Arrays.asList(
                "numeroDpe", "estimationCep", "classeCep", "estimationGes", "classeGes", "dateEtablissementDpe",
                "dateReceptionDpe", "dateFinValiditeDpe", "sirenDiagnostiqueur"
        );

        for (Field field : fields) {
            field.setAccessible(true);
            try {
                Object value = field.get(source);
                if (value != null) {
                    if (isComplexObject(field.getType())) {
                        Object targetValue = field.get(target);
                        if (targetValue == null) {
                            field.set(target, value);
                        } else {
                            merge(targetValue, value);
                        }
                    } else if (List.class.isAssignableFrom(field.getType())) {
                        mergeList(field, target, source);
                    } else {
                        field.set(target, value);
                    }
                } else {
                    if (field.getType().equals(Date.class) || bienFields.contains(field.getName()) || dpeFields.contains(field.getName())) {
                        field.set(target, null);
                    }
                }
            } catch (IllegalAccessException e) {
                throw new Exception("Failed to merge field: " + e.getMessage());
            }
        }
    }

    private void mergeList(Field field, Object target, Object source) throws Exception {
        List<?> sourceList = (List<?>) field.get(source);
        List<?> targetList = (List<?>) field.get(target);

        if (sourceList == null || sourceList.isEmpty()) {
            return;
        }

        if (targetList == null) {
            targetList = new ArrayList<>(sourceList);
            field.set(target, targetList);
            return;
        }

        for (Object sourceItem : sourceList) {
            Object sourceId = getId(sourceItem);
            Optional<?> targetItemOpt = targetList.stream()
                    .filter(item -> {
                        try {
                            return Objects.equals(getId(item), sourceId);
                        } catch (Exception e) {
                            throw new RuntimeException(e);
                        }
                    })
                    .findFirst();

            if (targetItemOpt.isPresent()) {
                merge(targetItemOpt.get(), sourceItem);
            } else {
                targetList.add(sourceItem);
            }
        }
    }

    private Object getId(Object object) throws Exception {
        Field idField = Arrays.stream(object.getClass().getDeclaredFields())
                .filter(field -> field.getName().startsWith("id"))
                .findFirst()
                .orElseThrow(() -> new Exception("No id field found in object of type " + object.getClass().getSimpleName()));

        idField.setAccessible(true);
        return idField.get(object);
    }

    private boolean isComplexObject(Class<?> clazz) {
        return !clazz.isPrimitive() && !String.class.isAssignableFrom(clazz) && !Number.class.isAssignableFrom(clazz)
                && !Boolean.class.isAssignableFrom(clazz) && !Date.class.isAssignableFrom(clazz)
                && !clazz.isEnum();
    }
}
