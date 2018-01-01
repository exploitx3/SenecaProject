#!/bin/bash

cd ./math-service
docker build -t math-service .
cd ../

cd ./user-service
docker build -t user-service .
cd ../

cd ./web-service
docker build -t web-service .
cd ../

cd ./ping-service
docker build -t ping-service .
cd ../

