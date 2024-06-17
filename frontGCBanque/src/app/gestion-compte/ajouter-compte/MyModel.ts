j'ai debuggé KieContainer est non null mais c'est le bean KieSession qui est null 
@Bean
    public KieSession kieSession() {
        KieSession kieSession = kieContainer().newKieSession(droolsFile);
        return kieSession;
    }
en appelant : public KieSession newKieSession(String kSessionName) {
        return this.newKieSession(kSessionName, (Environment)null, (KieSessionConfiguration)null);
    } ca retourne null 


//
//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package org.drools.compiler.kie.builder.impl;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Properties;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import javax.management.ObjectName;
import org.drools.compiler.builder.InternalKnowledgeBuilder;
import org.drools.compiler.builder.impl.KnowledgeBuilderConfigurationImpl;
import org.drools.compiler.kie.builder.MaterializedLambda;
import org.drools.compiler.kie.util.InjectionHelper;
import org.drools.compiler.kie.util.KieJarChangeSet;
import org.drools.compiler.kproject.models.KieBaseModelImpl;
import org.drools.compiler.kproject.models.KieSessionModelImpl;
import org.drools.compiler.management.KieContainerMonitor;
import org.drools.core.SessionConfiguration;
import org.drools.core.SessionConfigurationImpl;
import org.drools.core.impl.InternalKieContainer;
import org.drools.core.impl.InternalKnowledgeBase;
import org.drools.core.impl.KnowledgeBaseImpl;
import org.drools.core.impl.StatefulKnowledgeSessionImpl;
import org.drools.core.impl.StatefulSessionPool;
import org.drools.core.impl.StatelessKnowledgeSessionImpl;
import org.drools.core.management.DroolsManagementAgent;
import org.drools.core.util.ClassUtils;
import org.drools.core.util.Drools;
import org.drools.reflective.classloader.ProjectClassLoader;
import org.kie.api.KieBase;
import org.kie.api.KieBaseConfiguration;
import org.kie.api.KieServices.Factory;
import org.kie.api.builder.KieModule;
import org.kie.api.builder.KieRepository;
import org.kie.api.builder.Message;
import org.kie.api.builder.ReleaseId;
import org.kie.api.builder.Results;
import org.kie.api.builder.Message.Level;
import org.kie.api.builder.model.FileLoggerModel;
import org.kie.api.builder.model.KieBaseModel;
import org.kie.api.builder.model.KieSessionModel;
import org.kie.api.builder.model.KieSessionModel.KieSessionType;
import org.kie.api.conf.MBeansOption;
import org.kie.api.event.KieRuntimeEventManager;
import org.kie.api.internal.utils.ServiceRegistry;
import org.kie.api.io.ResourceType;
import org.kie.api.logger.KieLoggers;
import org.kie.api.runtime.Environment;
import org.kie.api.runtime.KieContainerSessionsPool;
import org.kie.api.runtime.KieSession;
import org.kie.api.runtime.KieSessionConfiguration;
import org.kie.api.runtime.StatelessKieSession;
import org.kie.api.time.Calendar;
import org.kie.internal.builder.ChangeType;
import org.kie.internal.builder.KnowledgeBuilderFactory;
import org.kie.internal.builder.ResourceChangeSet;
import org.kie.internal.builder.ResourceChange.Type;
import org.kie.internal.builder.conf.AlphaNetworkCompilerOption;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class KieContainerImpl implements InternalKieContainer {
    private static final Logger log = LoggerFactory.getLogger(KieContainerImpl.class);
    private KieProject kProject;
    private final Map<String, KieBase> kBases;
    private final Map<String, KieSession> kSessions;
    private final Map<String, StatelessKieSession> statelessKSessions;
    private final KieRepository kr;
    private ReleaseId configuredReleaseId;
    private ReleaseId containerReleaseId;
    private final String containerId;
    private final Map<String, KieSessionConfiguration> sessionConfsCache;
    private static final ResourceType[] TYPES_TO_BE_INCLUDED;

    public KieModule getMainKieModule() {
        return this.kr.getKieModule(this.getReleaseId());
    }

    public KieContainerImpl(KieProject kProject, KieRepository kr) {
        this("impl" + UUID.randomUUID(), kProject, kr);
    }

    public KieContainerImpl(KieProject kProject, KieRepository kr, ReleaseId containerReleaseId) {
        this("impl" + UUID.randomUUID(), kProject, kr, containerReleaseId);
    }

    public KieContainerImpl(String containerId, KieProject kProject, KieRepository kr) {
        this.kBases = new ConcurrentHashMap();
        this.kSessions = new ConcurrentHashMap();
        this.statelessKSessions = new ConcurrentHashMap();
        this.sessionConfsCache = new ConcurrentHashMap();
        this.kr = kr;
        this.kProject = kProject;
        this.containerId = containerId;
        kProject.init();
        this.initMBeans(containerId);
    }

    public KieContainerImpl(String containerId, KieProject kProject, KieRepository kr, ReleaseId containerReleaseId) {
        this(containerId, kProject, kr);
        this.configuredReleaseId = containerReleaseId;
        this.containerReleaseId = containerReleaseId;
    }

    private void initMBeans(String containerId) {
        if (this.isMBeanOptionEnabled()) {
            KieContainerMonitor monitor = new KieContainerMonitor(this);
            ObjectName on = DroolsManagementAgent.createObjectNameBy(containerId);
            DroolsManagementAgent.getInstance().registerMBean(this, monitor, on);
        }

    }

    public String getContainerId() {
        return this.containerId;
    }

    public ReleaseId getConfiguredReleaseId() {
        return this.configuredReleaseId;
    }

    public ReleaseId getResolvedReleaseId() {
        return this.getReleaseId();
    }

    public ReleaseId getReleaseId() {
        return this.kProject.getGAV();
    }

    public InputStream getPomAsStream() {
        return this.kProject.getPomAsStream();
    }

    public long getCreationTimestamp() {
        return this.kProject.getCreationTimestamp();
    }

    public ReleaseId getContainerReleaseId() {
        return this.containerReleaseId != null ? this.containerReleaseId : this.getReleaseId();
    }

    public Results updateToVersion(ReleaseId newReleaseId) {
        this.checkNotClasspathKieProject();
        Results results = this.update(((KieModuleKieProject)this.kProject).getInternalKieModule(), newReleaseId);
        if (results != null) {
            this.containerReleaseId = newReleaseId;
        } else {
            results = new ResultsImpl();
            ((ResultsImpl)results).addMessage(Level.ERROR, (String)null, "Cannot find KieModule with ReleaseId: " + newReleaseId);
        }

        return (Results)results;
    }

    public Results updateToKieModule(InternalKieModule newKM) {
        this.checkNotClasspathKieProject();
        Results results = this.update(((KieModuleKieProject)this.kProject).getInternalKieModule(), newKM);
        this.containerReleaseId = newKM.getReleaseId();
        return results;
    }

    public Results updateDependencyToVersion(ReleaseId currentReleaseId, ReleaseId newReleaseId) {
        ReleaseId installedReleaseId = this.getReleaseId();
        if (currentReleaseId.getGroupId().equals(installedReleaseId.getGroupId()) && currentReleaseId.getArtifactId().equals(installedReleaseId.getArtifactId())) {
            return this.updateToVersion(newReleaseId);
        } else {
            this.checkNotClasspathKieProject();
            InternalKieModule currentKM = currentReleaseId.equals(newReleaseId) ? (InternalKieModule)((KieRepositoryImpl)this.kr).getOldKieModule(currentReleaseId) : (InternalKieModule)this.kr.getKieModule(currentReleaseId);
            return this.update(currentKM, newReleaseId);
        }
    }

    private void checkNotClasspathKieProject() {
        if (this.kProject instanceof ClasspathKieProject) {
            throw new UnsupportedOperationException("It is not possible to update a classpath container to a new version.");
        }
    }

    private Results update(InternalKieModule currentKM, ReleaseId newReleaseId) {
        InternalKieModule newKM = (InternalKieModule)this.kr.getKieModule(newReleaseId);
        return newKM == null ? null : this.update(currentKM, newKM);
    }

    private Results update(InternalKieModule currentKM, InternalKieModule newKM) {
        KieJarChangeSet cs = currentKM.getChanges(newKM);
        List<String> modifiedClassNames = this.getModifiedClasses(cs);
        boolean modifyingUsedClass = this.isModifyingUsedClass(modifiedClassNames, this.getClassLoader()) || this.isModifyingUsedFunction(cs);
        Collection<Class<?>> modifiedClasses = this.reinitModifiedClasses(newKM, modifiedClassNames, this.getClassLoader(), modifyingUsedClass);
        Collection<String> unchangedResources = this.getUnchangedResources(newKM, cs);
        Map<String, KieBaseModel> currentKieBaseModels = ((KieModuleKieProject)this.kProject).updateToModule(newKM);
        ResultsImpl results = new ResultsImpl();
        currentKM.updateKieModule(newKM);
        List<String> kbasesToRemove = new ArrayList();
        Iterator var11 = this.kBases.entrySet().iterator();

        while(var11.hasNext()) {
            Map.Entry<String, KieBase> kBaseEntry = (Map.Entry)var11.next();
            String kbaseName = (String)kBaseEntry.getKey();
            KieBaseModelImpl newKieBaseModel = (KieBaseModelImpl)this.kProject.getKieBaseModel(kbaseName);
            KieBaseModelImpl currentKieBaseModel = (KieBaseModelImpl)currentKieBaseModels.get(kbaseName);
            if (newKieBaseModel == null) {
                kbasesToRemove.add(kbaseName);
            } else {
                InternalKnowledgeBase kBase = (InternalKnowledgeBase)kBaseEntry.getValue();
                KnowledgeBuilderConfigurationImpl builderConfiguration = (KnowledgeBuilderConfigurationImpl)newKM.createBuilderConfiguration(newKieBaseModel, kBase.getRootClassLoader());
                InternalKnowledgeBuilder kbuilder = (InternalKnowledgeBuilder)KnowledgeBuilderFactory.newKnowledgeBuilder(kBase, builderConfiguration);
                KieBaseUpdaterImplContext context = new KieBaseUpdaterImplContext(this.kProject, kBase, currentKM, newKM, cs, modifiedClasses, modifyingUsedClass, unchangedResources, results, newKieBaseModel, currentKieBaseModel, kbuilder);
                CompositeRunnable compositeUpdater = new CompositeRunnable();
                KieBaseUpdater kieBaseUpdater = currentKM.createKieBaseUpdater(context);
                compositeUpdater.add(kieBaseUpdater);
                KieBaseUpdaterOptions kieBaseUpdaterOptions = new KieBaseUpdaterOptions(new KieBaseUpdaterOptions.OptionEntry[]{new KieBaseUpdaterOptions.OptionEntry(AlphaNetworkCompilerOption.class, builderConfiguration.getAlphaNetworkCompilerOption())});
                KieBaseUpdaters updaters = (KieBaseUpdaters)ServiceRegistry.getInstance().get(KieBaseUpdaters.class);
                Stream var10000 = updaters.getChildren().stream().map((kbu) -> {
                    return kbu.create(new KieBaseUpdatersContext(kieBaseUpdaterOptions, context.kBase.getRete(), context.kBase.getRootClassLoader()));
                });
                Objects.requireNonNull(compositeUpdater);
                var10000.forEach(compositeUpdater::add);
                kBase.enqueueModification(compositeUpdater);
            }
        }

        var11 = kbasesToRemove.iterator();

        while(var11.hasNext()) {
            String kbaseToRemove = (String)var11.next();
            this.kBases.remove(kbaseToRemove);
        }

        this.kSessions.entrySet().removeIf((ksession) -> {
            return this.kProject.getKieSessionModel((String)ksession.getKey()) == null;
        });
        this.statelessKSessions.entrySet().removeIf((ksession) -> {
            return this.kProject.getKieSessionModel((String)ksession.getKey()) == null;
        });
        return results;
    }

    private boolean isModifyingUsedFunction(KieJarChangeSet cs) {
        return cs.getChanges().values().stream().flatMap((resourceChangeSet) -> {
            return resourceChangeSet.getChanges().stream();
        }).anyMatch((change) -> {
            return change.getType() == Type.FUNCTION && change.getChangeType() == ChangeType.UPDATED;
        });
    }

    private Collection<String> getUnchangedResources(InternalKieModule newKM, KieJarChangeSet cs) {
        List<String> dslFiles = new ArrayList();
        Iterator var4 = newKM.getFileNames().iterator();

        while(var4.hasNext()) {
            String file = (String)var4.next();
            if (this.includeIfUnchanged(file) && !cs.contains(file)) {
                dslFiles.add(file);
            }
        }

        return dslFiles;
    }

    private boolean includeIfUnchanged(String file) {
        ResourceType[] var2 = TYPES_TO_BE_INCLUDED;
        int var3 = var2.length;

        for(int var4 = 0; var4 < var3; ++var4) {
            ResourceType type = var2[var4];
            if (type.matchesExtension(file)) {
                return true;
            }
        }

        return false;
    }

    private boolean isModifyingUsedClass(List<String> modifiedClasses, ClassLoader classLoader) {
        return modifiedClasses.stream().anyMatch((c) -> {
            return this.isClassInUse(classLoader, ClassUtils.convertResourceToClassName(c));
        });
    }

    private boolean isClassInUse(ClassLoader rootClassLoader, String className) {
        return !(rootClassLoader instanceof ProjectClassLoader) || ((ProjectClassLoader)rootClassLoader).isClassInUse(className, MaterializedLambda.class);
    }

    private Collection<Class<?>> reinitModifiedClasses(InternalKieModule newKM, List<String> modifiedClasses, ClassLoader classLoader, boolean modifyingUsedClass) {
        if (!modifiedClasses.isEmpty() && classLoader instanceof ProjectClassLoader) {
            Set<String> reloadedClasses = new HashSet(modifiedClasses);
            ProjectClassLoader projectClassLoader = (ProjectClassLoader)classLoader;
            projectClassLoader.clearStore();
            if (modifyingUsedClass) {
                reloadedClasses.addAll((Collection)projectClassLoader.reinitTypes().stream().map(ClassUtils::convertClassToResourcePath).collect(Collectors.toList()));
            }

            List<Class<?>> classes = new ArrayList();
            Iterator var8 = reloadedClasses.iterator();

            while(var8.hasNext()) {
                String resourceName = (String)var8.next();
                String className = ClassUtils.convertResourceToClassName(resourceName);
                byte[] bytes = newKM.getBytes(resourceName);
                if (bytes != null) {
                    Class<?> clazz = projectClassLoader.defineClass(className, resourceName, bytes);
                    classes.add(clazz);
                }
            }

            return classes;
        } else {
            return Collections.emptyList();
        }
    }

    private List<String> getModifiedClasses(KieJarChangeSet cs) {
        List<String> modifiedClasses = new ArrayList();
        Iterator var3 = cs.getChanges().values().iterator();

        while(var3.hasNext()) {
            ResourceChangeSet rcs = (ResourceChangeSet)var3.next();
            if (rcs.getChangeType() != ChangeType.REMOVED) {
                String resourceName = rcs.getResourceName();
                if (resourceName.endsWith(".class")) {
                    modifiedClasses.add(resourceName);
                }
            }
        }

        return modifiedClasses;
    }

    public Collection<String> getKieBaseNames() {
        return this.kProject.getKieBaseNames();
    }

    public Collection<String> getKieSessionNamesInKieBase(String kBaseName) {
        KieBaseModel kieBaseModel = this.kProject.getKieBaseModel(kBaseName);
        return kieBaseModel != null ? kieBaseModel.getKieSessionModels().keySet() : Collections.emptySet();
    }

    public KieBase getKieBase() {
        KieBaseModel defaultKieBaseModel = this.kProject.getDefaultKieBaseModel();
        if (defaultKieBaseModel == null) {
            throw new RuntimeException("Cannot find a default KieBase");
        } else {
            return this.getKieBase(defaultKieBaseModel.getName());
        }
    }

    public Results verify() {
        return this.kProject.verify();
    }

    public Results verify(String... kModelNames) {
        return this.kProject.verify(kModelNames);
    }

    public KieBase getKieBase(String kBaseName) {
        KieBase kBase = (KieBase)this.kBases.get(kBaseName);
        if (kBase == null) {
            KieBaseModelImpl kBaseModel = this.getKieBaseModelImpl(kBaseName);
            synchronized(kBaseModel) {
                kBase = (KieBase)this.kBases.get(kBaseName);
                if (kBase == null) {
                    BuildContext buildContext = new BuildContext();
                    kBase = this.createKieBase(kBaseModel, this.kProject, buildContext, (KieBaseConfiguration)null);
                    if (kBase == null) {
                        throw new RuntimeException("Error while creating KieBase" + buildContext.getMessages().filterMessages(new Message.Level[]{Level.ERROR}));
                    }

                    this.kBases.put(kBaseName, kBase);
                }
            }
        }

        return kBase;
    }

    public KieBase newKieBase(KieBaseConfiguration conf) {
        KieBaseModel defaultKieBaseModel = this.kProject.getDefaultKieBaseModel();
        if (defaultKieBaseModel == null) {
            throw new RuntimeException("Cannot find a default KieBase");
        } else {
            return this.newKieBase(defaultKieBaseModel.getName(), conf);
        }
    }

    public KieBase newKieBase(String kBaseName, KieBaseConfiguration conf) {
        BuildContext buildContext = new BuildContext();
        KieBase kBase = this.createKieBase(this.getKieBaseModelImpl(kBaseName), this.kProject, buildContext, conf);
        if (kBase == null) {
            throw new RuntimeException("Error while creating KieBase" + buildContext.getMessages().filterMessages(new Message.Level[]{Level.ERROR}));
        } else {
            return kBase;
        }
    }

    private KieBase createKieBase(KieBaseModelImpl kBaseModel, KieProject kieProject, BuildContext buildContext, KieBaseConfiguration conf) {
        if (log.isInfoEnabled()) {
            log.info("Start creation of KieBase: " + kBaseModel.getName());
        }

        InternalKieModule kModule = kieProject.getKieModuleForKBase(kBaseModel.getName());
        InternalKnowledgeBase kBase = kModule.createKieBase(kBaseModel, kieProject, buildContext, conf);
        kModule.afterKieBaseCreationUpdate(kBaseModel.getName(), kBase);
        if (kBase == null) {
            return null;
        } else {
            kBase.setResolvedReleaseId(this.containerReleaseId);
            kBase.setContainerId(this.containerId);
            kBase.setKieContainer(this);
            kBase.initMBeans();
            if (log.isInfoEnabled()) {
                log.info("End creation of KieBase: " + kBaseModel.getName());
            }

            return kBase;
        }
    }

    private KieBaseModelImpl getKieBaseModelImpl(String kBaseName) {
        KieBaseModelImpl kBaseModel = (KieBaseModelImpl)this.kProject.getKieBaseModel(kBaseName);
        if (kBaseModel == null) {
            throw new RuntimeException("The requested KieBase \"" + kBaseName + "\" does not exist");
        } else {
            return kBaseModel;
        }
    }

    public KieSession newKieSession() {
        return this.newKieSession((Environment)((Environment)null), (KieSessionConfiguration)null);
    }

    public KieSession getKieSession() {
        KieSessionModel defaultKieSessionModel = this.findKieSessionModel(false);
        return this.getKieSession(defaultKieSessionModel.getName());
    }

    public KieSession newKieSession(KieSessionConfiguration conf) {
        return this.newKieSession((Environment)null, conf);
    }

    public KieSession newKieSession(Environment environment) {
        return this.newKieSession((Environment)environment, (KieSessionConfiguration)null);
    }

    public KieSession newKieSession(Environment environment, KieSessionConfiguration conf) {
        return this.newKieSession((String)null, environment, conf);
    }

    public KieContainerSessionsPool newKieSessionsPool(int initialSize) {
        return new KieContainerSessionsPoolImpl(this, initialSize);
    }

    StatefulSessionPool createKieSessionsPool(String kSessionName, KieSessionConfiguration conf, Environment env, int initialSize, boolean stateless) {
        KieSessionModel kSessionModel = kSessionName != null ? this.getKieSessionModel(kSessionName) : this.findKieSessionModel(false);
        if (kSessionModel == null) {
            log.error("Unknown KieSession name: " + kSessionName);
            return null;
        } else {
            KnowledgeBaseImpl kBase = (KnowledgeBaseImpl)this.getKieBaseFromKieSessionModel(kSessionModel);
            return kBase == null ? null : new StatefulSessionPool(kBase, initialSize, () -> {
                SessionConfiguration sessConf = conf != null ? (SessionConfiguration)conf : kBase.getSessionConfiguration();
                StatefulKnowledgeSessionImpl kSession = stateless ? kBase.internalCreateStatefulKnowledgeSession(env, sessConf, false).setStateless(true) : (StatefulKnowledgeSessionImpl)kBase.newKieSession(sessConf, env);
                this.registerNewKieSession(kSessionModel, kBase, kSession);
                return kSession;
            });
        }
    }

    private KieSessionModel findKieSessionModel(boolean stateless) {
        KieSessionModel defaultKieSessionModel = stateless ? this.kProject.getDefaultStatelessKieSession() : this.kProject.getDefaultKieSession();
        if (defaultKieSessionModel == null) {
            throw new RuntimeException(stateless ? "Cannot find a default StatelessKieSession" : "Cannot find a default KieSession");
        } else {
            return defaultKieSessionModel;
        }
    }

    public StatelessKieSession newStatelessKieSession() {
        return this.newStatelessKieSession((KieSessionConfiguration)null);
    }

    public StatelessKieSession newStatelessKieSession(KieSessionConfiguration conf) {
        KieSessionModel defaultKieSessionModel = this.findKieSessionModel(true);
        return this.newStatelessKieSession(defaultKieSessionModel.getName(), conf);
    }

    public StatelessKieSession getStatelessKieSession() {
        KieSessionModel defaultKieSessionModel = this.findKieSessionModel(true);
        return this.getStatelessKieSession(defaultKieSessionModel.getName());
    }

    public KieSession newKieSession(String kSessionName) {
        return this.newKieSession(kSessionName, (Environment)null, (KieSessionConfiguration)null);
    }

    public KieSession getKieSession(String kSessionName) {
        KieSession kieSession = (KieSession)this.kSessions.get(kSessionName);
        if (kieSession instanceof StatefulKnowledgeSessionImpl && !((StatefulKnowledgeSessionImpl)kieSession).isAlive()) {
            this.kSessions.remove(kSessionName);
            kieSession = null;
        }

        return kieSession != null ? kieSession : this.newKieSession(kSessionName);
    }

    public KieSession newKieSession(String kSessionName, Environment environment) {
        return this.newKieSession(kSessionName, environment, (KieSessionConfiguration)null);
    }

    public KieSession newKieSession(String kSessionName, KieSessionConfiguration conf) {
        return this.newKieSession(kSessionName, (Environment)null, conf);
    }

    public KieSession newKieSession(String kSessionName, Environment environment, KieSessionConfiguration conf) {
        KieSessionModelImpl kSessionModel = kSessionName != null ? (KieSessionModelImpl)this.getKieSessionModel(kSessionName) : (KieSessionModelImpl)this.findKieSessionModel(false);
        if (kSessionModel == null) {
            log.error("Unknown KieSession name: " + kSessionName);
            return null;
        } else {
            KieBase kBase = this.getKieBaseFromKieSessionModel(kSessionModel);
            if (kBase == null) {
                return null;
            } else {
                KieSession kSession = kBase.newKieSession(conf != null ? conf : this.getKieSessionConfiguration((KieSessionModel)kSessionModel), environment);
                this.registerNewKieSession(kSessionModel, (InternalKnowledgeBase)kBase, kSession);
                return kSession;
            }
        }
    }

    private void registerNewKieSession(KieSessionModel kSessionModel, InternalKnowledgeBase kBase, KieSession kSession) {
        if (Drools.isJndiAvailable()) {
            InjectionHelper.wireSessionComponents(kSessionModel, kSession);
        }

        this.registerLoggers(kSessionModel, kSession);
        this.registerCalendars(kSessionModel, kSession);
        ((StatefulKnowledgeSessionImpl)kSession).initMBeans(this.containerId, kBase.getId(), kSessionModel.getName());
        this.kSessions.put(kSessionModel.getName(), kSession);
    }

    private KieBase getKieBaseFromKieSessionModel(KieSessionModel kSessionModel) {
        if (kSessionModel.getType() == KieSessionType.STATELESS) {
            throw new RuntimeException("Trying to create a stateful KieSession from a stateless KieSessionModel: " + kSessionModel.getName());
        } else {
            KieBase kBase = this.getKieBase(kSessionModel.getKieBaseModel().getName());
            if (kBase == null) {
                log.error("Unknown KieBase name: " + kSessionModel.getKieBaseModel().getName());
                return null;
            } else {
                return kBase;
            }
        }
    }

    private void registerLoggers(KieSessionModel kSessionModel, KieRuntimeEventManager kSession) {
        KieLoggers kieLoggers = Factory.get().getLoggers();
        if (kSessionModel.getConsoleLogger() != null) {
            kieLoggers.newConsoleLogger(kSession);
        }

        FileLoggerModel fileLogger = kSessionModel.getFileLogger();
        if (fileLogger != null) {
            if (fileLogger.isThreaded()) {
                kieLoggers.newThreadedFileLogger(kSession, fileLogger.getFile(), fileLogger.getInterval());
            } else {
                kieLoggers.newFileLogger(kSession, fileLogger.getFile());
            }
        }

    }

    private void registerCalendars(KieSessionModel kSessionModel, KieSession kSession) {
        Iterator var3 = kSessionModel.getCalendars().entrySet().iterator();

        while(var3.hasNext()) {
            Map.Entry<String, String> entry = (Map.Entry)var3.next();

            try {
                Calendar calendar = (Calendar)this.getClassLoader().loadClass((String)entry.getValue()).newInstance();
                kSession.getCalendars().set((String)entry.getKey(), calendar);
            } catch (IllegalAccessException | ClassNotFoundException | InstantiationException var6) {
                log.error("Cannot instance calendar " + (String)entry.getKey(), var6);
            }
        }

    }

    public StatelessKieSession newStatelessKieSession(String kSessionName) {
        return this.newStatelessKieSession(kSessionName, (KieSessionConfiguration)null);
    }

    public StatelessKieSession newStatelessKieSession(String kSessionName, KieSessionConfiguration conf) {
        KieSessionModelImpl kSessionModel = kSessionName != null ? (KieSessionModelImpl)this.getKieSessionModel(kSessionName) : (KieSessionModelImpl)this.findKieSessionModel(true);
        if (kSessionModel == null) {
            log.error("Unknown KieSession name: " + kSessionName);
            return null;
        } else if (kSessionModel.getType() == KieSessionType.STATEFUL) {
            throw new RuntimeException("Trying to create a stateless KieSession from a stateful KieSessionModel: " + kSessionModel.getName());
        } else {
            KieBase kBase = this.getKieBase(kSessionModel.getKieBaseModel().getName());
            if (kBase == null) {
                log.error("Unknown KieBase name: " + kSessionModel.getKieBaseModel().getName());
                return null;
            } else {
                StatelessKieSession statelessKieSession = kBase.newStatelessKieSession(conf != null ? conf : this.getKieSessionConfiguration((KieSessionModel)kSessionModel));
                if (Drools.isJndiAvailable()) {
                    InjectionHelper.wireSessionComponents(kSessionModel, statelessKieSession);
                }

                this.registerLoggers(kSessionModel, statelessKieSession);
                ((StatelessKnowledgeSessionImpl)statelessKieSession).initMBeans(this.containerId, ((InternalKnowledgeBase)kBase).getId(), kSessionModel.getName());
                this.statelessKSessions.put(kSessionModel.getName(), statelessKieSession);
                return statelessKieSession;
            }
        }
    }

    public StatelessKieSession getStatelessKieSession(String kSessionName) {
        StatelessKieSession kieSession = (StatelessKieSession)this.statelessKSessions.get(kSessionName);
        return kieSession != null ? kieSession : this.newStatelessKieSession(kSessionName);
    }

    public KieSessionConfiguration getKieSessionConfiguration() {
        return this.getKieSessionConfiguration(this.kProject.getDefaultKieSession());
    }

    public KieSessionConfiguration getKieSessionConfiguration(String kSessionName) {
        KieSessionModelImpl kSessionModel = (KieSessionModelImpl)this.kProject.getKieSessionModel(kSessionName);
        if (kSessionModel == null) {
            log.error("Unknown KieSession name: " + kSessionName);
            return null;
        } else {
            return this.getKieSessionConfiguration((KieSessionModel)kSessionModel);
        }
    }

    private KieSessionConfiguration getKieSessionConfiguration(KieSessionModel kSessionModel) {
        KieSessionConfiguration ksConf = (KieSessionConfiguration)this.sessionConfsCache.computeIfAbsent(kSessionModel.getName(), (k) -> {
            return new SessionConfigurationImpl((Properties)null, this.kProject.getClassLoader());
        });
        ksConf.setOption(kSessionModel.getClockType());
        ksConf.setOption(kSessionModel.getBeliefSystem());
        return ksConf;
    }

    public void dispose() {
        this.sessionConfsCache.clear();
        this.kBases.values().forEach((kbx) -> {
            ((InternalKnowledgeBase)kbx).setKieContainer((InternalKieContainer)null);
        });
        Set<DroolsManagementAgent.CBSKey> cbskeys = new HashSet();
        Iterator var2;
        if (this.isMBeanOptionEnabled()) {
            var2 = this.kSessions.entrySet().iterator();

            Map.Entry kv;
            while(var2.hasNext()) {
                kv = (Map.Entry)var2.next();
                cbskeys.add(new DroolsManagementAgent.CBSKey(this.containerId, ((InternalKnowledgeBase)((KieSession)kv.getValue()).getKieBase()).getId(), (String)kv.getKey()));
            }

            var2 = this.statelessKSessions.entrySet().iterator();

            while(var2.hasNext()) {
                kv = (Map.Entry)var2.next();
                cbskeys.add(new DroolsManagementAgent.CBSKey(this.containerId, ((InternalKnowledgeBase)((StatelessKieSession)kv.getValue()).getKieBase()).getId(), (String)kv.getKey()));
            }
        }

        var2 = this.kSessions.values().iterator();

        while(var2.hasNext()) {
            KieSession kieSession = (KieSession)var2.next();
            kieSession.dispose();
        }

        this.kSessions.clear();
        this.statelessKSessions.clear();
        if (this.isMBeanOptionEnabled()) {
            var2 = cbskeys.iterator();

            while(var2.hasNext()) {
                DroolsManagementAgent.CBSKey c = (DroolsManagementAgent.CBSKey)var2.next();
                DroolsManagementAgent.getInstance().unregisterKnowledgeSessionBean(c);
            }

            var2 = this.kBases.values().iterator();

            while(var2.hasNext()) {
                KieBase kb = (KieBase)var2.next();
                DroolsManagementAgent.getInstance().unregisterKnowledgeBase((InternalKnowledgeBase)kb);
            }

            DroolsManagementAgent.getInstance().unregisterMBeansFromOwner(this);
        }

        ((InternalKieServices)Factory.get()).clearRefToContainerId(this.containerId, this);
    }

    public void disposeSession(KieSession kieSession) {
        if (!this.isMBeanOptionEnabled()) {
            this.kSessions.values().remove(kieSession);
        }

    }

    private boolean isMBeanOptionEnabled() {
        return MBeansOption.isEnabled(System.getProperty("kie.mbeans", MBeansOption.DISABLED.toString()));
    }

    public KieProject getKieProject() {
        return this.kProject;
    }

    public KieModule getKieModuleForKBase(String kBaseName) {
        return this.kProject.getKieModuleForKBase(kBaseName);
    }

    public KieBaseModel getKieBaseModel(String kBaseName) {
        return this.kProject.getKieBaseModel(kBaseName);
    }

    public KieSessionModel getKieSessionModel(String kSessionName) {
        return this.kProject.getKieSessionModel(kSessionName);
    }

    public ClassLoader getClassLoader() {
        return this.kProject.getClassLoader();
    }

    static {
        TYPES_TO_BE_INCLUDED = new ResourceType[]{ResourceType.DSL, ResourceType.GDRL};
    }

    public static class CompositeRunnable implements Runnable {
        private final List<Runnable> runnables = new ArrayList();

        public CompositeRunnable() {
        }

        public void add(Runnable runnable) {
            this.runnables.add(runnable);
        }

        void addAll(List<Runnable> runnableList) {
            this.runnables.addAll(runnableList);
        }

        public void run() {
            this.runnables.forEach(Runnable::run);
        }
    }
}
