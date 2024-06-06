<ErrorResponse>
    <code>TECHNICAL_EXCEPTION_OCCURED </code>
    <message>
        <message>Failed to instantiate java.util.List using constructor NO_CONSTRUCTOR with arguments </message>
    </message>
</ErrorResponse>

 je test le service getFinancementByIdFinancement et je recois l'exception dessus 
   ci bas le code actuel pour le service et le modele financement contient 
  public Financement getFinancementByIdFinancement(String idFinancement) {

        return financementRepository.findByidFinancement(idFinancement)

                .orElseThrow(() -> new FinancementNotFoundException(

                        String.format("Le financement %s est inexistant", idFinancement)));

    }
@Repository
public interface  FinancementRepository extends MongoRepository<Financement, String> {
	Optional<Financement> findByidFinancement(String idFinancement);
	Optional<Financement> deleteByIdFinancement(String idFinancement);
	
	
}
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
public class Financement extends BaseEntity implements Serializable {


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
    @Pattern(regexp = "^(01|02|03|04|05|06|07|08)$", message = "le champs codeApplicatifOrigine doit etre l'une des valeurs" +
            " 01 (VIC ou NECI) 02 (PI) 03 (CPPE) 04 (SIRIUS) 05 (DPAR) 06 (DPRO) 07 (CRM360) GGAR (08) ")
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
        if (!(o instanceof Financement that)) return false;
        if (!super.equals(o)) return false;
        return isIndicateurReprise() == that.isIndicateurReprise() && getStatut() == that.getStatut() && Objects.equals(getIdFinancement(), that.getIdFinancement()) && Objects.equals(getObjetFinancement(), that.getObjetFinancement()) && Objects.equals(getAlignement(), that.getAlignement()) && Objects.equals(getEligibilite(), that.getEligibilite()) && Objects.equals(getIntervenant(), that.getIntervenant()) && Objects.equals(getIndicateurFinancementDedie(), that.getIndicateurFinancementDedie()) && Objects.equals(getIndicateurNatureDurable(), that.getIndicateurNatureDurable()) && Objects.equals(getTypeRisqueClimatiqueAttenue(), that.getTypeRisqueClimatiqueAttenue()) && Objects.equals(getCodeApplicatifOrigine(), that.getCodeApplicatifOrigine()) && Objects.equals(getAgenceCompte(), that.getAgenceCompte()) && Objects.equals(getValeurTravaux(), that.getValeurTravaux());
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), getIdFinancement(), getObjetFinancement(), getAlignement(), getEligibilite(), getIntervenant(), getIndicateurFinancementDedie(), getIndicateurNatureDurable(), getTypeRisqueClimatiqueAttenue(), getCodeApplicatifOrigine(), isIndicateurReprise(), getStatut(), getAgenceCompte(), getValeurTravaux());
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
public class ObjetFinancement extends BaseEntity implements Serializable {

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
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        ObjetFinancement that = (ObjetFinancement) o;
        return statut == that.statut && Objects.equals(idObjetFinancement, that.idObjetFinancement) && Objects.equals(codeObjetFinancement, that.codeObjetFinancement) && Objects.equals(quotePartObjet, that.quotePartObjet) && Objects.equals(codeFamilleObjet, that.codeFamilleObjet) && Objects.equals(gainCEP, that.gainCEP) && Objects.equals(dateFinTravaux, that.dateFinTravaux) && Objects.equals(bien, that.bien) && Objects.equals(dpeAvantTravaux, that.dpeAvantTravaux) && Objects.equals(dpeApresTravaux, that.dpeApresTravaux) && Objects.equals(alignement, that.alignement) && Objects.equals(eligibilite, that.eligibilite) && Objects.equals(garantie, that.garantie) && Objects.equals(piecesJustificatives, that.piecesJustificatives);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), idObjetFinancement, codeObjetFinancement, quotePartObjet, codeFamilleObjet, gainCEP, dateFinTravaux, bien, dpeAvantTravaux, dpeApresTravaux, alignement, eligibilite, garantie, piecesJustificatives, statut);
    }
}




