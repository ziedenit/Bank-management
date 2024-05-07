public String alignement(ContextAlignement ligneContext) {
        String aligne = "07";
        try {
            startDate = formatDate.parse("01/01/1700");
            endDate = formatDate.parse("31/12/2012");
            anneeDebutConstruction = 1700;
            anneeFinConstruction = 2012;
            String codeBatiment = ligneContext.getCodeBatiment();
            double valeurCeptop = obtenirValeurCepTop(codeBatiment);
            double valeurCepmax = obtenirValeurCepMax(codeBatiment);

            ///////////////////////////////Acquisition//////////////////////////////////////////
            String typeObjetFinancement = ligneContext.getTypeObjetFinancement();
            Integer anneeConstruction = ligneContext.getAnneeConstruction();
            String etiquetteDpe = (ligneContext.getEtiquetteDpe() == null ? "NC" : ligneContext.getEtiquetteDpe());
            double valeurCep = ligneContext.getValeurCep();
            Date dateDepotPc = ligneContext.getDateDepotPc();
            boolean presenceDpe = ligneContext.isPresenceDpe();
            boolean presenceDateDepotPc = ligneContext.isPresenceDateDepotPc();
            String normeThermique = (ligneContext.getNormeThermique() == null ? "NC" : ligneContext.getNormeThermique());


            if (valeurCep == 0.0) {
                valeurCep = 10000.0;
            }


            if (typeObjetFinancement != null) {
                if (typeObjetFinancement.equals("02")) { //objet de financement =Acquisition 

                    if (presenceDateDepotPc) {// si présence date de depot de PC ==> Acquisition dans le neuf 
                        if (presenceDpe) {

//--------------------------------1700__2012----------------------------------------------------------//                       	
                            startDate = formatDate.parse("01/01/1700");
                            endDate = formatDate.parse("31/12/2012");
                            if (dateDepotPc.compareTo(endDate) <= 0 && dateDepotPc.compareTo(startDate) > 0) {
                                CalculAlignementStrategy calculAlignementFirstStrategy = new CalculAlignementStrategy();
                                aligne = calculAlignementFirstStrategy.aligneDpeCep(
                                        etiquetteDpe, valeurCep, valeurCeptop);
                                return aligne;
                            }
//---------------------------------------------2013--2020---------------------------------------------//
                            endDate = formatDate.parse("31/12/2020");
                            if (dateDepotPc.compareTo(endDate) <= 0) {
                                CalculAlignementStrategy calculAlignementSecondStrategy = new CalculAlignementStrategy();
                                aligne = calculAlignementSecondStrategy.alignCepDpeEtNormeTh(
                                        etiquetteDpe, valeurCep, valeurCeptop
                                        , normeThermique, endDate);
                                return aligne;
                            }
// --------------------------------------------2021---------------------------------------------------//
                            endDate = formatDate.parse("31/12/2021");
                            if (dateDepotPc.compareTo(endDate) <= 0) {
                                CalculAlignementStrategy calculAlignementThirdStrategy = new CalculAlignementStrategy();
                                aligne = calculAlignementThirdStrategy.aligneCepCepmax(valeurCep, valeurCepmax);
                                return aligne;
                            }

// -------------------------------------------->2022---------------------------------------------------//
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
////////////////////////////////////////////////////////Ancien ////////////////////////////////////////////////////////////////////			    	

                    if (!presenceDateDepotPc && isPresentDepEtAnneeConstr(presenceDpe, anneeConstruction)) {
                        //--------------------------------1700__2012----------------------------------------------------------//
                        anneeDebutConstruction = 1700;
                        anneeFinConstruction = 2012;
                        if (anneeConstruction > anneeDebutConstruction && anneeConstruction <= anneeFinConstruction) {
                            CalculAlignementStrategy calculAlignementSecondStrategy = new CalculAlignementStrategy();
                            aligne = calculAlignementSecondStrategy.alignCepDpeEtNormeTh(
                                    etiquetteDpe, valeurCep, valeurCeptop
                                    , normeThermique, endDate);
                            return aligne;
                        }

//---------------------------------------------2013 et 2020---------------------------------------------------------------------//
                        anneeFinConstruction = 2020;
                        if (anneeConstruction <= anneeFinConstruction) {
                            CalculAlignementStrategy calculAlignementSecondStrategy = new CalculAlignementStrategy();
                            aligne = calculAlignementSecondStrategy.alignCepDpeEtNormeTh(
                                    etiquetteDpe, valeurCep, valeurCeptop
                                    , normeThermique, endDate);
                            return aligne;
                        }

// --------------------------------------------2021--------------------------------------------------------------------------------//
                        anneeFinConstruction = 2021;
                        if (anneeConstruction.equals(anneeFinConstruction)) {

                            CalculAlignementStrategy calculAlignementThirdStrategy = new CalculAlignementStrategy();
                            aligne = calculAlignementThirdStrategy.aligneCepCepmax(valeurCep, valeurCepmax);
                            return aligne;
                        }


// --------------------------------------------> 2022--------------------------------------------------------------------------------//
                        anneeDebutConstruction = 2022;
                        if (anneeConstruction >= anneeDebutConstruction) {
                            CalculAlignementStrategy calculAlignementFourthStrategy = new CalculAlignementStrategy();
                            aligne = calculAlignementFourthStrategy.aligneCepCepmaxNorm(valeurCep, valeurCepmax, normeThermique);
                            return aligne;
                        } else {    // Absence DPE
                            aligne = "07";
                            return aligne;
                        }

                    }
                }// end Acquisition
                commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("Fin : Calcul Alignement pour les bien en aquisition ");

            }
        } catch (Exception e) {
            commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("Calcul : update error");
            aligne = "07";
            return aligne;
        }
        return aligne;
    }
