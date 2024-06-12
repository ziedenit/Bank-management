server.port=8081
spring.data.mongodb.uri=mongodb://user-rw:ShxzBCVWKrhXEYDNiX4k@mongodb-201.dbaas-mongodb.iaas.cagip.group.gca:27017,mongodb-202.dbaas-mongodb.iaas.cagip.group.gca:27017,mongodb-203.dbaas-mongodb.iaas.cagip.group.gca:27017/scripta-lcl-ofd-dev?authSource=scripta-lcl-ofd-dev&appname=scripta-lcl-ofd-dev&w=majority&tls=true&tlscafile=tlsCAFile=./certificats/carioca-bundle.crt&replicaSet=mutu-200
spring.profiles.active=prod
management.endpoints.web.exposure.include=health,info,metrics,prometheus
management.endpoint.health.show-details=always
server.error.include-message=always
msofd.users=user1:user1Pass;user2:user2Pass
retry=3
logs.app=MSOFD
logs.uomCod=20001
# ademe info
ademe.proxy.host=127.0.0.1
ademe.proxy.port=3128
# referentiel info
referentiel.personne.url=https://rct-reper-rp.hors-prod.caas.lcl.gca/msreperperson/person?person_id=%s

referentiel.user=user1
referentiel.password=password1
arbre.url=src/main/resources/arbre.xlsx

# swagger-ui custom path
springdoc.swagger-ui.path=/swagger-ui.html
springdoc.packagesToScan=com.cl.msofd.controller
#springdoc.pathsToMatch=/api/v1


ademe.dpe.save.enabled=true
msofd.version=1.0.1
msofd.date=14/11/2023

this is my application propoerties 
