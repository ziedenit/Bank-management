package com.cl.msofd.repository;

import com.cl.msofd.model.Dpe;
import com.cl.msofd.model.Financement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Repository
public class DpeRepositoryImp implements DpeRepositoryCustom {

    @Autowired
    MongoTemplate mongoTemplate;

    @Override
    public List<Dpe> findDpeActuelByIdReper(List<String> ids) {

        Query query = new Query();
        query.addCriteria(Criteria.where("Intervenant.idReper").in(ids));

        return mongoTemplate.find(query, Financement.class)
                .stream()
                .map(financement -> financement.getObjetFinancement().get(0).getBien().getDpeActuel())
                .collect(Collectors.toList());


    }
}
//
 @Test
    void should_return_dpe_actuel_for_intervenant_based_on_id_reper() throws Exception {
        // Mock Dpe actuel
        Dpe dpeActuel = new Dpe();
        dpeActuel.setClasseCep("C");
        dpeActuel.setClasseGes("B");
        dpeActuel.setEstimationCep(0.9);
        dpeActuel.setEstimationGes(0.9);
        dpeActuel.setDateEtablissementDpe(new Date());
        dpeActuel.setDateReceptionDpe(new Date());
        dpeActuel.setDateReceptionDpe(new Date());
        dpeActuel.setNumeroDpe("2337E1287825F");

        //Mock  Bien
        Bien firstBien = new Bien();
        firstBien.setCodeBatiment("00001");
        firstBien.setTypeBatiment("Appartement");
        firstBien.setAdresseComplete("11 Avenue Pierre 06150 Cannes");
        firstBien.setCodePostal("66150");
        firstBien.setSurfaceBien(100.0);
        firstBien.setAnneeConstruction(1999);
        firstBien.setDpeActuel(dpeActuel);
        firstBien.setMontantFinanceLCL(10000.00);
        // Mock ObjetFinancement
        ObjetFinancement firstObject = new ObjetFinancement();
        firstObject.setCodeObjetFinancement("02");
        firstObject.setQuotePartObjet(100.0);
        firstObject.setGainCEP(25.0);
        firstObject.setBien(firstBien);
        // Mock Intervenant
        Intervenant intervenant = new Intervenant();
        List<String> idRepers = new ArrayList<>();
        idRepers.add("8415595180");
        intervenant.setIdReper(idRepers);
        // Mock Financement
        Financement firstFinancement = new Financement();
        firstFinancement.setIdFinancement("111aaa888");
        ArrayList<ObjetFinancement> listObjets = new ArrayList<>();
        listObjets.add(firstObject);
        firstFinancement.setObjetFinancement(listObjets);
        firstFinancement.setIndicateurNatureDurable("saaxxb");
        firstFinancement.setIntervenant(intervenant);
        financementService.createFinancement(firstFinancement);

        List<String> idReper = new ArrayList<>();
        idReper.add("8415595180");
        Dpe dpe = dpeService.getDpeActuelByIdReper(idReper).get(0);
        Assertions.assertEquals(dpeActuel.getEstimationCep(), dpe.getEstimationCep());
    }
