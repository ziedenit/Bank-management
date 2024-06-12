package com.cl.msofd.utility;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Date;
@Getter
@Setter
public class Rule implements Serializable {
    @Id
    private String id;
    private boolean eligibleDPE;
    private Date dateDepotPc;
    private boolean presenceDpe;
    private boolean presenceDpeJustificatif;
    private String etiquetteDpe;
    private double valeurCep;
    private String normeThermique;
    private boolean presenceNormeThermiqueJustificatif;
    private String Xtra248;
    private String Xtra249;
    private String Xtra250;
    private String Xtra251;
    private String Xtra275;


}
