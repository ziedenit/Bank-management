package com.example.rules;
import com.example.Acquisition;
import com.example.AcquisitionResponse;

rule "Rule 1"
when
    $acquisition : Acquisition(
        eligibileDPE == false,
        dateDepotPc == "",
        presenceDpe == false,
        presenceDpeJustificatif == false,
        (dateConstructionDpe == null || dateConstructionDpe == ""),
        etiquetteDpe == "",
        (valeurCep == 0.0 || valeurCep == 0.0),
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "07", "02", "N");
    insert(response);
end

rule "Rule 2"
when
    $acquisition : Acquisition(
        eligibileDPE == false,
        dateDepotPc == "",
        presenceDpe == false,
        presenceDpeJustificatif == false,
        (dateConstructionDpe == null || dateConstructionDpe == ""),
        etiquetteDpe == "",
        (valeurCep == 0.0 || valeurCep == 0.0),
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "07", "02", "N");
    insert(response);
end

rule "Rule 3"
when
    $acquisition : Acquisition(
        eligibileDPE == false,
        dateDepotPc == "",
        presenceDpe == false,
        presenceDpeJustificatif == false,
        (dateConstructionDpe == null || dateConstructionDpe == ""),
        etiquetteDpe == "",
        (valeurCep == 0.0 || valeurCep == 0.0),
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "07", "02", "N");
    insert(response);
end

rule "Rule 4"
when
    $acquisition : Acquisition(
        eligibileDPE == false,
        dateDepotPc == "",
        presenceDpe == false,
        presenceDpeJustificatif == false,
        (dateConstructionDpe == null || dateConstructionDpe == ""),
        etiquetteDpe == "",
        (valeurCep == 0.0 || valeurCep == 0.0),
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "07", "02", "N");
    insert(response);
end

rule "Rule 5"
when
    $acquisition : Acquisition(
        eligibileDPE == false,
        dateDepotPc == "",
        presenceDpe == false,
        presenceDpeJustificatif == false,
        (dateConstructionDpe == null || dateConstructionDpe == ""),
        etiquetteDpe == "",
        (valeurCep == 0.0 || valeurCep == 0.0),
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "07", "02", "N");
    insert(response);
end

rule "Rule 6"
when
    $acquisition : Acquisition(
        eligibileDPE == false,
        dateDepotPc == "",
        presenceDpe == false,
        presenceDpeJustificatif == false,
        (dateConstructionDpe == null || dateConstructionDpe == ""),
        etiquetteDpe == "",
        (valeurCep == 0.0 || valeurCep == 0.0),
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "07", "02", "N");
    insert(response);
end

rule "Rule 7"
when
    $acquisition : Acquisition(
        eligibileDPE == false,
        dateDepotPc == "",
        presenceDpe == false,
        presenceDpeJustificatif == false,
        (dateConstructionDpe == null || dateConstructionDpe == ""),
        etiquetteDpe == "",
        (valeurCep == 0.0 || valeurCep == 0.0),
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "07", "02", "N");
    insert(response);
end

rule "Rule 8"
when
    $acquisition : Acquisition(
        eligibileDPE == false,
        dateDepotPc == "",
        presenceDpe == false,
        presenceDpeJustificatif == false,
        (dateConstructionDpe == null || dateConstructionDpe == ""),
        etiquetteDpe == "",
        (valeurCep == 0.0 || valeurCep == 0.0),
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "07", "02", "N");
    insert(response);
end

rule "Rule 9"
when
    $acquisition : Acquisition(
        eligibileDPE == false,
        dateDepotPc == "",
        presenceDpe == false,
        presenceDpeJustificatif == false,
        (dateConstructionDpe == null || dateConstructionDpe == ""),
        etiquetteDpe == "",
        (valeurCep == 0.0 || valeurCep == 0.0),
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "07", "02", "N");
    insert(response);
end

rule "Rule 10"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == "31/12/2012",
        presenceDpe == true,
        presenceDpeJustificatif == true,
        (dateConstructionDpe == null || dateConstructionDpe == ""),
        etiquetteDpe == "A",
        (valeurCep == 0.0 || valeurCep == 0.0),
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "Y");
    insert(response);
end

rule "Rule 11"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == "31/12/2012",
        presenceDpe == true,
        presenceDpeJustificatif == true,
        (dateConstructionDpe == null || dateConstructionDpe == ""),
        etiquetteDpe == "<> A",
        (valeurCep == 0.0 || valeurCep == 0.0),
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "Y");
    insert(response);
end

