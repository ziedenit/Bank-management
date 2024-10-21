apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-msofd-to-msperson
  namespace: ofd-05092-metier-uat  
spec:
  podSelector: {}  
  policyTypes:
    - Egress 
  egress:
  - to:
    - namespaceSelector:
        matchLabels:
          name: reper-04833-metier-uat
  policyTypes:
    - Egress
  egress:
    - to:
        - ipBlock:
            cidr: 10.0.0.0/8
      ports:
        - protocol: TCP
          port: 27017
        - protocol: TCP
          port: 3128
        - protocol: TCP
          port: 8080
