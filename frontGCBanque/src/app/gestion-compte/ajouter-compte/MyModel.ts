<ErrorResponse>
    <code>TECHNICAL_EXCEPTION_OCCURED </code>
    <message>
        <message>JSON parse error: Cannot deserialize value of type `java.util.Date` from String "30/09/2012": not a valid representation (error: Failed to parse Date value '30/09/2012': Cannot parse date "30/09/2012": not compatible with any of standard forms ("yyyy-MM-dd'T'HH:mm:ss.SSSX", "yyyy-MM-dd'T'HH:mm:ss.SSS", "EEE, dd MMM yyyy HH:mm:ss zzz", "yyyy-MM-dd"))</message>
    </message>
</ErrorResponse>

        je suis en train de tester un service et mon json et le suivant dans postman
{
        "eligibileDPE" : true,
        "dateDepotPc" : "30/09/2012",
        "dpePresent" :true,
        "presenceDpeJustificatif" : true,
        "dateConstructionDpe":null,
        "etiquetteDpe" : "A",
        "valeurCep": 0.0,
        "normeThermique" : "",
        "presenceNormeThermiqueJustificatif" : null
}

je veux que le champs date depot pc soit accepté 
