# Si tu as d'autres NetworkPolicies, elles devraient être ici.

# Ajoute cette nouvelle NetworkPolicy pour autoriser les flux du namespace msperson
---
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-msperson-to-msofd
  namespace: msofd  # Le namespace où la règle sera appliquée
spec:
  podSelector: {}  # Applique la règle à tous les pods de msofd (ou configure des labels pour limiter à certains pods)
  policyTypes:
  - Ingress  # Trafic entrant
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: msperson  # Autorise uniquement le trafic provenant du namespace msperson
    ports:
    - protocol: TCP
      port: 80  # HTTP (ou ajuste selon tes besoins)
    - protocol: TCP
      port: 443  # HTTPS
