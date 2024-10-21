apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: nom-du-namespace
  name: pod-reader
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "list", "watch"]
	  
