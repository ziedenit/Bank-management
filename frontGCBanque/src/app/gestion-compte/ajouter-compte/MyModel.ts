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

Running a few seconds ago (Mon Oct 21 2024 17:20:29 GMT+0200)
one or more objects failed to apply, reason: NetworkPolicy.networking.k8s.io "allow-msofd-to-msperson-uat" is invalid: spec.egress[0].to[1]: Required value: must specify a
