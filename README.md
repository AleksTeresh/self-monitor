# self-monitor

The app is available at https://self-monitor3000.herokuapp.com/

## Getting started

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
CREATE INDEX ON reports(report_day);
```

Once this is done, start the app locally by running the following command from the root directory of the project (**do replace environment variables PGPORT, PGDATABASE, PGUSER, PGHOST, PGPASSWORD with actual values for your database**):

```
PGPORT=5432 PGDATABASE=postgres PGUSER=postgres PGHOST=localhost PGPASSWORD=mysecretpassword deno run --allow-all --unstable ./app.js
```

## Setting up test environment

To keep test data separate from the one that's accessible by an app, by following the commands below, you'll create a separate database, connect to it and recreate all the needed tables in there.

Besides, we create one test user as the last command in the listing.

```sql
CREATE DATABASE test;

\c test;

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

INSERT INTO users (email, password) VALUES ('test@test.test', '$2a$10$JBoghQCCRf9exbhCQspanehOPbwDwTx7MCI8.lKln2NClIJ7j.60m');
```

## Running tests

Run the tests locally by running the following command from the root directory of the project (**do replace environment variables PGPORT, PGDATABASE, PGUSER, PGHOST, PGPASSWORD with actual values for your test database**):


```
PGPORT=5432 PGDATABASE=test PGUSER=postgres PGHOST=localhost PGPASSWORD=mysecretpassword deno test --coverage --allow-all --unstable
```

There are **22** tests in total, all of which should pass.
