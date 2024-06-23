
Error starting ApplicationContext. To display the condition evaluation report re-run your application with 'debug' enabled.
time=2024-06-23T14:48:12.743+02:00|level=ERROR|event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=Application run failed - java.lang.IllegalStateException: Failed to execute CommandLineRunner
	at org.springframework.boot.SpringApplication.lambda$callRunner$6(SpringApplication.java:797)
	at org.springframework.util.function.ThrowingConsumer.accept(ThrowingConsumer.java:66)
	at org.springframework.util.function.ThrowingConsumer$1.accept(ThrowingConsumer.java:88)
	at org.springframework.boot.SpringApplication.callRunner(SpringApplication.java:798)
	at org.springframework.boot.SpringApplication.callRunner(SpringApplication.java:789)
	at org.springframework.boot.SpringApplication.lambda$callRunners$3(SpringApplication.java:774)
	at java.base/java.util.stream.ForEachOps$ForEachOp$OfRef.accept(ForEachOps.java:183)
	at java.base/java.util.stream.SortedOps$SizedRefSortingSink.end(SortedOps.java:357)
	at java.base/java.util.stream.AbstractPipeline.copyInto(AbstractPipeline.java:510)
	at java.base/java.util.stream.AbstractPipeline.wrapAndCopyInto(AbstractPipeline.java:499)
	at java.base/java.util.stream.ForEachOps$ForEachOp.evaluateSequential(ForEachOps.java:150)
	at java.base/java.util.stream.ForEachOps$ForEachOp$OfRef.evaluateSequential(ForEachOps.java:173)
	at java.base/java.util.stream.AbstractPipeline.evaluate(AbstractPipeline.java:234)
	at java.base/java.util.stream.ReferencePipeline.forEach(ReferencePipeline.java:596)
	at org.springframework.boot.SpringApplication.callRunners(SpringApplication.java:774)
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:341)
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1354)
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1343)
	at com.cl.msofd.MsofdApplication.main(MsofdApplication.java:22)
Caused by: java.nio.file.NoSuchFileException: path\to\your\xls\directory
	at java.base/sun.nio.fs.WindowsException.translateToIOException(WindowsException.java:85)
	at java.base/sun.nio.fs.WindowsException.asIOException(WindowsException.java:112)
	at java.base/sun.nio.fs.WindowsWatchService$Poller.implRegister(WindowsWatchService.java:366)
	at java.base/sun.nio.fs.AbstractPoller.processRequests(AbstractPoller.java:266)
	at java.base/sun.nio.fs.WindowsWatchService$Poller.run(WindowsWatchService.java:596)
	at java.base/java.lang.Thread.run(Thread.java:842)

time=2024-06-23T14:48:12.840+02:00|level=INFO |event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=Closing JPA EntityManagerFactory for persistence unit 'default'
time=2024-06-23T14:48:12.844+02:00|level=INFO |event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=HikariPool-1 - Shutdown initiated...
time=2024-06-23T14:48:12.846+02:00|level=INFO |event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=HikariPool-1 - Shutdown completed.

Process finished with exit code 1
je pense que le FileWatcherRunner pose probleme niveau methode run quelle sont les arges a passer
