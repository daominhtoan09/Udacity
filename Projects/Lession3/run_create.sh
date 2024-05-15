!#./bin/bash
#aws sts get-caller-identity

#aws eks update-kubeconfig --region us-east-1 --name eks-toandm9
kubectl delete service publicfrontend
kubectl delete service publicreverseproxy
kubectl apply -f ./udagram-api-feed/k8s/env-secret.yaml
kubectl apply -f ./udagram-api-feed/k8s/configMap.yaml
kubectl apply -f ./udagram-api-feed/k8s/deployment.yaml
kubectl apply -f ./udagram-api-feed/k8s/service.yaml
kubectl apply -f ./udagram-api-user/k8s/
kubectl apply -f ./udagram-frontend/k8s/
kubectl apply -f ./udagram-reverseproxy/k8s/

