!#./bin/bash
#aws sts get-caller-identity

#aws eks update-kubeconfig --region us-east-1 --name eks-toandm9
kubectl delete pods --all
kubectl delete service publicfrontend
kubectl delete service publicreverseproxy
kubectl apply -f ./udagram-api-feed/k8s/
kubectl apply -f ./udagram-api-user/k8s/
kubectl apply -f ./udagram-frontend/k8s/
kubectl apply -f ./udagram-reverseproxy/k8s/

