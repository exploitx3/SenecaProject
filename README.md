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