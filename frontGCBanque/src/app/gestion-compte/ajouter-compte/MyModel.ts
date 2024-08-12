 public Financement patchFinancementChamps(String idFinancement, Financement financementToUpdate) throws InvocationTargetException, IllegalAccessException {
        Financement existingFinancement = getFinancementByIdFinancement(idFinancement);
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
        }//
package com.cl.msofd.model;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import java.io.Serializable;
import java.util.List;

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
 
   

}
je veux adapter la méthode patchFinancementpar champs pour quel partch aussi les champs de financement comme par example indicateurFinancementDedie
        exemple de json d'un objet a patcher http://localhost:8081/api/v1/financement/champs/FOXPHDNG1
{

     "indicateurFinancementDedie": "indicat",
    "objetFinancement": [
        {
            "idObjetFinancement": "OYHXZEISV",
              "codeObjetFinancement": "02",
             "bien": {
            "montantFinanceLCL":800000,
             "prixBien": 11000,
                "partLCL": 13,
                  "dpeActuel": 
                  {
                    "numeroDpe"
:
"1234567890123",
                    "classeCep": "C",
  "estimationCep": 300.0,
  "classeGes": "C",
  "estimationGes": 5.0
                    
                  }
             },
            "firstDisconnectionOfd": false,
            "statut": 4
        }
    ]
}
