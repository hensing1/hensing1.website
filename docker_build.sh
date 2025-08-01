#! /bin/bash

# (re-)builds the docker image, deletes old container and runs a new instance

imageName=website
containerName=webs-container

docker build -t $imageName .

echo "Deleting old container..."
docker rm -f $containerName

echo "Running new container..."
docker run -d -p 8080:80 --name $containerName $imageName
