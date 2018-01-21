# SenecaProject

Start:
* Run mongo:
  * Change directory to SenecaProject/mongodb
  * Execute "mongod --dbpath ./data"

* Run math-service:
  * Change directory to SenecaProject/math-service
  * Execute "node app.js"
  
* Run user-service:
  * Change directory to SenecaProject/user-service
  * Execute "node app.js"

* Run web-service(depends on math and user service):
  * Change directory to SenecaProject/web-service
  * Execute "node app.js"

* Run ping-service(depends on math and user service):
  * Change directory to SenecaProject/ping-service
  * Execute "node app.js"

Building Docker Images: 
* Manually - Inside a service directory execute 
"docker build -t <nameOfService> ."
* Execute ./scripts/build_images.sh

Features:

Calling localhost on port 8080:
* GET: {{ localHttpAPI  }}/api/calculate/sum?left=1&right=2 
* POST: {{ localHttpAPI  }}/api/user/create
    * Body: { "name": "NewUser" }
    
Run services from Docker images:
 * In main directory ./SenecaProject run:
    * docker-compose up

Run with minikube:
 * minikube start --kubernetes-version=v1.8.0  --extra-config=apiserver.ServiceNodePortRange=1-50000
 * minikube addons enable kube-dns
 * "Create the mongodb directory in the vm"
   * minikube ssh
   * sudo mkdir /mnt/data
 * "Create the kubernetes volumes"
   * kubectl create -f ./kubernetes-templates/mongodb-volume.yml --validate
Debug DNS:
 * kubectl run busybox --image=busybox --command -- sleep 3600
 * kubectl exec -ti $POD_NAME -- nslookup math-service.api.default.svc.cluster.local
 * "Or you can try on your own" kubectl run -i --tty --image busybox dns-test --restart=Never --rm /bin/sh 