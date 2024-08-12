private Alignement calculXtra(String topAlignement, String topAlignementXtra) {
        String xtra275TopAlignement = "N";
        String xtra275TopAlignementXtra = "N";
        String newTopAlignement = topAlignement;
        String newTopAlignementXtra = topAlignementXtra;

        try {
            // Traitement de topAlignement
            switch (topAlignement) {
               case ALIGNE_01, ALIGNE_02, ALIGNE_03, ALIGNE_04, ALIGNE_05 :
                    xtra275TopAlignement = "Y";
                    newTopAlignement = NON_ALIGNE;
                    break;
                    
                case NON_ALIGNE:
                    xtra275TopAlignement = "N";
                    break;
                    
                case NON_EVALUE:
                    xtra275TopAlignement = "N";
                    break;
                    
                default:
                	xtra275TopAlignement = "N";
                    newTopAlignement = NON_ALIGNE;
                    break;
            }

}
            // Traitement de topAlignementXtra     
            switch (topAlignementXtra) {
               case ALIGNE_01, ALIGNE_02, ALIGNE_03, ALIGNE_04, ALIGNE_05 :
                    xtra275TopAlignementXtra = "Y";
                    newTopAlignementXtra = NON_ALIGNE;
                    break;
                case NON_ALIGNE:
                    xtra275TopAlignementXtra = "N";
                    break;
                case NON_EVALUE:
                    xtra275TopAlignementXtra = "N";
                    break;
                default:
                    xtra275TopAlignementXtra = "N";
                    newTopAlignementXtra = NON_ALIGNE;
                    break;
            }

        } catch (Exception e) {
            xtra275TopAlignement = "N";
            xtra275TopAlignementXtra = "N";
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
