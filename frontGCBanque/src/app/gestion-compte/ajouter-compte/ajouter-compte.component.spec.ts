@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Financement implements Serializable {

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
        if (o == null || getClass() != o.getClass()) return false;
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
