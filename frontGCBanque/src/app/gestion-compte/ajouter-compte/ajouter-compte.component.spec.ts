public Financement createFinancement(Financement financement) {

        financement.setIdFinancement(idGeneratorService.generateId("F"));
        // Loop through each ObjetFinancement and set its ID
        if (financement.getObjetFinancement() != null) {
            financement.getObjetFinancement().forEach(objetFinancement -> {
                objetFinancement.setIdObjetFinancement(idGeneratorService.generateId("O"));
            });
          

        }
        return financementRepository.save(financement);
    }
Je veux looper sur chaque garantie de la liste dans chaque objet de financement et genere un id de la meme facon voila le model de l'objet financement ci bas package com.cl.msofd.model;

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
