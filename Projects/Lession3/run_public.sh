
kubectl expose deployment udagram-frontend --type=LoadBalancer --name=publicfrontend
kubectl expose deployment udagram-reverseproxy --type=LoadBalancer --name=publicreverseproxy