//
package com.cl.msofd.model;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import lombok.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ObjetFinancement  implements Serializable {

    private String idObjetFinancement;

    @Pattern(regexp = "^$|(02|03|0203|null)$", message = "code objet financement invalide")
    private String codeObjetFinancement;

    @Min(0)
    @Max(100)
    private Double quotePartObjet;

    private String codeFamilleObjet;
    private Double gainCEP;
    private Date dateFinTravaux;

    @Valid
    private Bien bien;

    private Dpe dpeAvantTravaux;
    private Dpe dpeApresTravaux;
    private Alignement alignement;
    private Eligibilite eligibilite;
    private List<Garantie> garantie = new ArrayList<>();
    private List<Piece> piecesJustificatives = new ArrayList<>();
    private int statut;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ObjetFinancement)) return false;
        if (!super.equals(o)) return false;
        ObjetFinancement that = (ObjetFinancement) o;
        return statut == that.statut &&
                Objects.equals(idObjetFinancement, that.idObjetFinancement) &&
                Objects.equals(codeObjetFinancement, that.codeObjetFinancement) &&
                Objects.equals(quotePartObjet, that.quotePartObjet) &&
                Objects.equals(codeFamilleObjet, that.codeFamilleObjet) &&
                Objects.equals(gainCEP, that.gainCEP) &&
                Objects.equals(dateFinTravaux, that.dateFinTravaux) &&
                Objects.equals(bien, that.bien) &&
                Objects.equals(dpeAvantTravaux, that.dpeAvantTravaux) &&
                Objects.equals(dpeApresTravaux, that.dpeApresTravaux) &&
                Objects.equals(alignement, that.alignement) &&
                Objects.equals(eligibilite, that.eligibilite) &&
                Objects.equals(garantie, that.garantie) &&
                Objects.equals(piecesJustificatives, that.piecesJustificatives);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), idObjetFinancement, codeObjetFinancement, quotePartObjet, codeFamilleObjet, gainCEP, dateFinTravaux, bien, dpeAvantTravaux, dpeApresTravaux, alignement, eligibilite, garantie, piecesJustificatives, statut);
    }
}
//
package com.cl.msofd.model;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import lombok.*;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Bien  implements Serializable {


    private String idBien;

    @Pattern(regexp = "^(00001|00002|00003|00004|00005|00006|99999)$", message = "le champ codeBatiment doit etre l'une des valeurs" +
            " 00001 00002 00003 00004 00005 00006 99999")
    private String codeBatiment;

    private String typeBatiment; // Maison individuelle     Appartement

    //adresse Bien
    private String numeroVoie;
    private String typeVoie;
    private String nomRue;
    private String batiment;
    private String escalier;
    private String etage;
    private String porte;
    private String codePostal;
    private String nomCommune;
    private String paysBien;
    private String adresseComplete;

    private String codeNormeThermique; //   01: RT2012     02: RE2020    99: Autre

    private String etatBien;

    private String typeEnergie;
    private String codeTypeEnergie;

    private String codeDepartement;
    private String codeInseeCommune;
    private String numeroLot;
    private String numeroNomRue;

    private String typeUsage; //0: Non applicable    1: Immobilier résidentiel    2: Immobilier professionnel

    @Min(1700)
    @Max(2024)
    private Integer anneeConstruction;

    private String periodeConstruction;
    private Date dateDepotPc;
    private Date dateDebutConstruction;

    @Min(0)
    private Double surfaceBien;
    private boolean bienFinanceLCL;
    private String numeroFiscalLocal;
    private String eligibleDpe;

    private List<LabelBien> labelBien;
    @Min(0)
    private Double coordonneeCartographiqueX;

    @Min(0)
    private Double coordonneeCartographiqueY;

    @Min(0)
    private Double prixBien;

    @Min(0)
    private Double montantFinanceLCL;

    @Min(0)
    private Double partLCL;

    @Valid
    private Dpe dpeActuel;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Bien bien = (Bien) o;
        return bienFinanceLCL == bien.bienFinanceLCL && Objects.equals(idBien, bien.idBien)
                && Objects.equals(codeBatiment, bien.codeBatiment) && Objects.equals(codeNormeThermique, bien.codeNormeThermique)
                && Objects.equals(typeBatiment, bien.typeBatiment) && Objects.equals(numeroVoie, bien.numeroVoie) && Objects.equals(typeVoie, bien.typeVoie) && Objects.equals(nomRue, bien.nomRue) && Objects.equals(etatBien, bien.etatBien) && Objects.equals(typeEnergie, bien.typeEnergie) && Objects.equals(codeTypeEnergie, bien.codeTypeEnergie) && Objects.equals(batiment, bien.batiment) && Objects.equals(escalier, bien.escalier) && Objects.equals(etage, bien.etage) && Objects.equals(porte, bien.porte) && Objects.equals(codePostal, bien.codePostal) && Objects.equals(nomCommune, bien.nomCommune) && Objects.equals(paysBien, bien.paysBien) && Objects.equals(adresseComplete, bien.adresseComplete) && Objects.equals(codeDepartement, bien.codeDepartement) && Objects.equals(codeInseeCommune, bien.codeInseeCommune) && Objects.equals(numeroLot, bien.numeroLot) && Objects.equals(numeroNomRue, bien.numeroNomRue) && Objects.equals(typeUsage, bien.typeUsage) && Objects.equals(anneeConstruction, bien.anneeConstruction) && Objects.equals(periodeConstruction, bien.periodeConstruction) && Objects.equals(dateDepotPc, bien.dateDepotPc) && Objects.equals(dateDebutConstruction, bien.dateDebutConstruction) && Objects.equals(surfaceBien, bien.surfaceBien) && Objects.equals(numeroFiscalLocal, bien.numeroFiscalLocal) && Objects.equals(coordonneeCartographiqueX, bien.coordonneeCartographiqueX) && Objects.equals(coordonneeCartographiqueY, bien.coordonneeCartographiqueY) && Objects.equals(prixBien, bien.prixBien) && Objects.equals(montantFinanceLCL, bien.montantFinanceLCL) && Objects.equals(partLCL, bien.partLCL) && Objects.equals(dpeActuel, bien.dpeActuel);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), idBien, codeBatiment, codeNormeThermique, typeBatiment, numeroVoie, typeVoie, nomRue, etatBien, typeEnergie, codeTypeEnergie, batiment, escalier, etage, porte, codePostal, nomCommune, paysBien, adresseComplete, codeDepartement, codeInseeCommune, numeroLot, numeroNomRue, typeUsage, anneeConstruction, periodeConstruction, dateDepotPc, dateDebutConstruction, surfaceBien, bienFinanceLCL, numeroFiscalLocal, coordonneeCartographiqueX, coordonneeCartographiqueY, prixBien, montantFinanceLCL, partLCL, dpeActuel);
    }


}

