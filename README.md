# self-monitor

## Setting up database

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
  user_id INTEGER REFERENCES users(id)
);
```

## Requirements


<ul>
  <li>
    <p>Application structure</p>
    <ul>
      <li style="list-style: none;">✓
        Application divided into logical folders (akin to the part on
        Structuring Web Applications)
      </li>
      <li style="list-style: none;">✓Dependencies exported from deps.js</li>
      <li style="list-style: none;">✓Project launched from app.js, which is in the root folder</li>
      <li style="list-style: none;">✓
        Configurations in a separate folder (e.g. config)
        <ul>
          <li>Test configurations separate from production configurations</li>
          <li style="list-style: none;">✓
            Configurations loaded from environmental variables or e.g. dotenv
            -files
          </li>
        </ul>
      </li>
    </ul>
  </li>
  <li>
    <p>Users</p>
    <ul>
      <li style="list-style: none;">✓
        Email and password stored in the database for each user
        <ul>
          <li style="list-style: none;">✓Password not stored in plaintext format</li>
          <li style="list-style: none;">✓
            Emails must be unique (same email cannot be stored twice in the
            database)
          </li>
        </ul>
      </li>
      <li style="list-style: none;">✓Users can register to the application</li>
      <li style="list-style: none;">✓
        Registration form is accessible at /auth/registration
        <ul>
          <li style="list-style: none;">✓
            Registration uses labels to clarify the purpose of the input fields
          </li>
          <li style="list-style: none;">✓
            Registration form is validated on the server
            <ul>
              <li style="list-style: none;">✓Email must be an authentic email</li>
              <li style="list-style: none;">✓Password must contain at least 4 characters</li>
              <li style="list-style: none;">✓Validation errors shown on page</li>
              <li style="list-style: none;">✓
                In case of validation errors, email field is populated (password
                is not)
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li style="list-style: none;">✓
        User-specific functionality is structured into logical parts (e.g.
        userController.js, userService.js)
      </li>
    </ul>
  </li>
  <li>
    <p>Authentication</p>
    <ul>
      <li style="list-style: none;">✓Application uses session-based authentication</li>
      <li style="list-style: none;">✓
        Login form is accessible at /auth/login
        <ul>
          <li style="list-style: none;">✓Login form asks for email and password</li>
          <li style="list-style: none;">✓Login uses labels to clarify the purpose of the input fields</li>
          <li style="list-style: none;">✓Login form has a link to the registration form</li>
          <li style="list-style: none;">✓
            If the user types in an invalid email or password, a message
            "Invalid email or password" is shown on the login page.
            <ul>
              <li style="list-style: none;">✓Form fields are not populated</li>
            </ul>
          </li>
        </ul>
      </li>
      <li style="list-style: none;">✓
        Authentication functionality is structured into logical parts (e.g.
        authController.js or part of userController.js, ...).
      </li>
      <li>
        Application has a logout button that allows the user to logout (logging
        out effectively means clearing the session)
        <ul>
          <li>Logout functionality is at /auth/logout</li>
        </ul>
      </li>
    </ul>
  </li>
  <li>
    <p>Middleware</p>
    <ul>
      <li style="list-style: none;">✓
        The application has middleware that logs all the errors that occurred
        within the application
      </li>
      <li style="list-style: none;">✓
        The application has middleware that logs all requests made to the
        application
        <ul>
          <li style="list-style: none;">✓
            Logged information contains current time, request method, requested
            path, and user id (or anonymous if not authenticated)
          </li>
        </ul>
      </li>
      <li style="list-style: none;">✓
        The application has middleware that controls access to the application
        <ul>
          <li style="list-style: none;">✓Paths starting with /auth are accessible to all</li>
          <li style="list-style: none;">✓
            Other paths require that the user is authenticated
            <ul>
              <li>
                Non-authenticated users are redirected to the login form at
                /auth/login
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li style="list-style: none;">✓
        Application has middleware that controls access to static files
        <ul>
          <li style="list-style: none;">✓Static files are placed under /static</li>
        </ul>
      </li>
      <li style="list-style: none;">✓
        Middleware functionality is structured into logical parts (e.g. separate
        middlewares folder).
      </li>
    </ul>
  </li>
  <li>
    <p>Reporting</p>
    <ul>
      <li style="list-style: none;">✓
        <p>
          Reporting functionality is available under the path
          /behavior/reporting
        </p>
      </li>
      <li style="list-style: none;">✓<p>Reporting cannot be done if the user is not authenticated</p></li>
      <li style="list-style: none;">✓
        <p>
          When accessing /behavior/reporting, user can choose whether morning or
          evening is being reported
        </p>
        <ul>
          <li style="list-style: none;">✓User reporting form depends on selection</li>
          <li style="list-style: none;">✓
            Page at /behavior/reporting shows whether morning and/or evening
            reporting for today has already been done
          </li>
        </ul>
      </li>
      <li style="list-style: none;">✓
        <p>
          Morning reporting form contains fields for date, sleep duration, sleep
          quality, and generic mood
        </p>
        <ul>
          <li style="list-style: none;">✓
            Date is populated by default to today, but can be changed
            <ul>
              <li style="list-style: none;">✓Form has a date field for selecting the date</li>
            </ul>
          </li>
          <li style="list-style: none;">✓Sleep duration is reported in hours (with decimals)</li>
          <li style="list-style: none;">✓
            Sleep quality and generic mood are reported using a number from 1 to
            5, where 1 corresponds to very poor and 5 corresponds to excellent.
            <ul>
              <li style="list-style: none;">✓
                Form has a slider (e.g. range) or radio buttons for reporting
                the value
              </li>
            </ul>
          </li>
          <li style="list-style: none;">✓
            Form contains labels that clarify the purpose of the input fields
            and the accepted values
          </li>
          <li>
            Form fields are validated
            <ul>
              <li>
                Sleep duration must be entered, must be a number (can be
                decimal), and cannot be negative
              </li>
              <li>
                Sleep quality and generic mood must be reported using numbers
                between 1 and 5 (integers).
              </li>
              <li>In case of validation errors, form fields are populated</li>
            </ul>
          </li>
        </ul>
      </li>
      <li style="list-style: none;">✓
        <p>
          Evening reporting form contains fields for date, time spent on sports
          and exercise, time spent studying, regularity and quality of eating,
          and generic mood
        </p>
        <ul>
          <li style="list-style: none;">✓
            Date is populated by default to today, but can be changed
            <ul>
              <li style="list-style: none;">✓Form has a date field for selecting the date</li>
            </ul>
          </li>
          <li style="list-style: none;">✓
            Time spent on sports and exercise and time spent studying are
            reported in hours (with decimals)
          </li>
          <li style="list-style: none;">✓
            Regularity and quality of eating and generic mood are reported using
            a number from 1 to 5, where 1 corresponds to very poor and 5
            corresponds to excellent.
            <ul>
              <li style="list-style: none;">✓
                Form has a slider (e.g. range) or radio buttons for reporting
                the value
              </li>
            </ul>
          </li>
          <li>
            Form contains labels that clarify the purpose of the input fields
            and the accepted values
          </li>
          <li>
            Form fields are validated
            <ul>
              <li>
                Time spent on sports and exercise and time spent studying are
                reported in hours must be entered, must be a number (can be
                decimal), and cannot be negative
              </li>
              <li>
                Regularity and quality of eating and generic mood must be
                reported using numbers between 1 and 5 (integers).
              </li>
              <li>In case of validation errors, form fields are populated</li>
            </ul>
          </li>
        </ul>
      </li>
      <li style="list-style: none;">✓
        <p>Reported values are stored into the database</p>
        <ul>
          <li style="list-style: none;">✓The database schema used for reporting works for the task</li>
          <li style="list-style: none;">✓
            Reporting is user-specific (all reported values are stored under the
            currently authenticated user)
          </li>
          <li>
            If the same report is already given (e.g. morning report for a
            specific day), then the older report is removed
            <ul>
              <li>
                If the functionality for handling duplicate reports is something
                else, the functionality is described in documentation
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li style="list-style: none;">✓
        <p>
          Reporting functionality structured into logical parts (separate views
          folder, separate controller for reporting, service(s), ...)
        </p>
      </li>
    </ul>
  </li>
  <li style="list-style: none;">✓
    <p>Summarization</p>
    <ul>
      <li style="list-style: none;">✓
        Summary functionality is available under the path /behavior/summary
      </li>
      <li style="list-style: none;">✓
        Main summary page contains the following statistics, by default shown
        for the last week and month
        <ul>
          <li style="list-style: none;">✓
            Weekly average (by default from last week)
            <ul>
              <li style="list-style: none;">✓Average sleep duration</li>
              <li style="list-style: none;">✓Average time spent on sports and exercise</li>
              <li style="list-style: none;">✓Average time spent studying</li>
              <li style="list-style: none;">✓Average sleep quality</li>
              <li style="list-style: none;">✓Average generic mood</li>
            </ul>
          </li>
          <li style="list-style: none;">✓
            Monthly average (by default from last month)
            <ul>
              <li style="list-style: none;">✓Average sleep duration</li>
              <li style="list-style: none;">✓Average time spent on sports and exercise</li>
              <li style="list-style: none;">✓verage time spent studying</li>
              <li style="list-style: none;">✓Average sleep quality</li>
              <li style="list-style: none;">✓Average generic mood</li>
            </ul>
          </li>
        </ul>
      </li>
      <li style="list-style: none;">✓
        Summary page has a selector for week and month. Check input type="week"
        and input type="month".
        <ul>
          <li style="list-style: none;">✓
            When the week is changed, the weekly average will be shown for the
            given week.
          </li>
          <li style="list-style: none;">✓
            When the month is changed, the monthly average will be shown for the
            given month.
          </li>
          <li style="list-style: none;">✓
            If no data for the given week exists, the weekly summary shows text
            suggesting that no data for the given week exists.
          </li>
          <li style="list-style: none;">✓
            If no data for the given month exists, the monthly summary shows
            text suggesting that no data for the given month exists.
          </li>
        </ul>
      </li>
      <li style="list-style: none;">✓
        Summary data / averages calculated within the database
        <ul>
          <li style="list-style: none;">✓
            When doing weekly reporting, the weekly averages are calculated in
            the database
          </li>
          <li style="list-style: none;">✓
            When doing monthly reporting, the monthly averages are calculated in
            the database
          </li>
        </ul>
      </li>
      <li style="list-style: none;">✓Summarization page contains statistics only for the current user.</li>
    </ul>
  </li>
  <li>
    <p>Landing page (i.e. page at the root path of the application)</p>
    <ul>
      <li>Landing page briefly describes the purpose of the application</li>
      <li style="list-style: none;">✓
        Landing page shows a glimpse at the data and indicates a trend
        <ul>
          <li style="list-style: none;">✓
            Landing page shows users' average mood for today and and yesterday
          </li>
          <li style="list-style: none;">✓
            If the average mood yesterday was better than today, tells that
            things are looking gloomy today
          </li>
          <li style="list-style: none;">✓
            If the average mood yesterday was was worse today, tells that things
            are looking bright today
          </li>
        </ul>
      </li>
      <li style="list-style: none;">✓
        Landing page has links / buttons for login and register functionality
      </li>
      <li style="list-style: none;">✓Landing page has links / buttons for reporting functionality</li>
    </ul>
  </li>
  <li>
    <p>Testing</p>
    <ul>
      <li>
        The application has at least 5 meaningful automated tests. All tests
        detect if e.g. tested functionality is changed so that it no longer
        works as expected.
      </li>
      <li>
        The application has at least 10 meaningful automated tests. All tests
        detect if e.g. tested functionality is changed so that it no longer
        works as expected.
      </li>
      <li>
        The application has at least 20 meaningful automated tests. All tests
        detect if e.g. tested functionality is changed so that it no longer
        works as expected.
      </li>
      <li>
        The application has at least 30 meaningful automated tests. All tests
        detect if e.g. tested functionality is changed so that it no longer
        works as expected.
      </li>
    </ul>
  </li>
  <li>
    <p>Security</p>
    <ul>
      <li style="list-style: none;">✓Passwords are not stored in plaintext</li>
      <li>
        Field types in the database match the actual content (i.e., when storing
        numbers, use numeric types)
      </li>
      <li>
        Database queries done using parameterized queries (i.e., code cannot be
        injected to SQL queries)
      </li>
      <li>
        Data retrieved from the database are sanitized (i.e., if showing content
        from database, using
        <code class="language-text">&lt;%= ... %&gt;</code> instead of
        <code class="language-text">&lt;%- ...%&gt;</code> unless explicitly
        stated what for).
      </li>
      <li>Users cannot access data of other users.</li>
      <li>Users cannot post reports to other users' accounts.</li>
    </ul>
  </li>
  <li>
    <p>Database</p>
    <ul>
      <li style="list-style: none;">✓
        Expensive calculations such as calculating averages are done in the
        database
      </li>
      <li>
        Indices are used when joining tables if the queries are such that they
        are used often
      </li>
      <li style="list-style: none;">✓Database uses a connection pool</li>
      <li style="list-style: none;">✓Database credentials are not included in the code</li>
    </ul>
  </li>
  <li>
    <p>User interface / views</p>
    <ul>
      <li style="list-style: none;">✓Views are stored in a separate folder</li>
      <li style="list-style: none;">✓User interface uses partials for header content</li>
      <li style="list-style: none;">✓User interface uses partials for footer content</li>
      <li>
        Recurring parts are separated into own partials (e.g. partial for
        validation errors)
      </li>
      <li>
        Pages with forms contain functionality that guides the user
        <ul>
          <li>
            Labels are shown next to form fields so that the user knows what to
            enter to the form fields
          </li>
          <li>
            Form fields are validated and user sees validation errors close to
            the form fields
          </li>
          <li>
            In the case of validation errors, form fields are populated (with
            the exception of the login page)
          </li>
        </ul>
      </li>
      <li style="list-style: none;">✓
        User interface uses a style library or self-made stylesheets (see e.g.
        <a
          href="https://getbootstrap.com/"
          target="_blank"
          rel="nofollow noopener noreferrer"
          >Twitter Bootstrap</a
        >
        for a style library)
        <ul>
          <li style="list-style: none;">✓
            If Twitter Bootstrap or other external style libraries are used,
            they are used over a content delivery network
          </li>
        </ul>
      </li>
      <li style="list-style: none;">✓Different pages of the application follow the same style</li>
      <li>
        User sees if the user has logged in (e.g. with a message 'Logged in as
        <a
          href="mailto:my@email.net"
          target="_blank"
          rel="nofollow noopener noreferrer"
          >my@email.net</a
        >' shown at the top of the page)
      </li>
    </ul>
  </li>
  <li>
    <p>APIs</p>
    <ul>
      <li style="list-style: none;">✓
        The application provides an API endpoint for retrieving summary data
        generated over all users in a JSON format
      </li>
      <li style="list-style: none;">✓The API is accessible by all</li>
      <li style="list-style: none;">✓The API allows cross-origin requests</li>
      <li style="list-style: none;">✓
        Endpoint /api/summary/ provides a JSON document with averages for sleep
        duration, time spent on sports and exercise, time spent studying, sleep
        quality, and generic mood for each day over the last 7 days
      </li>
      <li style="list-style: none;">✓
        Endpoint /api/summary/:year/:month/:day provides a JSON document with
        averages for sleep duration, time spent on sports and exercise, time
        spent studying, sleep quality, and generic mood for the given day
      </li>
    </ul>
  </li>
</ul>

<ul>
  <li>
    <p>Deployment</p>
    <ul>
      <li>
        Application is available and working in an online location (e.g. Heroku)
        at an address provided in the documentation
      </li>
      <li>
        Application can be run locally following the guidelines in documentation
      </li>
    </ul>
  </li>
  <li>
    <p>Documentation</p>
    <ul>
      <li>
        Documentation contains necessary CREATE TABLE statements needed to
        create the database used by the application
      </li>
      <li>
        Documentation contains the address at which the application can
        currently be accessed
      </li>
      <li>Documentation contains guidelines for running the application</li>
      <li>Documentation contains guidelines for running tests</li>
    </ul>
  </li>
  <li>Resolve time zone business</li>
</ul>
