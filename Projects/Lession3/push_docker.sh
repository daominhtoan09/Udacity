version='v2.18'
docker build -t udagram-api-feed ./udagram-api-feed
docker build  -t udagram-api-user ./udagram-api-user
docker build  -t udagram-frontend ./udagram-frontend
docker build  -t udagram-reverseproxy ./udagram-reverseproxy
## Tagging
docker tag udagram-api-feed daominhtoan09/udagram-api-feed:"$version"
docker tag udagram-api-user daominhtoan09/udagram-api-user:"$version"
docker tag udagram-frontend daominhtoan09/udagram-frontend:"$version"
docker tag udagram-reverseproxy daominhtoan09/udagram-reverseproxy:"$version"
## Do similar for other three images```
## Push
## Assuming DOCKER_PASSWORD and DOCKER_USERNAME are set in the Travis repository settings
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker push daominhtoan09/udagram-api-feed:"$version"
docker push daominhtoan09/udagram-api-user:"$version"
docker push daominhtoan09/udagram-frontend:"$version"
docker push daominhtoan09/udagram-reverseproxy:"$version"


docker tag udagram-frontend daominhtoan09/udagram-frontend:v2.22
docker push daominhtoan09/udagram-frontend:v2.22