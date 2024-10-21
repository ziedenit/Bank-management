
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-msofd-to-msperson
  namespace: msofd  # Namespace msofd qui initie la connexion sortante
spec:
  podSelector: {}  # Applique à tous les pods dans msofd (ou utilise des labels pour spécifier certains pods)
  policyTypes:
  - Egress  # On configure le trafic sortant
  egress:
  - to:
    - namespaceSelector:
        matchLabels:
          name: msperson  # Permet uniquement les connexions vers le namespace msperson
    ports:
    - protocol: TCP
      port: 80  # Si l'API getperson est exposée sur HTTP (port à ajuster selon l'API)
    - protocol: TCP
      port: 443  # Si l'API est exposée sur HTTPS
