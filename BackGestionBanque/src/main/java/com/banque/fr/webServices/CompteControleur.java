public String alignement(ContextXTRA ligneContext) {

        String aligne = "07";

        try {
            startDate = formatDate.parse("01/01/1700");
            Date endDate = formatDate.parse("31/12/2012");
            anneeDebutConstruction = 1700;
            anneeFinConstruction = 2012;

            String codeBatiment = ligneContext.getCodeBatiment();
            double valeurCeptop = obtenirValeurCepTop(codeBatiment);
            double valeurCepmax = obtenirValeurCepMax(codeBatiment);

            String typeObjetFinancement = ligneContext.getTypeObjetFinancement();
            boolean presenceDateDepotPc = ligneContext.isPresenceDateDepotPc();
            Date dateDepotPc = ligneContext.getDateDepotPc();
            boolean presenceDateDepotPcJustificatif = ligneContext.isPresenceDateDepotPcJustificatif();
            boolean presenceDpe = ligneContext.isPresenceDpe();
            boolean presenceDpeJustificatif = ligneContext.isPresenceDpeJustificatif();
            boolean presenceNormeThermiqueJustificatif = ligneContext.isPresenceNormeThermiqueJustificatif();
            String normeThermique = (ligneContext.getNormeThermique() == null ? "NC" : ligneContext.getNormeThermique());
            Integer anneeConstruction = ligneContext.getAnneeConstruction();
            String etiquetteDpe = (ligneContext.getEtiquetteDpe() == null ? "NC" : ligneContext.getEtiquetteDpe());
            Double valeurCep = ligneContext.getValeurCep();


            /////////////////////////Rénovation//////////////////////////////////////////////
            boolean presenceDpeAvantTravaux = ligneContext.isPresenceDpeAvantTravaux();
            boolean presenceDpeApresTravaux = ligneContext.isPresenceDpeApresTravaux();
            Double gainCep = ligneContext.getGainCep();


            ///////////////////////Parcourir l'arbre de décision////////////////////////	    	

            if (valeurCep == 0.0) {
                valeurCep = 10000.0;
            }

            ////////////////////// Acquisition////////////////////////////////////////
            if (typeObjetFinancement != null) {
                if (typeObjetFinancement.equals("02")) {

                    if (presenceDateDepotPc && presenceDateDepotPcJustificatif) {

                        if (presenceDpe && presenceDpeJustificatif) {


                            //--------------------------------1700__2012-----------------------------------------//

                            startDate = formatDate.parse("01/01/1700");
                            endDate = formatDate.parse("31/12/2012");
                            if (dateDepotPc.compareTo(endDate) <= 0 && dateDepotPc.compareTo(startDate) > 0) {
                                CalculAlignementStrategy calculAlignementFirstStrategy = new CalculAlignementStrategy();
                                aligne = calculAlignementFirstStrategy.aligneDpeCep(
                                        etiquetteDpe, valeurCep, valeurCeptop);
                                return aligne;
                            }


                            //------------------------------2013___2020-------------------------------------------//
                            endDate = formatDate.parse("31/12/2020");
                            if (dateDepotPc.compareTo(endDate) <= 0) {
                                CalculAlignementStrategy calculAlignementSecondStrategy = new CalculAlignementStrategy();
                                aligne = calculAlignementSecondStrategy.alignCepDpeEtNormeTh(
                                        etiquetteDpe, valeurCep, valeurCeptop
                                        , normeThermique, endDate);
                                return aligne;
                            }

                            // ------------------------------2021___2021------------------------------------------//

                            endDate = formatDate.parse("31/12/2021");
                            if (dateDepotPc.compareTo(endDate) <= 0) {
                                CalculAlignementStrategy calculAlignementThirdStrategy = new CalculAlignementStrategy();
                                aligne = calculAlignementThirdStrategy.aligneCepCepmax(valeurCep, valeurCepmax);
                                return aligne;
                            }

                            // -------------------------------2022 et plus ---------------------------------------//
                            startDate = formatDate.parse("01/01/2022");
                            if (dateDepotPc.compareTo(startDate) >= 0) {
                                aligne = "01";
                                return aligne;
                            }
                        }

                        // Absence DPE
                        else {
                            startDate = formatDate.parse("01/01/2022");
                            if (dateDepotPc.compareTo(startDate) >= 0) {
                                aligne = "01";
                                return aligne;
                            } else {
                                aligne = "07";
                                return aligne;
                            }

                        }
                    }

                    /////////////////////////////////////////////////Ancien ///////////////////////////////////////////

                    if (!presenceDateDepotPc || !presenceDateDepotPcJustificatif) {

                        // Présence DPE
                        if ((presenceDpe || (anneeConstruction != null)) && presenceDpeJustificatif) {


                            if (anneeConstruction == null) {
                                aligne = "07";
                                return aligne;
                            }
                            if (anneeConstruction < 1700) {
                                aligne = "07";
                                return aligne;
                            }


                            // ---------------------------1700___2012------------------------------------------//
                            anneeDebutConstruction = 1700;
                            anneeFinConstruction = 2012;
                            if (anneeConstruction > anneeDebutConstruction && anneeConstruction <= anneeFinConstruction) {
                                CalculAlignementStrategy calculAlignementFifthStrategy = new CalculAlignementStrategy();
                                aligne = calculAlignementFifthStrategy.alignCepDpeEtNormeThJust(
                                        etiquetteDpe, valeurCep, valeurCeptop
                                        , normeThermique, endDate, presenceNormeThermiqueJustificatif);
                                return aligne;
                            }

                            //-----------------------------------2013___2020----------------------------------------//
                            anneeDebutConstruction = 2013;
                            anneeFinConstruction = 2020;

                            if (anneeConstruction <= anneeFinConstruction) {
                                CalculAlignementStrategy calculAlignementFifthStrategy = new CalculAlignementStrategy();
                                aligne = calculAlignementFifthStrategy.alignCepDpeEtNormeThJust(
                                        etiquetteDpe, valeurCep, valeurCeptop
                                        , normeThermique, endDate, presenceNormeThermiqueJustificatif);
                                return aligne;
                            }

                            // ----------------------------2021____2021-----------------------------------------------//

                            anneeDebutConstruction = 2021;
                            anneeFinConstruction = 2021;
                            if (anneeConstruction.equals(anneeFinConstruction)) {
                                CalculAlignementStrategy calculAlignementThirdStrategy = new CalculAlignementStrategy();
                                aligne = calculAlignementThirdStrategy.aligneCepCepmax(valeurCep, valeurCepmax);
                                return aligne;
                            }
                            // ----------------------------------2022 et plus---------------------//

                            anneeDebutConstruction = 2022;
                            if (anneeConstruction >= anneeDebutConstruction) {
                                CalculAlignementStrategy calculAlignementSixthStrategy = new CalculAlignementStrategy();
                                aligne = calculAlignementSixthStrategy.alignDpeNormeThJust(valeurCeptop, normeThermique, presenceNormeThermiqueJustificatif, valeurCepmax);
                                return aligne;
                            }


                        } else {    // Absence DPE
                            aligne = "07";
                            return aligne;
                        }


                    }
                } // end Acquisition

                commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("Fin : Calcul AlignementXtra pour les bien en aquisition");

////////////////////////////////////////////////////////////////////////////////////////////////////////////	    	


                // renovation
                if (typeObjetFinancement.equals("03")) {
                    if (presenceDpeAvantTravaux) {
                        if (presenceDpeApresTravaux) {
                            if (gainCep > 30) {
                                aligne = "02";
                                return aligne;
                            } else {
                                aligne = "06";
                                return aligne;
                            }
                        } else {
                            aligne = "07";
                            return aligne;
                        }
                    } else {
                        aligne = "07";
                        return aligne;
                    }
                }// end rénovation
                commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("Fin : Calcul AlignementXtra pour les biens en renovation");

            } else {
                aligne = "07";
            }


/////////////////////////////////Gestion des exceptions//////////////////////////////////////    	

        } catch (Exception e) {
            commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("Calcul : update error");
            aligne = "07";
            return aligne;
        }
        return aligne;
    }
