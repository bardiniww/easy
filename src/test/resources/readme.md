To run integration tests, you need:

- run postgres container
  " docker run --name db -p 5432:5432 --network=db -v "$PWD:/var/lib/postgresql/data" -e POSTGRES_PASSWORD=password -d
  postgres:alpine"
- to get into psql, run "docker run -it --rm --network=db postgres:alpine psql -h db -U postgres"
- before run app, you need to create a database in psql with the same name as in application-it.properties specs