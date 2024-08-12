class Alignement {
    public topAlignement: string;
    public xtra275TopAlignement: string;
    public topAlignementXtra: string;
    public xtra275TopAlignementXtra: string;
    public topXtra274: string | null;
    public topXtra276: string | null;

    // Constructeur sans paramètres et avec paramètres optionnels
    constructor(
        topAlignement: string = '',
        xtra275TopAlignement: string = '',
        topAlignementXtra: string = '',
        xtra275TopAlignementXtra: string = '',
        topXtra274: string | null = null,
        topXtra276: string | null = null
    ) {
        this.topAlignement = topAlignement;
        this.xtra275TopAlignement = xtra275TopAlignement;
        this.topAlignementXtra = topAlignementXtra;
        this.xtra275TopAlignementXtra = xtra275TopAlignementXtra;
        this.topXtra274 = topXtra274;
        this.topXtra276 = topXtra276;
    }
}
