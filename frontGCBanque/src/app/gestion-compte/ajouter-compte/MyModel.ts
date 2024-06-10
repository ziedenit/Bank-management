j'ai ce service qui patch un objet mongo ayant des objet imbrique la structure de l'objet est la suivante :
package com.cl.msofd.model;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.io.Serializable;
import java.util.ArrayList;
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
    private List<ObjetFinancement> objetFinancement ;

    private Alignement alignement;
    private Eligibilite eligibilite;

    @NotNull(message = "Intervenant est obligatoire")
    @Valid
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
//
le patch par champs est le suivant 
  public Financement patchFinancementChamps(String idFinancement, Financement financementToUpdate) throws Exception {
        Financement existingFinancement = financementRepository.findByidFinancement(idFinancement)
                .orElseThrow(() -> new FinancementNotFoundException(String.format("Le financement à modifier %s est inexistant", idFinancement)));

        merge(existingFinancement, financementToUpdate);

      
        return financementRepository.save(existingFinancement);
    }  
  private void merge(Object target, Object source) throws Exception {
        Field[] fields = source.getClass().getDeclaredFields();
        ArrayList<String> bienFields = new ArrayList<>(
                Arrays.asList(
                        "codeBatiment", "typeBatiment", "numeroVoie", "typeVoie", "nomRue", "batiment", "escalier", "etage", "porte", "codePostal", "nomCommune",
                        "paysBien", "adresseComplete", "codeNormeThermique", "etatBien", "typeEnergie", "codeTypeEnergie", "codeDepartement", "codeInseeCommune",
                        "numeroLot", "numeroNomRue", "typeUsage", "anneeConstruction", "periodeConstruction", "dateDepotPc", "dateDebutConstruction", "surfaceBien",
                        "numeroFiscalLocal", "coordonneeCartographiqueX", "coordonneeCartographiqueY", "prixBien", "montantFinanceLCL", "partLCL"));
     
        ArrayList<String> dpeFields = new ArrayList<>(
                Arrays.asList("numeroDpe", "estimationCep", "classeCep", "estimationGes", "classeGes", "dateEtablissementDpe",
                        "dateReceptionDpe", "dateFinValiditeDpe", "sirenDiagnostiqueur"));
     
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
// je test le patche du financement ayant une liste de deux objet de financement 
{
    "idFinancement": "FEHXPORXH",
    "objetFinancement": [
        {
            "idObjetFinancement": "OKH40PG4X",
            "codeObjetFinancement": "0203",
            "quotePartObjet": 100.0,
            "codeFamilleObjet": null,
            "gainCEP": 25.0,
            "dateFinTravaux": null,
            "bien": {
                "idBien": null,
                "codeBatiment": null,
                "typeBatiment": "maison",
                "numeroVoie": null,
                "typeVoie": null,
                "nomRue": null,
                "batiment": null,
                "escalier": null,
                "etage": null,
                "porte": null,
                "codePostal": "91300",
                "nomCommune": null,
                "paysBien": null,
                "adresseComplete": "73 rue gutenberg, 91300 Massy",
                "codeNormeThermique": null,
                "etatBien": null,
                "typeEnergie": null,
                "codeTypeEnergie": null,
                "codeDepartement": null,
                "codeInseeCommune": null,
                "numeroLot": null,
                "numeroNomRue": null,
                "typeUsage": null,
                "anneeConstruction": null,
                "periodeConstruction": null,
                "dateDepotPc": null,
                "dateDebutConstruction": null,
                "surfaceBien": null,
                "bienFinanceLCL": false,
                "numeroFiscalLocal": null,
                "eligibleDpe": null,
                "labelBien": null,
                "coordonneeCartographiqueX": null,
                "coordonneeCartographiqueY": null,
                "prixBien": null,
                "montantFinanceLCL": 10000.0,
                "partLCL": null,
                "dpeActuel": {
                    "idDpe": null,
                    "numeroDpe": "2156E1018488U2",
                    "codeModeleDpeType": null,
                    "estimationCep": 100.0,
                    "classeCep": "A",
                    "estimationGes": 42.0,
                    "classeGes": "C",
                    "dateEtablissementDpe": "2017-02-06T00:00:00.000+00:00",
                    "dateReceptionDpe": null,
                    "dateFinValiditeDpe": null,
                    "sirenDiagnostiqueur": null,
                    "modelDpe": null,
                    "numeroDpeRemplace": null,
                    "versionDpe": null,
                    "methodeDpeApplique": null
                }
            },
            "dpeAvantTravaux": null,
            "dpeApresTravaux": null,
            "alignement": null,
            "eligibilite": null,
            "garantie": null,
            "piecesJustificatives": null,
            "statut": 0
        },
        {
            "idObjetFinancement": "OPUDQ4U94",
            "codeObjetFinancement": "0203",
            "quotePartObjet": 100.0,
            "codeFamilleObjet": null,
            "gainCEP": 25.0,
            "dateFinTravaux": null,
            "bien": {
                "idBien": null,
                "codeBatiment": null,
                "typeBatiment": "maison",
                "numeroVoie": null,
                "typeVoie": null,
                "nomRue": null,
                "batiment": null,
                "escalier": null,
                "etage": null,
                "porte": null,
                "codePostal": "91300",
                "nomCommune": null,
                "paysBien": null,
                "adresseComplete": "73 rue gutenberg, 91300 Massy",
                "codeNormeThermique": null,
                "etatBien": null,
                "typeEnergie": null,
                "codeTypeEnergie": null,
                "codeDepartement": null,
                "codeInseeCommune": null,
                "numeroLot": null,
                "numeroNomRue": null,
                "typeUsage": null,
                "anneeConstruction": null,
                "periodeConstruction": null,
                "dateDepotPc": null,
                "dateDebutConstruction": null,
                "surfaceBien": null,
                "bienFinanceLCL": false,
                "numeroFiscalLocal": null,
                "eligibleDpe": null,
                "labelBien": null,
                "coordonneeCartographiqueX": null,
                "coordonneeCartographiqueY": null,
                "prixBien": null,
                "montantFinanceLCL": 10000.0,
                "partLCL": null,
                "dpeActuel": {
                    "idDpe": null,
                    "numeroDpe": "2156E1018488U2",
                    "codeModeleDpeType": null,
                    "estimationCep": 100.0,
                    "classeCep": "B",
                    "estimationGes": 42.0,
                    "classeGes": "C",
                    "dateEtablissementDpe": "2017-02-06T00:00:00.000+00:00",
                    "dateReceptionDpe": null,
                    "dateFinValiditeDpe": null,
                    "sirenDiagnostiqueur": null,
                    "modelDpe": null,
                    "numeroDpeRemplace": null,
                    "versionDpe": null,
                    "methodeDpeApplique": null
                }
            },
            "dpeAvantTravaux": null,
            "dpeApresTravaux": null,
            "alignement": null,
            "eligibilite": null,
            "garantie": null,
            "piecesJustificatives": null,
            "statut": 0
        }
    ],
    "alignement": null,
    "eligibilite": null,
    "intervenant": {
        "idIntervenant": null,
        "idReper": [
            "1559518855"
        ]
    },
    "indicateurFinancementDedie": "Y",
    "indicateurNatureDurable": "Z",
    "typeRisqueClimatiqueAttenue": null,
    "codeApplicatifOrigine": "01",
    "indicateurReprise": false,
    "statut": 0,
    "agenceCompte": "1234567890000000",
    "valeurTravaux": null
}
// le financement to update est le suivant 
{"objetFinancement": [
        {
            "idObjetFinancement": "OKH40PG4X",
            "codeObjetFinancement": "02",
            "quotePartObjet": 70.0
        },
     {
            "idObjetFinancement": "OPUDQ4U94",
            "codeObjetFinancement": "02",
            "quotePartObjet": 70.0
        }
]}
// normalement le service doit patcher la liste de objets financement  et  garder les deux objets alors que le resultat ca duplique le financement et ayant id = FEHXPORXH et ne patch pas tres bien les deux objets financement
{
    "idFinancement": "FEHXPORXH",
    "objetFinancement": [
        {
            "idObjetFinancement": "OKH40PG4X",
            "codeObjetFinancement": "02",
            "quotePartObjet": 70.0,
            "codeFamilleObjet": null,
            "gainCEP": null,
            "dateFinTravaux": null,
            "bien": null,
            "dpeAvantTravaux": null,
            "dpeApresTravaux": null,
            "alignement": null,
            "eligibilite": null,
            "garantie": null,
            "piecesJustificatives": null,
            "statut": 0
        },
        {
            "idObjetFinancement": "OPUDQ4U94",
            "codeObjetFinancement": "02",
            "quotePartObjet": 70.0,
            "codeFamilleObjet": null,
            "gainCEP": null,
            "dateFinTravaux": null,
            "bien": null,
            "dpeAvantTravaux": null,
            "dpeApresTravaux": null,
            "alignement": null,
            "eligibilite": null,
            "garantie": null,
            "piecesJustificatives": null,
            "statut": 0
        }
    ],
    "alignement": null,
    "eligibilite": null,
    "intervenant": {
        "idIntervenant": null,
        "idReper": [
            "1559518855"
        ]
    },
    "indicateurFinancementDedie": "Y",
    "indicateurNatureDurable": "Z",
    "typeRisqueClimatiqueAttenue": null,
    "codeApplicatifOrigine": "01",
    "indicateurReprise": false,
    "statut": 0,
    "agenceCompte": "1234567890000000",
    "valeurTravaux": null
}
et ca 
{
    "idFinancement": "FEHXPORXH",
    "objetFinancement": [
        {
            "idObjetFinancement": "OKH40PG4X",
            "codeObjetFinancement": "02",
            "quotePartObjet": 80.0,
            "codeFamilleObjet": null,
            "gainCEP": null,
            "dateFinTravaux": null,
            "bien": null,
            "dpeAvantTravaux": null,
            "dpeApresTravaux": null,
            "alignement": null,
            "eligibilite": null,
            "garantie": null,
            "piecesJustificatives": null,
            "statut": 0
        }
    ],
    "alignement": null,
    "eligibilite": null,
    "intervenant": {
        "idIntervenant": null,
        "idReper": [
            "1559518855"
        ]
    },
    "indicateurFinancementDedie": "Y",
    "indicateurNatureDurable": "Z",
    "typeRisqueClimatiqueAttenue": null,
    "codeApplicatifOrigine": "01",
    "indicateurReprise": false,
    "statut": 0,
    "agenceCompte": "1234567890000000",
    "valeurTravaux": null
}
