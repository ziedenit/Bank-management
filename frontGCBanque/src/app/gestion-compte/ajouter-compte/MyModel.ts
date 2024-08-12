import { Injectable } from '@angular/core'; 

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
                   console.error('Une erreur est survenue:', e);
        }

        return Alignement.builder()
            .topAlignement(newTopAlignement)
            .xtra275TopAlignement(xtra275TopAlignement)
            .topAlignementXtra(newTopAlignementXtra)
            .xtra275TopAlignementXtra(xtra275TopAlignementXtra)
            .topXtra274(null)
            .topXtra276(null)
            .build();
    }
}
//
class Alignement {
    constructor(
        public topAlignement: string,
        public xtra275TopAlignement: string,
        public topAlignementXtra: string,
        public xtra275TopAlignementXtra: string,
        public topXtra274: string | null = null,
        public topXtra276: string | null = null
    ) {}

    static builder() {
        return new AlignementBuilder();
    }
}

class AlignementBuilder {
    private topAlignement: string = '';
    private xtra275TopAlignement: string = '';
    private topAlignementXtra: string = '';
    private xtra275TopAlignementXtra: string = '';
    private topXtra274: string | null = null;
    private topXtra276: string | null = null;

    topAlignement(value: string): AlignementBuilder {
        this.topAlignement = value;
        return this;
    }

    xtra275TopAlignement(value: string): AlignementBuilder {
        this.xtra275TopAlignement = value;
        return this;
    }

    topAlignementXtra(value: string): AlignementBuilder {
        this.topAlignementXtra = value;
        return this;
    }

    xtra275TopAlignementXtra(value: string): AlignementBuilder {
        this.xtra275TopAlignementXtra = value;
        return this;
    }

    topXtra274(value: string | null): AlignementBuilder {
        this.topXtra274 = value;
        return this;
    }

    topXtra276(value: string | null): AlignementBuilder {
        this.topXtra276 = value;
        return this;
    }

    build(): Alignement {
        return new Alignement(
            this.topAlignement,
            this.xtra275TopAlignement,
            this.topAlignementXtra,
            this.xtra275TopAlignementXtra,
            this.topXtra274,
            this.topXtra276
        );
    }
}