//
package com.cl.msofd.model;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import lombok.*;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Dpe implements Serializable {

    private String idDpe;

    private String numeroDpe;

    private String codeModeleDpeType;

    @Min(0)
    private Double estimationCep;

    @Pattern(regexp = "^$|(A|B|C|D|E|F|G|null)$", message = "Etiquette CEP doit etre soit A B C D E F G")
    private String classeCep;

    @Min(0)
    private Double estimationGes;

    @Pattern(regexp = "^$|(A|B|C|D|E|F|G|null)$", message = "Etiquette GES doit etre soit A B C D E F G")
    private String classeGes;

    private Date dateEtablissementDpe;
    private Date dateReceptionDpe;
    private Date dateFinValiditeDpe;

    private String sirenDiagnostiqueur;

    private String modelDpe;
    private String numeroDpeRemplace;
    private String versionDpe;
    private String methodeDpeApplique;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Dpe dpe = (Dpe) o;
        return Objects.equals(idDpe, dpe.idDpe) && Objects.equals(numeroDpe, dpe.numeroDpe) && Objects.equals(codeModeleDpeType, dpe.codeModeleDpeType) && Objects.equals(estimationCep, dpe.estimationCep) && Objects.equals(classeCep, dpe.classeCep) && Objects.equals(estimationGes, dpe.estimationGes) && Objects.equals(classeGes, dpe.classeGes) && Objects.equals(dateEtablissementDpe, dpe.dateEtablissementDpe) && Objects.equals(dateReceptionDpe, dpe.dateReceptionDpe) && Objects.equals(dateFinValiditeDpe, dpe.dateFinValiditeDpe) && Objects.equals(sirenDiagnostiqueur, dpe.sirenDiagnostiqueur) && Objects.equals(modelDpe, dpe.modelDpe) && Objects.equals(numeroDpeRemplace, dpe.numeroDpeRemplace) && Objects.equals(versionDpe, dpe.versionDpe) && Objects.equals(methodeDpeApplique, dpe.methodeDpeApplique);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), idDpe, numeroDpe, codeModeleDpeType, estimationCep, classeCep, estimationGes, classeGes, dateEtablissementDpe, dateReceptionDpe, dateFinValiditeDpe, sirenDiagnostiqueur, modelDpe, numeroDpeRemplace, versionDpe, methodeDpeApplique);
    }
}

//

