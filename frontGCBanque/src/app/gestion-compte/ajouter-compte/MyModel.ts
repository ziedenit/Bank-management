apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-namespace-y-to-access-api
  namespace: namespace-x  # Namespace où se trouve l'API (namespace cible)
spec:
  podSelector:
    matchLabels:
      app: my-api  # Les pods de l'API dans namespace-x
  policyTypes:
  - Ingress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: namespace-y  # Namespace source (namespace Y)
    ports:
    - protocol: TCP
      port: 80  # Port où l'API écoute (ex. HTTP)
    - protocol: TCP
      port: 443  # Port pour HTTPS, si nécessaire
