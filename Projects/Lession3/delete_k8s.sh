!#./bin/bash
#aws sts get-caller-identity

#aws eks update-kubeconfig --region us-east-1 --name eks-toandm9
kubectl delete -f ./udagram-api-feed/k8s/
kubectl delete -f ./udagram-api-user/k8s/
kubectl delete -f ./udagram-frontend/k8s/
kubectl delete -f ./udagram-reverseproxy/k8s/

