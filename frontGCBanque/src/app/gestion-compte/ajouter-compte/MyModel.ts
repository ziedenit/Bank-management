apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-mesperone-ingress
  namespace: namespace-x  # Remplace par ton namespace cible
spec:
  podSelector: {}  # Applique la règle à tous les pods dans namespace-x
  policyTypes:
  - Ingress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: mesperone  # Autoriser le trafic uniquement depuis mesperone
