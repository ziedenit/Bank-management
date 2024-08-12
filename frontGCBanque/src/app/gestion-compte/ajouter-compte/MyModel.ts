interface AlignementConfig {
    topAlignement?: string;
    xtra275TopAlignement?: string;
    topAlignementXtra?: string;
    xtra275TopAlignementXtra?: string;
    topXtra274?: string | null;
    topXtra276?: string | null;
}

//
// Constructeur avec un objet de configuration
    constructor(config: AlignementConfig = {}) {
        this.topAlignement = config.topAlignement ?? '';
        this.xtra275TopAlignement = config.xtra275TopAlignement ?? '';
        this.topAlignementXtra = config.topAlignementXtra ?? '';
        this.xtra275TopAlignementXtra = config.xtra275TopAlignementXtra ?? '';
        this.topXtra274 = config.topXtra274 ?? null;
        this.topXtra276 = config.topXtra276 ?? null;
    }
