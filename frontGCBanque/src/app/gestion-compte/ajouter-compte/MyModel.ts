import { Injectable } from '@angular/core';  // Si tu utilises Angular
import { Alignement } from './alignement.model';  // Assurez-vous d'importer le modèle

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

        return new Alignement(
            newTopAlignement,
            xtra275TopAlignement,
            newTopAlignementXtra,
            xtra275TopAlignementXtra
        );
    }
}
