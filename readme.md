To run a database locally:

- make dir for data
- cd to created dir
- create network "docker network create db"
- run postgres container
  " docker run --name db -p 5432:5432 --network=db -v "$PWD:/var/lib/postgresql/data" -e POSTGRES_PASSWORD=password -d
  postgres:alpine"
- to get into psql, run "docker run -it --rm --network=db postgres:alpine psql -h db -U postgres"
- before run app, u need to create a database in psql with the same name as in application.properties specs

To connect/debug remote database on cloud:

- add your ip to rds firewall security group
- from container - run console command example (change host, username, database):
  'docker run -it --rm postgres:alpine psql -h
  awseb-e-ukbz2r7tip-stack-awsebrdsdatabase-jzubxwvvd1dh.cxgucwlo6dd5.ap-southeast-1.rds.amazonaws.com -U bardiniww -d
  postgres'
- from intellij - change props on the application-dev.properties, set dev profile in 'edit configuration'

To generate mock data use https://mockaroo.com/

To push new version image to docker hub:

- 'docker login'
- from app root 'mvn clean install -P build-frontend -P jib-push-to-dockerhub -Dapp.image.tag=[WRITE TAG]'