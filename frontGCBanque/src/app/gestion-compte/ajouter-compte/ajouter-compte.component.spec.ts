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
package com.cl.msofd.model;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import lombok.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ObjetFinancement  implements Serializable {

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
    private List<Garantie> garantie ;
    private List<Piece> piecesJustificatives ;
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
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Bien  implements Serializable {


    private String idBien;

    @Pattern(regexp = "^(00001|00002|00003|00004|00005|00006|99999)$", message = "le champ codeBatiment doit etre l'une des valeurs" +
            " 00001 00002 00003 00004 00005 00006 99999")
    private String codeBatiment;

    private String typeBatiment; // Maison individuelle     Appartement

    //adresse Bien
    private String numeroVoie;
    private String typeVoie;
    private String nomRue;
    private String batiment;
    private String escalier;
    private String etage;
    private String porte;
    private String codePostal;
    private String nomCommune;
    private String paysBien;
    private String adresseComplete;

    private String codeNormeThermique; //   01: RT2012     02: RE2020    99: Autre

    private String etatBien;

    private String typeEnergie;
    private String codeTypeEnergie;

    private String codeDepartement;
    private String codeInseeCommune;
    private String numeroLot;
    private String numeroNomRue;

    private String typeUsage; //0: Non applicable    1: Immobilier résidentiel    2: Immobilier professionnel

    @Min(1700)
    @Max(2024)
    private Integer anneeConstruction;

    private String periodeConstruction;
    private Date dateDepotPc;
    private Date dateDebutConstruction;

    @Min(0)
    private Double surfaceBien;
    private boolean bienFinanceLCL;
    private String numeroFiscalLocal;
    private String eligibleDpe;

    private List<LabelBien> labelBien;
    @Min(0)
    private Double coordonneeCartographiqueX;

    @Min(0)
    private Double coordonneeCartographiqueY;

    @Min(0)
    private Double prixBien;

    @Min(0)
    private Double montantFinanceLCL;

    @Min(0)
    private Double partLCL;

    @Valid
    private Dpe dpeActuel;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Bien bien = (Bien) o;
        return bienFinanceLCL == bien.bienFinanceLCL && Objects.equals(idBien, bien.idBien)
                && Objects.equals(codeBatiment, bien.codeBatiment) && Objects.equals(codeNormeThermique, bien.codeNormeThermique)
                && Objects.equals(typeBatiment, bien.typeBatiment) && Objects.equals(numeroVoie, bien.numeroVoie) && Objects.equals(typeVoie, bien.typeVoie) && Objects.equals(nomRue, bien.nomRue) && Objects.equals(etatBien, bien.etatBien) && Objects.equals(typeEnergie, bien.typeEnergie) && Objects.equals(codeTypeEnergie, bien.codeTypeEnergie) && Objects.equals(batiment, bien.batiment) && Objects.equals(escalier, bien.escalier) && Objects.equals(etage, bien.etage) && Objects.equals(porte, bien.porte) && Objects.equals(codePostal, bien.codePostal) && Objects.equals(nomCommune, bien.nomCommune) && Objects.equals(paysBien, bien.paysBien) && Objects.equals(adresseComplete, bien.adresseComplete) && Objects.equals(codeDepartement, bien.codeDepartement) && Objects.equals(codeInseeCommune, bien.codeInseeCommune) && Objects.equals(numeroLot, bien.numeroLot) && Objects.equals(numeroNomRue, bien.numeroNomRue) && Objects.equals(typeUsage, bien.typeUsage) && Objects.equals(anneeConstruction, bien.anneeConstruction) && Objects.equals(periodeConstruction, bien.periodeConstruction) && Objects.equals(dateDepotPc, bien.dateDepotPc) && Objects.equals(dateDebutConstruction, bien.dateDebutConstruction) && Objects.equals(surfaceBien, bien.surfaceBien) && Objects.equals(numeroFiscalLocal, bien.numeroFiscalLocal) && Objects.equals(coordonneeCartographiqueX, bien.coordonneeCartographiqueX) && Objects.equals(coordonneeCartographiqueY, bien.coordonneeCartographiqueY) && Objects.equals(prixBien, bien.prixBien) && Objects.equals(montantFinanceLCL, bien.montantFinanceLCL) && Objects.equals(partLCL, bien.partLCL) && Objects.equals(dpeActuel, bien.dpeActuel);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), idBien, codeBatiment, codeNormeThermique, typeBatiment, numeroVoie, typeVoie, nomRue, etatBien, typeEnergie, codeTypeEnergie, batiment, escalier, etage, porte, codePostal, nomCommune, paysBien, adresseComplete, codeDepartement, codeInseeCommune, numeroLot, numeroNomRue, typeUsage, anneeConstruction, periodeConstruction, dateDepotPc, dateDebutConstruction, surfaceBien, bienFinanceLCL, numeroFiscalLocal, coordonneeCartographiqueX, coordonneeCartographiqueY, prixBien, montantFinanceLCL, partLCL, dpeActuel);
    }


}

//
package com.cl.msofd.model;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import lombok.*;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Dpe implements Serializable {

    private String idDpe;

    private String numeroDpe;

    private String codeModeleDpeType;

    @Min(0)
    private Double estimationCep;

    @Pattern(regexp = "^$|(A|B|C|D|E|F|G|null)$", message = "Etiquette CEP doit etre soit A B C D E F G")
    private String classeCep;

    @Min(0)
    private Double estimationGes;

    @Pattern(regexp = "^$|(A|B|C|D|E|F|G|null)$", message = "Etiquette GES doit etre soit A B C D E F G")
    private String classeGes;

    private Date dateEtablissementDpe;
    private Date dateReceptionDpe;
    private Date dateFinValiditeDpe;

    private String sirenDiagnostiqueur;

    private String modelDpe;
    private String numeroDpeRemplace;
    private String versionDpe;
    private String methodeDpeApplique;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Dpe dpe = (Dpe) o;
        return Objects.equals(idDpe, dpe.idDpe) && Objects.equals(numeroDpe, dpe.numeroDpe) && Objects.equals(codeModeleDpeType, dpe.codeModeleDpeType) && Objects.equals(estimationCep, dpe.estimationCep) && Objects.equals(classeCep, dpe.classeCep) && Objects.equals(estimationGes, dpe.estimationGes) && Objects.equals(classeGes, dpe.classeGes) && Objects.equals(dateEtablissementDpe, dpe.dateEtablissementDpe) && Objects.equals(dateReceptionDpe, dpe.dateReceptionDpe) && Objects.equals(dateFinValiditeDpe, dpe.dateFinValiditeDpe) && Objects.equals(sirenDiagnostiqueur, dpe.sirenDiagnostiqueur) && Objects.equals(modelDpe, dpe.modelDpe) && Objects.equals(numeroDpeRemplace, dpe.numeroDpeRemplace) && Objects.equals(versionDpe, dpe.versionDpe) && Objects.equals(methodeDpeApplique, dpe.methodeDpeApplique);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), idDpe, numeroDpe, codeModeleDpeType, estimationCep, classeCep, estimationGes, classeGes, dateEtablissementDpe, dateReceptionDpe, dateFinValiditeDpe, sirenDiagnostiqueur, modelDpe, numeroDpeRemplace, versionDpe, methodeDpeApplique);
    }
}

