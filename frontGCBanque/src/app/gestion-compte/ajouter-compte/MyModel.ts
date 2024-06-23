time=2024-06-23T21:23:17.311+02:00|level=INFO |event_cod=empty|event_typ=APPLICATIVE|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=searching ValeurCepMax by code : 00001
Generated rules: 
package com.cl.msofd.engineRules.rules;
import com.cl.msofd.engineRules.Acquisition;
import com.cl.msofd.engineRules.AcquisitionResponse;
global java.util.List responses;

rule "Rule 1"
when
    $acquisition : Acquisition(
        eligibileDPE == false,
        dateDepotPc == null,
        dpePresent == false,
        presenceDpeJustificatif == false,
        dateConstructionDpe == null,
        etiquetteDpe == "A",
        valeurCep == 0.0,
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "07", "02", "N");
    responses.add(response);
end

rule "Rule 2"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc != null && dateDepotPc.before(new java.text.SimpleDateFormat("dd/MM/yyyy").parse("31/12/2012")),
        dpePresent == true,
        presenceDpeJustificatif == true,
        dateConstructionDpe == null,
        etiquetteDpe == "A",
        valeurCep == 0.0,
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "Y");
    responses.add(response);
end

rule "Rule 3"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc != null && dateDepotPc.before(new java.text.SimpleDateFormat("dd/MM/yyyy").parse("31/12/2012")),
        dpePresent == true,
        presenceDpeJustificatif == true,
        dateConstructionDpe == null,
        etiquetteDpe != "A",
        valeurCep <= 135.0,
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "Y");
    responses.add(response);
end

rule "Rule 4"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc != null && dateDepotPc.before(new java.text.SimpleDateFormat("dd/MM/yyyy").parse("31/12/2012")),
        dpePresent == true,
        presenceDpeJustificatif == true,
        dateConstructionDpe == null,
        etiquetteDpe != "A",
        valeurCep > 135.0,
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "Z");
    responses.add(response);
end

rule "Rule 5"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc != null && dateDepotPc.after(new java.text.SimpleDateFormat("dd/MM/yyyy").parse("01/01/2013")) && dateDepotPc.before(new java.text.SimpleDateFormat("dd/MM/yyyy").parse("31/12/2020")),
        dpePresent == true,
        presenceDpeJustificatif == true,
        dateConstructionDpe == null,
        etiquetteDpe == "A",
        valeurCep == 0.0,
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "Y");
    responses.add(response);
end

rule "Rule 6"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc != null && dateDepotPc.after(new java.text.SimpleDateFormat("dd/MM/yyyy").parse("01/01/2013")) && dateDepotPc.before(new java.text.SimpleDateFormat("dd/MM/yyyy").parse("31/12/2020")),
        dpePresent == true,
        presenceDpeJustificatif == true,
        dateConstructionDpe == null,
        etiquetteDpe != "A",
        valeurCep <= 135.0,
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "Y");
    responses.add(response);
end

rule "Rule 7"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc != null && dateDepotPc.after(new java.text.SimpleDateFormat("dd/MM/yyyy").parse("01/01/2013")) && dateDepotPc.before(new java.text.SimpleDateFormat("dd/MM/yyyy").parse("31/12/2020")),
        dpePresent == true,
        presenceDpeJustificatif == true,
        dateConstructionDpe == null,
        etiquetteDpe != "A",
        valeurCep > 135.0,
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "N");
    responses.add(response);
end

rule "Rule 8"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc != null && dateDepotPc.after(new java.text.SimpleDateFormat("dd/MM/yyyy").parse("01/01/2021")) && dateDepotPc.before(new java.text.SimpleDateFormat("dd/MM/yyyy").parse("31/12/2021")),
        dpePresent == true,
        presenceDpeJustificatif == true,
        dateConstructionDpe == null,
        etiquetteDpe == null,
        valeurCep <= 45.0,
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "Y");
    responses.add(response);
end

rule "Rule 9"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc != null && dateDepotPc.after(new java.text.SimpleDateFormat("dd/MM/yyyy").parse("01/01/2021")) && dateDepotPc.before(new java.text.SimpleDateFormat("dd/MM/yyyy").parse("31/12/2021")),
        dpePresent == true,
        presenceDpeJustificatif == true,
        dateConstructionDpe == null,
        etiquetteDpe == null,
        valeurCep > 45.0,
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "N");
    responses.add(response);
end

