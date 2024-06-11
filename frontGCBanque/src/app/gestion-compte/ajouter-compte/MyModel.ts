/////////////////////////////////patch financement par champs//////////////////////////////////////////


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

    private boolean isComplexObject(Class<?> type) {
        return !type.isPrimitive() && !type.equals(String.class) && !type.equals(Integer.class) && !type.equals(Long.class)
                && !type.equals(Double.class) && !type.equals(Float.class) && !type.equals(Boolean.class) && !type.equals(Byte.class)
                && !type.equals(Character.class) && !type.equals(Short.class) && !type.equals(Date.class) && !type.equals(List.class)
                ;
    }
//
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
package com.cl.msofd.model;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import lombok.*;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ObjetFinancement implements Serializable {

    private String idObjetFinancement;

    @Pattern(regexp = "^$|(02|03|0203|null)$", message = "code objet financement invalide")
    private String codeObjetFinancement;

    @Min(0)
    @Max(100)
    private Double quotePartObjet;

    private String codeFamilleObjet;
    private Double gainCEP;
    private Date dateFinTravaux;

    @Valid
    private Bien bien;

    private Dpe dpeAvantTravaux;
    private Dpe dpeApresTravaux;
    private Alignement alignement;
    private Eligibilite eligibilite;
    private List<Garantie> garantie;
    private List<Piece> piecesJustificatives;
    private int statut;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ObjetFinancement)) return false;
        if (!super.equals(o)) return false;
        ObjetFinancement that = (ObjetFinancement) o;
        return statut == that.statut &&
                Objects.equals(idObjetFinancement, that.idObjetFinancement) &&
                Objects.equals(codeObjetFinancement, that.codeObjetFinancement) &&
                Objects.equals(quotePartObjet, that.quotePartObjet) &&
                Objects.equals(codeFamilleObjet, that.codeFamilleObjet) &&
                Objects.equals(gainCEP, that.gainCEP) &&
                Objects.equals(dateFinTravaux, that.dateFinTravaux) &&
                Objects.equals(bien, that.bien) &&
                Objects.equals(dpeAvantTravaux, that.dpeAvantTravaux) &&
                Objects.equals(dpeApresTravaux, that.dpeApresTravaux) &&
                Objects.equals(alignement, that.alignement) &&
                Objects.equals(eligibilite, that.eligibilite) &&
                Objects.equals(garantie, that.garantie) &&
                Objects.equals(piecesJustificatives, that.piecesJustificatives);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), idObjetFinancement, codeObjetFinancement, quotePartObjet, codeFamilleObjet, gainCEP, dateFinTravaux, bien, dpeAvantTravaux, dpeApresTravaux, alignement, eligibilite, garantie, piecesJustificatives, statut);
    }
}
je desire modifier la méthode de patch par champs pour permettre le patch de chaque element de la liste d'objet financement sans creer un nouveau financement car actuelement si j'essayer de patcher par exmple
ce financement ( je voudrais patcher l'objet de financement de la liste ayant l'id OVJNFNY8G
{
    "idFinancement": "FHMKU699D",
    "objetFinancement": [
        {
            "idObjetFinancement": "OCRGV3HJK",
            "codeObjetFinancement": "02",
            "quotePartObjet": 50.0,
            "codeFamilleObjet": null,
            "gainCEP": null,
            "dateFinTravaux": null,
            "bien": {
                "idBien": "B2H9C16HQ",
                "codeBatiment": null,
                "typeBatiment": "Appartement",
                "numeroVoie": null,
                "typeVoie": null,
                "nomRue": null,
                "batiment": null,
                "escalier": null,
                "etage": null,
                "porte": null,
                "codePostal": "75011",
                "nomCommune": "Paris",
                "paysBien": "France",
                "adresseComplete": "71 Boulevard Richard Leroy",
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
                "surfaceBien": 150.0,
                "bienFinanceLCL": true,
                "numeroFiscalLocal": null,
                "eligibleDpe": null,
                "labelBien": [
                    {
                        "identifiantLabel": "01",
                        "niveauLabel": "05",
                        "dateLabel": "2020-02-06T00:00:00.000+00:00"
                    },
                    {
                        "identifiantLabel": "02",
                        "niveauLabel": "03",
                        "dateLabel": "2020-02-06T00:00:00.000+00:00"
                    }
                ],
                "coordonneeCartographiqueX": null,
                "coordonneeCartographiqueY": null,
                "prixBien": 1000000.0,
                "montantFinanceLCL": 500000.0,
                "partLCL": 50.0,
                "dpeActuel": {
                    "idDpe": null,
                    "numeroDpe": "2125E0981916Z",
                    "codeModeleDpeType": null,
                    "estimationCep": 45.0,
                    "classeCep": "A",
                    "estimationGes": 690.0,
                    "classeGes": "B",
                    "dateEtablissementDpe": "2021-06-15T00:00:00.000+00:00",
                    "dateReceptionDpe": null,
                    "dateFinValiditeDpe": "2031-06-16T00:00:00.000+00:00",
                    "sirenDiagnostiqueur": "560458223",
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
            "garantie": [
                {
                    "idGarantie": "G2695LI2Y",
                    "typeObjetGarantie": null,
                    "bien": {
                        "idBien": "BH085CN1F",
                        "codeBatiment": null,
                        "typeBatiment": "Appartement",
                        "numeroVoie": null,
                        "typeVoie": null,
                        "nomRue": null,
                        "batiment": null,
                        "escalier": null,
                        "etage": null,
                        "porte": null,
                        "codePostal": "75012",
                        "nomCommune": "Paris",
                        "paysBien": "France",
                        "adresseComplete": "2 rue de bercy",
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
                        "montantFinanceLCL": null,
                        "partLCL": null,
                        "dpeActuel": {
                            "idDpe": null,
                            "numeroDpe": null,
                            "codeModeleDpeType": null,
                            "estimationCep": null,
                            "classeCep": null,
                            "estimationGes": null,
                            "classeGes": null,
                            "dateEtablissementDpe": null,
                            "dateReceptionDpe": null,
                            "dateFinValiditeDpe": null,
                            "sirenDiagnostiqueur": null,
                            "modelDpe": null,
                            "numeroDpeRemplace": null,
                            "versionDpe": null,
                            "methodeDpeApplique": null
                        }
                    },
                    "topAlignement": null,
                    "topEligibilite": null,
                    "piecesJustificatives": null
                },
                {
                    "idGarantie": "GAPN8HEOB",
                    "typeObjetGarantie": null,
                    "bien": {
                        "idBien": "BDBTSLH5T",
                        "codeBatiment": null,
                        "typeBatiment": "Appartement",
                        "numeroVoie": null,
                        "typeVoie": null,
                        "nomRue": null,
                        "batiment": null,
                        "escalier": null,
                        "etage": null,
                        "porte": null,
                        "codePostal": "75011",
                        "nomCommune": "Paris",
                        "paysBien": "France",
                        "adresseComplete": "71 Boulevard Richard Leroy",
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
                        "bienFinanceLCL": true,
                        "numeroFiscalLocal": null,
                        "eligibleDpe": null,
                        "labelBien": null,
                        "coordonneeCartographiqueX": null,
                        "coordonneeCartographiqueY": null,
                        "prixBien": null,
                        "montantFinanceLCL": null,
                        "partLCL": null,
                        "dpeActuel": {
                            "idDpe": null,
                            "numeroDpe": "2125E0981916Z",
                            "codeModeleDpeType": null,
                            "estimationCep": 45.0,
                            "classeCep": "A",
                            "estimationGes": 690.0,
                            "classeGes": "B",
                            "dateEtablissementDpe": "2021-06-15T00:00:00.000+00:00",
                            "dateReceptionDpe": null,
                            "dateFinValiditeDpe": "2031-06-16T00:00:00.000+00:00",
                            "sirenDiagnostiqueur": "560458223",
                            "modelDpe": null,
                            "numeroDpeRemplace": null,
                            "versionDpe": null,
                            "methodeDpeApplique": null
                        }
                    },
                    "topAlignement": null,
                    "topEligibilite": null,
                    "piecesJustificatives": null
                }
            ],
            "piecesJustificatives": null,
            "statut": 0
        }
    ],
    "alignement": null,
    "eligibilite": null,
    "intervenant": {
        "idIntervenant": null,
        "idReper": [
            "1245887962"
        ]
    },
    "indicateurFinancementDedie": null,
    "indicateurNatureDurable": null,
    "typeRisqueClimatiqueAttenue": null,
    "codeApplicatifOrigine": "01",
    "indicateurReprise": false,
    "statut": 0,
    "agenceCompte": "003800000056968N",
    "valeurTravaux": null
}
// je passe l'objetfinancement a patcher 
{
    "idFinancement":"FHMKU699D",
        "objetFinancement": [
        {
            "idObjetFinancement":"OCRGV3HJK",
            "codeObjetFinancement":"02",
            "quotePartObjet":70

 }]
 
 
 }
// j'obtiens ca comme resultat un nouveau financment  dupliqué avec un objet patché mais il converve l'ancien financement donc je veux corrigé ce patch pour qu'il ne duplique pas le financement existant lors d'un patch par champs de la liste des objets financement merci de m'aider
