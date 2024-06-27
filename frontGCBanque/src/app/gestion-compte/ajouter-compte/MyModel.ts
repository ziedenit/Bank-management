package com.cl.msofd.model;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Financement implements Serializable {

    private String idFinancement;

    @NotNull(message = "Objet financement est obligatoire")
    @Valid
    private List<ObjetFinancement> objetFinancement;

    private Alignement alignement;
    private Eligibilite eligibilite;
    private Intervenant intervenant;

    private String indicateurFinancementDedie;
    private String indicateurNatureDurable;
    private String typeRisqueClimatiqueAttenue;

    @Pattern(regexp = "^(01|02|03|04|05|06|07|08)$", message = "le champs codeApplicatifOrigine doit etre l'une des valeurs 01 (VIC ou NECI) 02 (PI) 03 (CPPE) 04 (SIRIUS) 05 (DPAR) 06 (DPRO) 07 (CRM360) GGAR (08)")
    private String codeApplicatifOrigine;

    private boolean indicateurReprise;
    private int statut;

    @Size(min = 16, max = 16, message = "La taille du champs agenceCompte doit etre égale à 16")
    private String agenceCompte;

    @Min(0)
    private Double valeurTravaux;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Financement)) return false;
        Financement that = (Financement) o;
        return indicateurReprise == that.indicateurReprise &&
                statut == that.statut &&
                Objects.equals(idFinancement, that.idFinancement) &&
                Objects.equals(objetFinancement, that.objetFinancement) &&
                Objects.equals(alignement, that.alignement) &&
                Objects.equals(eligibilite, that.eligibilite) &&
                Objects.equals(intervenant, that.intervenant) &&
                Objects.equals(indicateurFinancementDedie, that.indicateurFinancementDedie) &&
                Objects.equals(indicateurNatureDurable, that.indicateurNatureDurable) &&
                Objects.equals(typeRisqueClimatiqueAttenue, that.typeRisqueClimatiqueAttenue) &&
                Objects.equals(codeApplicatifOrigine, that.codeApplicatifOrigine) &&
                Objects.equals(agenceCompte, that.agenceCompte) &&
                Objects.equals(valeurTravaux, that.valeurTravaux);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idFinancement, objetFinancement, alignement, eligibilite, intervenant, indicateurFinancementDedie, indicateurNatureDurable, typeRisqueClimatiqueAttenue, codeApplicatifOrigine, indicateurReprise, statut, agenceCompte, valeurTravaux);
    }
}

public class FinancementService {

    private FinancementRepository financementRepository;

    public Financement patchFinancementChamps(String idFinancement, Financement financementToUpdate) throws Exception {
        // Récupère le financement existant
        Financement existingFinancement = financementRepository.findByIdFinancement(idFinancement)
                .orElseThrow(() -> new FinancementNotFoundException(String.format("Le financement à modifier %s est inexistant", idFinancement)));

        // Mise à jour des champs de financement
        mergeFields(existingFinancement, financementToUpdate);

        // Sauvegarder le financement mis à jour
        Financement savedFinancement = financementRepository.save(existingFinancement);

        // Supprimer l'ancien financement
        financementRepository.deleteByIdFinancement(existingFinancement.getIdFinancement());

        return savedFinancement;
    }

    private void mergeFields(Financement target, Financement source) throws Exception {
        Field[] fields = Financement.class.getDeclaredFields();
        for (Field field : fields) {
            field.setAccessible(true);
            Object value = field.get(source);
            if (value != null) {
                if (value instanceof List) {
                    mergeListFields((List<?>) field.get(target), (List<?>) value);
                } else {
                    field.set(target, value);
                }
            }
        }
    }

    private void mergeListFields(List<?> targetList, List<?> sourceList) throws Exception {
        for (Object sourceItem : sourceList) {
            boolean found = false;
            for (Object targetItem : targetList) {
                Field idField = findIdField(sourceItem.getClass());
                if (idField != null) {
                    idField.setAccessible(true);
                    Object sourceId = idField.get(sourceItem);
                    Object targetId = idField.get(targetItem);
                    if (sourceId != null && sourceId.equals(targetId)) {
                        merge(sourceItem, targetItem);
                        found = true;
                        break;
                    }
                }
            }
            if (!found) {
                targetList.add(sourceItem);
            }
        }
    }

    private Field findIdField(Class<?> clazz) {
        for (Field field : clazz.getDeclaredFields()) {
            if (field.getName().toLowerCase().contains("id")) {
                return field;
            }
        }
        return null;
    }

    private void merge(Object source, Object target) throws Exception {
        Field[] fields = source.getClass().getDeclaredFields();
        for (Field field : fields) {
            field.setAccessible(true);
            Object value = field.get(source);
            if (value != null) {
                field.set(target, value);
            }
        }
    }
}