rule "Rule 12"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == "31/12/2012",
        presenceDpe == true,
        presenceDpeJustificatif == true,
        (dateConstructionDpe == null || dateConstructionDpe == ""),
        etiquetteDpe == "<> A",
        (valeurCep == 0.0 || valeurCep == 0.0),
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "N");
    insert(response);
end

rule "Rule 13"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == "01/01/2013",
        presenceDpe == true,
        presenceDpeJustificatif == true,
        (dateConstructionDpe == null || dateConstructionDpe == ""),
        etiquetteDpe == "A",
        (valeurCep == 0.0 || valeurCep == 0.0),
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "Y");
    insert(response);
end

rule "Rule 14"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == "01/01/2013",
        presenceDpe == true,
        presenceDpeJustificatif == true,
        (dateConstructionDpe == null || dateConstructionDpe == ""),
        etiquetteDpe == "<> A",
        (valeurCep == 0.0 || valeurCep == 0.0),
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "Y");
    insert(response);
end

rule "Rule 15"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == "01/01/2013",
        presenceDpe == true,
        presenceDpeJustificatif == true,
        (dateConstructionDpe == null || dateConstructionDpe == ""),
        etiquetteDpe == "<> A",
        (valeurCep == 0.0 || valeurCep == 0.0),
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "N");
    insert(response);
end

rule "Rule 16"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == "01/01/2021",
        presenceDpe == true,
        presenceDpeJustificatif == true,
        (dateConstructionDpe == null || dateConstructionDpe == ""),
        etiquetteDpe == "",
        (valeurCep == 0.0 || valeurCep == 0.0),
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "Y");
    insert(response);
end

rule "Rule 17"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == "01/01/2021",
        presenceDpe == true,
        presenceDpeJustificatif == true,
        (dateConstructionDpe == null || dateConstructionDpe == ""),
        etiquetteDpe == "",
        (valeurCep == 0.0 || valeurCep == 0.0),
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "N");
    insert(response);
end

rule "Rule 18"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == "01/01/2022",
        presenceDpe == true,
        presenceDpeJustificatif == true,
        (dateConstructionDpe == null || dateConstructionDpe == ""),
        etiquetteDpe == "",
        (valeurCep == 0.0 || valeurCep == 0.0),
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "Y");
    insert(response);
end

rule "Rule 19"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == "",
        presenceDpe == false,
        presenceDpeJustificatif == true,
        (dateConstructionDpe == null || dateConstructionDpe == "31/12/2012"),
        etiquetteDpe == "A",
        (valeurCep == 0.0 || valeurCep == 0.0),
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "Y");
    insert(response);
end

rule "Rule 20"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == "",
        presenceDpe == false,
        presenceDpeJustificatif == true,
        (dateConstructionDpe == null || dateConstructionDpe == "31/12/2012"),
        etiquetteDpe == "<> A",
        (valeurCep == 0.0 || valeurCep == 0.0),
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "Y");
    insert(response);
end

rule "Rule 21"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == "",
        presenceDpe == false,
        presenceDpeJustificatif == true,
        (dateConstructionDpe == null || dateConstructionDpe == "31/12/2012"),
        etiquetteDpe == "<> A",
        (valeurCep == 0.0 || valeurCep == 0.0),
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "N");
    insert(response);
end

rule "Rule 22"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == "",
        presenceDpe == false,
        presenceDpeJustificatif == true,
        (dateConstructionDpe == null || dateConstructionDpe == "31/12/2012"),
        etiquetteDpe == "",
        (valeurCep == 0.0 || valeurCep == 0.0),
        normeThermique == "RT2012",
        presenceNormeThermiqueJustificatif == true
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "Y");
    insert(response);
end

rule "Rule 23"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == "",
        presenceDpe == false,
        presenceDpeJustificatif == true,
        (dateConstructionDpe == null || dateConstructionDpe == "31/12/2012"),
        etiquetteDpe == "",
        (valeurCep == 0.0 || valeurCep == 0.0),
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "07", "02", "");
    insert(response);
end

rule "Rule 24"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == "",
        presenceDpe == false,
        presenceDpeJustificatif == true,
        (dateConstructionDpe == null || dateConstructionDpe == "01/01/2013"),
        etiquetteDpe == "A",
        (valeurCep == 0.0 || valeurCep == 0.0),
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "Y");
    insert(response);
end

rule "Rule 25"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == "",
        presenceDpe == false,
        presenceDpeJustificatif == true,
        (dateConstructionDpe == null || dateConstructionDpe == "01/01/2013"),
        etiquetteDpe == "<> A",
        (valeurCep == 0.0 || valeurCep == 0.0),
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "Y");
    insert(response);
end

