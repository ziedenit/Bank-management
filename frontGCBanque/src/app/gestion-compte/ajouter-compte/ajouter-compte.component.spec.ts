"Failed to instantiate java.util.List using constructor NO_CONSTRUCTOR with arguments ",
	toujours 
il ne support pas la liste 
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
public class Financement  implements Serializable {

    private String idFinancement;

    @NotNull(message = "Objet financement est obligatoire")
    @Valid
    private List<ObjetFinancement> objetFinancement = new ArrayList<>();

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
        if (!super.equals(o)) return false;
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
        return Objects.hash(super.hashCode(), idFinancement, objetFinancement, alignement, eligibilite, intervenant, indicateurFinancementDedie, indicateurNatureDurable, typeRisqueClimatiqueAttenue, codeApplicatifOrigine, indicateurReprise, statut, agenceCompte, valeurTravaux);
    }
}
// franchement je ne peux pas changer mon modele , le besoin impose que j'utilise un objet complexe une liste d'objet de financement à l'interieur du financement comment je peux adapter ca pour que le framwork accepte et les api fonctionne surtou mon service package com.cl.msofd.repository;
findByidFinancement

  public Financement getFinancementByIdFinancement(String idFinancement) {

        return financementRepository.findByidFinancement(idFinancement)

                .orElseThrow(() -> new FinancementNotFoundException(

                        String.format("Le financement %s est inexistant", idFinancement)));

    }
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.cl.msofd.model.Financement;
import org.springframework.stereotype.Repository;

@Repository
public interface  FinancementRepository extends MongoRepository<Financement, String> {
	Optional<Financement> findByidFinancement(String idFinancement);
	Optional<Financement> deleteByIdFinancement(String idFinancement);
	
	
}
