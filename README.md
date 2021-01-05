# self-monitor

The app is available at https://self-monitor3000.herokuapp.com/

## Getting started

**Create a database in whatever way is more suitable for you** e.g. Docker, ElephantSQL, PostgeSQL running locally on your machine, etc. all will work just fine. Below I'll show steps for setting up a DB with Docker, **but please feel free to use a method of your choice.**

### Setting up PostgreSQL with Docker

If you don't have Docker installed, go ahead and install it first by following https://www.docker.com/get-started

Once you have docker locally, run

```
docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
```

```
docker exec -it some-postgres psql -U postgres
```

### Creating tables

Run the following SQL commands to create the required tables and indices.

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(320) NOT NULL UNIQUE,
  password CHAR(60) NOT NULL
);

CREATE UNIQUE INDEX ON users((lower(email)));

CREATE TABLE reports (
  id SERIAL PRIMARY KEY,
  report_day date NOT NULL,
  sleep_duration NUMERIC(5, 3) CHECK (sleep_duration >= 0 AND sleep_duration <= 24),
  sleep_quality smallint CHECK (sleep_quality >= 0 AND sleep_quality <= 5),
  sport_duration NUMERIC(5, 3) CHECK (sport_duration >= 0 AND sport_duration <= 24),
  study_duration NUMERIC(5, 3) CHECK (study_duration >= 0 AND study_duration <= 24),
  eating_regularity smallint CHECK (eating_regularity >= 0 AND eating_regularity <= 5),
  eating_quality smallint CHECK (eating_quality >= 0 AND eating_quality <= 5),
  morning_mood smallint CHECK (morning_mood >= 0 AND morning_mood <= 5),
  evening_mood smallint CHECK (evening_mood >= 0 AND evening_mood <= 5),
  user_id INTEGER NOT NULL REFERENCES users(id)
);

CREATE UNIQUE INDEX ON reports(report_day, user_id);
```

### Running the application locally

Once this is done, start the app locally by running the following command from the root directory of the project (**do replace environment variables PGPORT, PGDATABASE, PGUSER, PGHOST, PGPASSWORD with actual values for your database**):

```
PGPORT=5432 PGDATABASE=postgres PGUSER=postgres PGHOST=localhost PGPASSWORD=mysecretpassword deno run --allow-all --unstable ./app.js
```

## Setting up test environment

To keep test data separate from the one that's accessible by an actual application, by following the commands below, you'll create a separate database, connect to it and recreate all the needed tables in there.

If for some reason you cannot create/connect to a new database using the command below (e.g. maybe you're missing permissions or something else), feel free to create a new database in whatever way you want (creating it in ElephantSQL or something). The main point is that you have a PostgreSQL database that is different from the one used by your app. Naturally, you'll need to make  sure you know the name, hostname and credentials for the new test database. You'll need them when executing a command for actually running the tests below.

```sql
CREATE DATABASE test;

\c test;
```

Next create the same tables and indices that you created for the app itself

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(320) NOT NULL UNIQUE,
  password CHAR(60) NOT NULL
);

CREATE UNIQUE INDEX ON users((lower(email)));

CREATE TABLE reports (
  id SERIAL PRIMARY KEY,
  report_day date NOT NULL,
  sleep_duration NUMERIC(5, 3) CHECK (sleep_duration >= 0 AND sleep_duration <= 24),
  sleep_quality smallint CHECK (sleep_quality >= 0 AND sleep_quality <= 5),
  sport_duration NUMERIC(5, 3) CHECK (sport_duration >= 0 AND sport_duration <= 24),
  study_duration NUMERIC(5, 3) CHECK (study_duration >= 0 AND study_duration <= 24),
  eating_regularity smallint CHECK (eating_regularity >= 0 AND eating_regularity <= 5),
  eating_quality smallint CHECK (eating_quality >= 0 AND eating_quality <= 5),
  morning_mood smallint CHECK (morning_mood >= 0 AND morning_mood <= 5),
  evening_mood smallint CHECK (evening_mood >= 0 AND evening_mood <= 5),
  user_id INTEGER NOT NULL REFERENCES users(id)
);

CREATE UNIQUE INDEX ON reports(report_day, user_id);
CREATE INDEX ON reports(report_day);
```

Besides, we create one test user as the last command in the listing.

```sql
INSERT INTO users (email, password) VALUES ('test@test.test', '$2a$10$JBoghQCCRf9exbhCQspanehOPbwDwTx7MCI8.lKln2NClIJ7j.60m');
```

## Running tests

Run the tests locally by running the following command from the root directory of the project (**do replace environment variables PGPORT, PGDATABASE, PGUSER, PGHOST, PGPASSWORD with actual values for your test database**):

**NOTE**: *when running the tests, make sure you do not have the application running locally at the same time. Otherwise Deno will complain that the required port is already in use.*

```
PGPORT=5432 PGDATABASE=test PGUSER=postgres PGHOST=localhost PGPASSWORD=mysecretpassword deno test --coverage --allow-all --unstable
```

There are **22** tests in total, all of which should pass.

**NOTE**: *The test runner does not automatically exit for some reason, even if all the tests are completed and successful. I think this has something to do with Deno not closing DB's pool when needed. Anyway, feel free to exit the test runner manually (via "Ctrl+C") when all the tests are done and you can see the "total results" statistics i.e. how many tests passed, how many failed, etc.*

## Miscellaneous notes

* When displayng weekly and monthly averages for the last month and week on the summary page, I interpret *last* as in "currently ongoing".

* When accessing /api/summary, if no data for the last 7 days is available, 404 status code is returned

* When accessing /api/summary/:year/:month/:day, if no data for the specified date is available, 404 status code is returned

