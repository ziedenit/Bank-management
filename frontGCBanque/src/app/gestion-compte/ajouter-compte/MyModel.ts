<ErrorResponse>
    <code>TECHNICAL_EXCEPTION_OCCURED </code>
    <message>
        <message>Unable to make field private static final long java.util.ArrayList.serialVersionUID accessible: module java.base does not "opens java.util" to unnamed module @43a0cee9</message>
    </message>
</ErrorResponse>

Lorsque je patch cet objet
{
    "idFinancement": "FFVRILZ5L",
    "objetFinancement": [
        {
            "idObjetFinancement": "OBAQ0O5CU",
            "codeObjetFinancement": "0203",
            "quotePartObjet": 100.0,
            "codeFamilleObjet": null,
            "gainCEP": 25.0,
            "dateFinTravaux": null,
            "bien": {
                "idBien": null,
                "codeBatiment": null,
                "typeBatiment": "maison",
                "numeroVoie": null,
                "typeVoie": null,
                "nomRue": null,
                "batiment": null,
                "escalier": null,
                "etage": null,
                "porte": null,
                "codePostal": "91300",
                "nomCommune": null,
                "paysBien": null,
                "adresseComplete": "73 rue gutenberg, 91300 Massy",
                "codeNormeThermique": null,
                "etatBien": null,
                "typeEnergie": null,
                "codeTypeEnergie": null,
                "codeDepartement": null,
                "codeInseeCommune": null,
                "numeroLot": null,
                "numeroNomRue": null,
                "typeUsage": null,
                "anneeConstruction": null,
                "periodeConstruction": null,
                "dateDepotPc": null,
                "dateDebutConstruction": null,
                "surfaceBien": null,
                "bienFinanceLCL": false,
                "numeroFiscalLocal": null,
                "eligibleDpe": null,
                "labelBien": null,
                "coordonneeCartographiqueX": null,
                "coordonneeCartographiqueY": null,
                "prixBien": null,
                "montantFinanceLCL": 10000.0,
                "partLCL": null,
                "dpeActuel": {
                    "idDpe": null,
                    "numeroDpe": "2156E1018488U2",
                    "codeModeleDpeType": null,
                    "estimationCep": 100.0,
                    "classeCep": "A",
                    "estimationGes": 42.0,
                    "classeGes": "C",
                    "dateEtablissementDpe": "2017-02-06T00:00:00.000+00:00",
                    "dateReceptionDpe": null,
                    "dateFinValiditeDpe": null,
                    "sirenDiagnostiqueur": null,
                    "modelDpe": null,
                    "numeroDpeRemplace": null,
                    "versionDpe": null,
                    "methodeDpeApplique": null
                }
            },
            "dpeAvantTravaux": null,
            "dpeApresTravaux": null,
            "alignement": null,
            "eligibilite": null,
            "garantie": null,
            "piecesJustificatives": null,
            "statut": 0
        },
        {
            "idObjetFinancement": "OY8IUIQS8",
            "codeObjetFinancement": "0203",
            "quotePartObjet": 100.0,
            "codeFamilleObjet": null,
            "gainCEP": 25.0,
            "dateFinTravaux": null,
            "bien": {
                "idBien": null,
                "codeBatiment": null,
                "typeBatiment": "maison",
                "numeroVoie": null,
                "typeVoie": null,
                "nomRue": null,
                "batiment": null,
                "escalier": null,
                "etage": null,
                "porte": null,
                "codePostal": "91300",
                "nomCommune": null,
                "paysBien": null,
                "adresseComplete": "73 rue gutenberg, 91300 Massy",
                "codeNormeThermique": null,
                "etatBien": null,
                "typeEnergie": null,
                "codeTypeEnergie": null,
                "codeDepartement": null,
                "codeInseeCommune": null,
                "numeroLot": null,
                "numeroNomRue": null,
                "typeUsage": null,
                "anneeConstruction": null,
                "periodeConstruction": null,
                "dateDepotPc": null,
                "dateDebutConstruction": null,
                "surfaceBien": null,
                "bienFinanceLCL": false,
                "numeroFiscalLocal": null,
                "eligibleDpe": null,
                "labelBien": null,
                "coordonneeCartographiqueX": null,
                "coordonneeCartographiqueY": null,
                "prixBien": null,
                "montantFinanceLCL": 10000.0,
                "partLCL": null,
                "dpeActuel": {
                    "idDpe": null,
                    "numeroDpe": "2156E1018488U2",
                    "codeModeleDpeType": null,
                    "estimationCep": 100.0,
                    "classeCep": "B",
                    "estimationGes": 42.0,
                    "classeGes": "C",
                    "dateEtablissementDpe": "2017-02-06T00:00:00.000+00:00",
                    "dateReceptionDpe": null,
                    "dateFinValiditeDpe": null,
                    "sirenDiagnostiqueur": null,
                    "modelDpe": null,
                    "numeroDpeRemplace": null,
                    "versionDpe": null,
                    "methodeDpeApplique": null
                }
            },
            "dpeAvantTravaux": null,
            "dpeApresTravaux": null,
            "alignement": null,
            "eligibilite": null,
            "garantie": null,
            "piecesJustificatives": null,
            "statut": 0
        }
    ],
    "alignement": null,
    "eligibilite": null,
    "intervenant": {
        "idIntervenant": null,
        "idReper": [
            "1559518855"
        ]
    },
    "indicateurFinancementDedie": "Y",
    "indicateurNatureDurable": "Z",
    "typeRisqueClimatiqueAttenue": null,
    "codeApplicatifOrigine": "01",
    "indicateurReprise": false,
    "statut": 0,
    "agenceCompte": "1234567890000000",
    "valeurTravaux": null
}
par ca 
{"objetFinancement": [
        {
            "idObjetFinancement": "OBAQ0O5CU",
            "codeObjetFinancement": "02",
            "quotePartObjet": 30.0
        },

    {
            "idObjetFinancement": "OY8IUIQS8",
            "codeObjetFinancement": "02",
            "quotePartObjet": 60.0
        }
]}
