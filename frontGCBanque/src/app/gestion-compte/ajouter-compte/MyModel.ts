class Alignement {
    constructor(
        public topAlignement: string = '',
        public xtra275TopAlignement: string = '',
        public topAlignementXtra: string = '',
        public xtra275TopAlignementXtra: string = '',
        public topXtra274: string | null = null,
        public topXtra276: string | null = null
    ) {}

    // Méthode statique pour faciliter la création d'instances
    static create(init?: Partial<Alignement>): Alignement {
        return new Alignement(
            init?.topAlignement ?? '',
            init?.xtra275TopAlignement ?? '',
            init?.topAlignementXtra ?? '',
            init?.xtra275TopAlignementXtra ?? '',
            init?.topXtra274 ?? null,
            init?.topXtra276 ?? null
        );
    }
}
//
// Utilisation directe du constructeur
const alignement1 = new Alignement('topAlign1', 'Y', 'topAlignXtra1', 'N', null, null);

// Utilisation de la méthode create
const alignement2 = Alignement.create({
    topAlignement: 'topAlign2',
    xtra275TopAlignement: 'N',
    topAlignementXtra: 'topAlignXtra2',
    xtra275TopAlignementXtra: 'Y'
});
//
@Injectable({
    providedIn: 'root'
})
export class AlignmentService {

    private readonly ALIGNE_01 = 'ALIGNE_01';
    private readonly ALIGNE_02 = 'ALIGNE_02';
    private readonly ALIGNE_03 = 'ALIGNE_03';
    private readonly ALIGNE_04 = 'ALIGNE_04';
    private readonly ALIGNE_05 = 'ALIGNE_05';
    private readonly NON_ALIGNE = 'NON_ALIGNE';
    private readonly NON_EVALUE = 'NON_EVALUE';

    calculXtra(topAlignement: string, topAlignementXtra: string): Alignement {
        let xtra275TopAlignement = 'N';
        let xtra275TopAlignementXtra = 'N';
        let newTopAlignement = topAlignement;
        let newTopAlignementXtra = topAlignementXtra;

        try {
            // Traitement de topAlignement
            switch (topAlignement) {
                case this.ALIGNE_01:
                case this.ALIGNE_02:
                case this.ALIGNE_03:
                case this.ALIGNE_04:
                case this.ALIGNE_05:
                    xtra275TopAlignement = 'Y';
                    newTopAlignement = this.NON_ALIGNE;
                    break;

                case this.NON_ALIGNE:
                case this.NON_EVALUE:
                default:
                    xtra275TopAlignement = 'N';
                    if (topAlignement !== this.NON_ALIGNE && topAlignement !== this.NON_EVALUE) {
                        newTopAlignement = this.NON_ALIGNE;
                    }
                    break;
            }

            // Traitement de topAlignementXtra
            switch (topAlignementXtra) {
                case this.ALIGNE_01:
                case this.ALIGNE_02:
                case this.ALIGNE_03:
                case this.ALIGNE_04:
                case this.ALIGNE_05:
                    xtra275TopAlignementXtra = 'Y';
                    newTopAlignementXtra = this.NON_ALIGNE;
                    break;

                case this.NON_ALIGNE:
                case this.NON_EVALUE:
                default:
                    xtra275TopAlignementXtra = 'N';
                    if (topAlignementXtra !== this.NON_ALIGNE && topAlignementXtra !== this.NON_EVALUE) {
                        newTopAlignementXtra = this.NON_ALIGNE;
                    }
                    break;
            }
        } catch (e) {
            xtra275TopAlignement = 'N';
            xtra275TopAlignementXtra = 'N';
        }

        return Alignement.create({
            topAlignement: newTopAlignement,
            xtra275TopAlignement: xtra275TopAlignement,
            topAlignementXtra: newTopAlignementXtra,
            xtra275TopAlignementXtra: xtra275TopAlignementXtra,
            topXtra274: null,
            topXtra276: null
        });
    }
}
