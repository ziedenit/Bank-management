Je veux ameliorer la méthode patch d'un Financement ci bas ( Financement et un objet mongo qui contient plusieurs objets imbriqué je veux faire un patch par champs) sans creer des doublant la méthode ci bas fonctionne mais j'aimerai bien l'ameliorer


package com.cl.msofd.model;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;

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


public Financement patchFinancementChamps(String idFinancement, Financement financementToUpdate) throws Exception {
        // Récupère le financement existant
        Financement existingFinancement = financementRepository.findByidFinancement(idFinancement)
                .orElseThrow(() -> new FinancementNotFoundException(String.format("Le financement à modifier %s est inexistant", idFinancement)));

        // Mise à jour les objets de financement
        if (financementToUpdate.getObjetFinancement() != null) {
            for (ObjetFinancement updatedObjet : financementToUpdate.getObjetFinancement()) {
                boolean found = false;
                for (int i = 0; i < existingFinancement.getObjetFinancement().size(); i++) {
                    ObjetFinancement existingObjet = existingFinancement.getObjetFinancement().get(i);
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

        // Mise à jour les autres champs de financement
        mergeNonListFields(existingFinancement, financementToUpdate);

        // Sauvegarder le financement mis à jour
        Financement savedFinancement = financementRepository.save(existingFinancement);

        // Supprimer l'ancien financement
        financementRepository.deleteByIdFinancement(existingFinancement.getIdFinancement());

        return savedFinancement;
    }

    private void merge(Object target, Object source) throws Exception {
        Field[] fields = source.getClass().getDeclaredFields();
        for (Field field : fields) {
            field.setAccessible(true);
            Object value = field.get(source);
            if (value != null) {
                field.set(target, value);
            }
        }
    }

    private void mergeNonListFields(Object target, Object source) throws Exception {
        Field[] fields = source.getClass().getDeclaredFields();
        for (Field field : fields) {
            if (!field.getName().equals("objetFinancement")) { // Ignore the objetFinancement field
                field.setAccessible(true);
                Object value = field.get(source);
                if (value != null) {
                    field.set(target, value);
                }
            }
        }
    }