rule "Rule 26"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == "",
        presenceDpe == false,
        presenceDpeJustificatif == true,
        (dateConstructionDpe == null || dateConstructionDpe == "01/01/2013"),
        etiquetteDpe == "<> A",
        (valeurCep == 0.0 || valeurCep == 0.0),
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "N");
    insert(response);
end

rule "Rule 27"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == "",
        presenceDpe == false,
        presenceDpeJustificatif == true,
        (dateConstructionDpe == null || dateConstructionDpe == "01/01/2013"),
        etiquetteDpe == "",
        (valeurCep == 0.0 || valeurCep == 0.0),
        normeThermique == "RT2012",
        presenceNormeThermiqueJustificatif == true
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "Y");
    insert(response);
end

rule "Rule 28"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == "",
        presenceDpe == false,
        presenceDpeJustificatif == true,
        (dateConstructionDpe == null || dateConstructionDpe == "01/01/2013"),
        etiquetteDpe == "",
        (valeurCep == 0.0 || valeurCep == 0.0),
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "07", "02", "");
    insert(response);
end

rule "Rule 29"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == "",
        presenceDpe == false,
        presenceDpeJustificatif == true,
        (dateConstructionDpe == null || dateConstructionDpe == "01/01/2021"),
        etiquetteDpe == "",
        (valeurCep == 0.0 || valeurCep == 0.0),
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "Y");
    insert(response);
end

rule "Rule 30"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == "",
        presenceDpe == false,
        presenceDpeJustificatif == true,
        (dateConstructionDpe == null || dateConstructionDpe == "01/01/2021"),
        etiquetteDpe == "",
        (valeurCep == 0.0 || valeurCep == 0.0),
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "N");
    insert(response);
end

rule "Rule 31"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == "",
        presenceDpe == false,
        presenceDpeJustificatif == true,
        (dateConstructionDpe == null || dateConstructionDpe == "01/01/2022"),
        etiquetteDpe == "",
        (valeurCep == 0.0 || valeurCep == 0.0),
        normeThermique == "RE2020",
        presenceNormeThermiqueJustificatif == true
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "Y");
    insert(response);
end

rule "Rule 32"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == "",
        presenceDpe == false,
        presenceDpeJustificatif == true,
        (dateConstructionDpe == null || dateConstructionDpe == "01/01/2022"),
        etiquetteDpe == "",
        (valeurCep == 0.0 || valeurCep == 0.0),
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "07", "02", "");
    insert(response);
end

rule "Rule 33"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == "",
        presenceDpe == false,
        presenceDpeJustificatif == true,
        (dateConstructionDpe == null || dateConstructionDpe == "01/01/2022"),
        etiquetteDpe == "",
        (valeurCep == 0.0 || valeurCep == 0.0),
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "Y");
    insert(response);
end

rule "Rule 34"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == "",
        presenceDpe == false,
        presenceDpeJustificatif == true,
        (dateConstructionDpe == null || dateConstructionDpe == "01/01/2022"),
        etiquetteDpe == "",
        (valeurCep == 0.0 || valeurCep == 0.0),
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "N");
    insert(response);
end

rule "Rule 35"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == "",
        presenceDpe == false,
        presenceDpeJustificatif == false,
        (dateConstructionDpe == null || dateConstructionDpe == ""),
        etiquetteDpe == "",
        (valeurCep == 0.0 || valeurCep == 0.0),
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "07", "02", "");
    insert(response);
end

rule "Rule 36"
when
    $acquisition : Acquisition(
        eligibileDPE == false,
        dateDepotPc == "",
        presenceDpe == false,
        presenceDpeJustificatif == false,
        (dateConstructionDpe == null || dateConstructionDpe == ""),
        etiquetteDpe == "",
        (valeurCep == 0.0 || valeurCep == 0.0),
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("", "", "", "", "");
    insert(response);
end

rule "Rule 37"
when
    $acquisition : Acquisition(
        eligibileDPE == false,
        dateDepotPc == "",
        presenceDpe == false,
        presenceDpeJustificatif == false,
        (dateConstructionDpe == null || dateConstructionDpe == ""),
        etiquetteDpe == "",
        (valeurCep == 0.0 || valeurCep == 0.0),
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("", "", "", "", "");
    insert(response);
end

rule "Rule 38"
when
    $acquisition : Acquisition(
        eligibileDPE == false,
        dateDepotPc == "",
        presenceDpe == false,
        presenceDpeJustificatif == false,
        (dateConstructionDpe == null || dateConstructionDpe == ""),
        etiquetteDpe == "",
        (valeurCep == 0.0 || valeurCep == 0.0),
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("", "", "", "", "");
    insert(response);
end