org.springframework.data.mapping.model.MappingInstantiationException: Failed to instantiate java.util.List using constructor NO_CONSTRUCTOR with arguments 

	at org.springframework.data.mapping.model.ReflectionEntityInstantiator.instantiateClass(ReflectionEntityInstantiator.java:142)
	at org.springframework.data.mapping.model.ReflectionEntityInstantiator.createInstance(ReflectionEntityInstantiator.java:57)
	at org.springframework.data.mapping.model.ClassGeneratingEntityInstantiator.createInstance(ClassGeneratingEntityInstantiator.java:98)
	at org.springframework.data.mongodb.core.convert.MappingMongoConverter.read(MappingMongoConverter.java:512)
	at org.springframework.data.mongodb.core.convert.MappingMongoConverter.readDocument(MappingMongoConverter.java:480)
	at org.springframework.data.mongodb.core.convert.MappingMongoConverter$DefaultConversionContext.convert(MappingMongoConverter.java:2359)
	at org.springframework.data.mongodb.core.convert.MappingMongoConverter$ConversionContext.convert(MappingMongoConverter.java:2168)
	at org.springframework.data.mongodb.core.convert.MappingMongoConverter$MongoDbPropertyValueProvider.getPropertyValue(MappingMongoConverter.java:1934)
	at org.springframework.data.mongodb.core.convert.MappingMongoConverter.readProperties(MappingMongoConverter.java:620)
	at org.springframework.data.mongodb.core.convert.MappingMongoConverter.populateProperties(MappingMongoConverter.java:537)
	at org.springframework.data.mongodb.core.convert.MappingMongoConverter.read(MappingMongoConverter.java:514)
	at org.springframework.data.mongodb.core.convert.MappingMongoConverter.readDocument(MappingMongoConverter.java:480)
	at org.springframework.data.mongodb.core.convert.MappingMongoConverter.read(MappingMongoConverter.java:416)
	at org.springframework.data.mongodb.core.convert.MappingMongoConverter.read(MappingMongoConverter.java:412)
	at org.springframework.data.mongodb.core.convert.MappingMongoConverter.read(MappingMongoConverter.java:119)
	at org.springframework.data.mongodb.core.MongoTemplate$ReadDocumentCallback.doWith(MongoTemplate.java:3278)
	at org.springframework.data.mongodb.core.MongoTemplate.executeFindMultiInternal(MongoTemplate.java:2912)
	at org.springframework.data.mongodb.core.MongoTemplate.doFind(MongoTemplate.java:2592)
	at org.springframework.data.mongodb.core.MongoTemplate.doFind(MongoTemplate.java:2573)
	at org.springframework.data.mongodb.core.MongoTemplate.find(MongoTemplate.java:866)
	at org.springframework.data.mongodb.core.MongoTemplate.find(MongoTemplate.java:856)
	at com.cl.msofd.repository.DpeRepositoryImp.findDpeActuelByIdReper(DpeRepositoryImp.java:26)
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:77)
	at java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.base/java.lang.reflect.Method.invoke(Method.java:568)
	at org.springframework.aop.support.AopUtils.invokeJoinpointUsingReflection(AopUtils.java:351)
	at org.springframework.aop.framework.ReflectiveMethodInvocation.invokeJoinpoint(ReflectiveMethodInvocation.java:196)
	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:163)
	at org.springframework.aop.framework.CglibAopProxy$CglibMethodInvocation.proceed(CglibAopProxy.java:765)
	at org.springframework.dao.support.PersistenceExceptionTranslationInterceptor.invoke(PersistenceExceptionTranslationInterceptor.java:137)
	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:184)
	at org.springframework.aop.framework.CglibAopProxy$CglibMethodInvocation.proceed(CglibAopProxy.java:765)
	at org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:717)
	at com.cl.msofd.repository.DpeRepositoryImp$$SpringCGLIB$$0.findDpeActuelByIdReper(<generated>)
	at com.cl.msofd.service.DpeService.getDpeActuelByIdReper(DpeService.java:24)
	at com.cl.msofd.service.DpeServiceTest.should_return_dpe_actuel_for_intervenant_based_on_id_reper(DpeServiceTest.java:103)
	at java.base/java.lang.reflect.Method.invoke(Method.java:568)
	at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)
	at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)
Caused by: org.springframework.beans.BeanInstantiationException: Failed to instantiate [java.util.List]: Specified class is an interface
	at org.springframework.beans.BeanUtils.instantiateClass(BeanUtils.java:137)
	at org.springframework.data.mapping.model.ReflectionEntityInstantiator.instantiateClass(ReflectionEntityInstantiator.java:139)
	... 39 more