rule "Rule 10"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc != null && dateDepotPc.before(new java.text.SimpleDateFormat("dd/MM/yyyy").parse("01/01/2022")),
        dpePresent == true,
        presenceDpeJustificatif == true,
        dateConstructionDpe == null,
        etiquetteDpe == null,
        valeurCep == 0.0,
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "Y");
    responses.add(response);
end

rule "Rule 11"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == null,
        dpePresent == false,
        presenceDpeJustificatif == true,
        dateConstructionDpe != null && dateConstructionDpe.before(new java.text.SimpleDateFormat("dd/MM/yyyy").parse("31/12/2012")),
        etiquetteDpe == "A",
        valeurCep == 0.0,
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "Y");
    responses.add(response);
end

rule "Rule 12"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == null,
        dpePresent == false,
        presenceDpeJustificatif == true,
        dateConstructionDpe != null && dateConstructionDpe.before(new java.text.SimpleDateFormat("dd/MM/yyyy").parse("31/12/2012")),
        etiquetteDpe != "A",
        valeurCep <= 135.0,
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "Y");
    responses.add(response);
end

rule "Rule 13"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == null,
        dpePresent == false,
        presenceDpeJustificatif == true,
        dateConstructionDpe != null && dateConstructionDpe.before(new java.text.SimpleDateFormat("dd/MM/yyyy").parse("31/12/2012")),
        etiquetteDpe != "A",
        valeurCep > 135.0,
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "N");
    responses.add(response);
end

rule "Rule 14"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == null,
        dpePresent == false,
        presenceDpeJustificatif == true,
        dateConstructionDpe != null && dateConstructionDpe.before(new java.text.SimpleDateFormat("dd/MM/yyyy").parse("31/12/2012")),
        etiquetteDpe == null,
        valeurCep == 0.0,
        normeThermique == "RT2012",
        presenceNormeThermiqueJustificatif == true
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "Y");
    responses.add(response);
end

rule "Rule 15"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == null,
        dpePresent == false,
        presenceDpeJustificatif == true,
        dateConstructionDpe != null && dateConstructionDpe.before(new java.text.SimpleDateFormat("dd/MM/yyyy").parse("31/12/2012")),
        etiquetteDpe == null,
        valeurCep == 0.0,
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "07", "02", "");
    responses.add(response);
end

rule "Rule 16"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == null,
        dpePresent == false,
        presenceDpeJustificatif == true,
        dateConstructionDpe != null && dateConstructionDpe.after(new java.text.SimpleDateFormat("dd/MM/yyyy").parse("01/01/2013")) && dateConstructionDpe.before(new java.text.SimpleDateFormat("dd/MM/yyyy").parse("31/12/2020")),
        etiquetteDpe == "A",
        valeurCep == 0.0,
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "Y");
    responses.add(response);
end

rule "Rule 17"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == null,
        dpePresent == false,
        presenceDpeJustificatif == true,
        dateConstructionDpe != null && dateConstructionDpe.after(new java.text.SimpleDateFormat("dd/MM/yyyy").parse("01/01/2013")) && dateConstructionDpe.before(new java.text.SimpleDateFormat("dd/MM/yyyy").parse("31/12/2020")),
        etiquetteDpe != "A",
        valeurCep <= 135.0,
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "Y");
    responses.add(response);
end

rule "Rule 18"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == null,
        dpePresent == false,
        presenceDpeJustificatif == true,
        dateConstructionDpe != null && dateConstructionDpe.after(new java.text.SimpleDateFormat("dd/MM/yyyy").parse("01/01/2013")) && dateConstructionDpe.before(new java.text.SimpleDateFormat("dd/MM/yyyy").parse("31/12/2020")),
        etiquetteDpe != "A",
        valeurCep > 135.0,
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "N");
    responses.add(response);
end

rule "Rule 19"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == null,
        dpePresent == false,
        presenceDpeJustificatif == true,
        dateConstructionDpe != null && dateConstructionDpe.after(new java.text.SimpleDateFormat("dd/MM/yyyy").parse("01/01/2013")) && dateConstructionDpe.before(new java.text.SimpleDateFormat("dd/MM/yyyy").parse("31/12/2020")),
        etiquetteDpe == null,
        valeurCep == 0.0,
        normeThermique == "RT2012",
        presenceNormeThermiqueJustificatif == true
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "Y");
    responses.add(response);
end

rule "Rule 20"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == null,
        dpePresent == false,
        presenceDpeJustificatif == true,
        dateConstructionDpe != null && dateConstructionDpe.after(new java.text.SimpleDateFormat("dd/MM/yyyy").parse("01/01/2013")) && dateConstructionDpe.before(new java.text.SimpleDateFormat("dd/MM/yyyy").parse("31/12/2020")),
        etiquetteDpe == null,
        valeurCep == 0.0,
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "07", "02", "");
    responses.add(response);
end

rule "Rule 21"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == null,
        dpePresent == false,
        presenceDpeJustificatif == true,
        dateConstructionDpe != null && dateConstructionDpe.after(new java.text.SimpleDateFormat("dd/MM/yyyy").parse("01/01/2021")) && dateConstructionDpe.before(new java.text.SimpleDateFormat("dd/MM/yyyy").parse("31/12/2021")),
        etiquetteDpe == null,
        valeurCep <= 45.0,
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "Y");
    responses.add(response);
end

rule "Rule 22"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == null,
        dpePresent == false,
        presenceDpeJustificatif == true,
        dateConstructionDpe != null && dateConstructionDpe.after(new java.text.SimpleDateFormat("dd/MM/yyyy").parse("01/01/2021")) && dateConstructionDpe.before(new java.text.SimpleDateFormat("dd/MM/yyyy").parse("31/12/2021")),
        etiquetteDpe == null,
        valeurCep > 45.0,
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "N");
    responses.add(response);
end

rule "Rule 23"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == null,
        dpePresent == false,
        presenceDpeJustificatif == true,
        dateConstructionDpe != null && dateConstructionDpe.after(new java.text.SimpleDateFormat("dd/MM/yyyy").parse("01/01/2022")),
        etiquetteDpe == null,
        valeurCep == 0.0,
        normeThermique == "RE2020",
        presenceNormeThermiqueJustificatif == true
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "Y");
    responses.add(response);
end

rule "Rule 24"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == null,
        dpePresent == false,
        presenceDpeJustificatif == true,
        dateConstructionDpe != null && dateConstructionDpe.after(new java.text.SimpleDateFormat("dd/MM/yyyy").parse("01/01/2022")),
        etiquetteDpe == null,
        valeurCep == 0.0,
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "07", "02", "");
    responses.add(response);
end

rule "Rule 25"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == null,
        dpePresent == false,
        presenceDpeJustificatif == true,
        dateConstructionDpe != null && dateConstructionDpe.after(new java.text.SimpleDateFormat("dd/MM/yyyy").parse("01/01/2022")),
        etiquetteDpe == null,
        valeurCep <= 45.0,
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "Y");
    responses.add(response);
end

rule "Rule 26"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == null,
        dpePresent == false,
        presenceDpeJustificatif == true,
        dateConstructionDpe != null && dateConstructionDpe.after(new java.text.SimpleDateFormat("dd/MM/yyyy").parse("01/01/2022")),
        etiquetteDpe == null,
        valeurCep > 45.0,
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "06", "02", "N");
    responses.add(response);
end

rule "Rule 27"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc == null,
        dpePresent == false,
        presenceDpeJustificatif == false,
        dateConstructionDpe == null,
        etiquetteDpe == null,
        valeurCep == 0.0,
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("02", "Y", "07", "02", "");
    responses.add(response);
end

rule "Rule 28"
when
    $acquisition : Acquisition(
        eligibileDPE == false,
        dateDepotPc == null,
        dpePresent == false,
        presenceDpeJustificatif == false,
        dateConstructionDpe == null,
        etiquetteDpe == null,
        valeurCep == 0.0,
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("", "", "", "", "");
    responses.add(response);
end

rule "Rule 29"
when
    $acquisition : Acquisition(
        eligibileDPE == false,
        dateDepotPc == null,
        dpePresent == false,
        presenceDpeJustificatif == false,
        dateConstructionDpe == null,
        etiquetteDpe == null,
        valeurCep == 0.0,
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("", "", "", "", "");
    responses.add(response);
end

rule "Rule 30"
when
    $acquisition : Acquisition(
        eligibileDPE == false,
        dateDepotPc == null,
        dpePresent == false,
        presenceDpeJustificatif == false,
        dateConstructionDpe == null,
        etiquetteDpe == null,
        valeurCep == 0.0,
        normeThermique == "",
        presenceNormeThermiqueJustificatif == false
    )
then
    AcquisitionResponse response = new AcquisitionResponse("", "", "", "", "");
    responses.add(response);
end


time=2024-06-23T21:23:36.156+02:00|level=INFO |event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=Start creation of KieBase: defaultKieBase
time=2024-06-23T21:23:36.200+02:00|level=INFO |event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=End creation of KieBase: defaultKieBase
time=2024-06-23T21:23:36.286+02:00|level=ERROR|event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=Unexpected global [responses]
