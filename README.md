# Underdog Devs

## Product Mission and Goals

Underdog Devs is a group of software developers supporting the formerly incarcerated & disadvantaged in their transition into the software industry.

## Getting Started

The base technologies are JavaScript, HTML and CSS. The frontend leverages [React](https://reactjs.org/), the backend uses [Express](https://expressjs.com/) and [PostgreSQL](https://www.postgresql.org/), the server runs on [Heroku](https://www.heroku.com/), and the authentication workflow runs on [Okta](https://developer.okta.com/okta-sdk-nodejs/jsdocs/).

### Developer Instructions

1. From the backend directory, in your terminal:
   1. Create an environment file (.env) and populate the environment variables (Migrate/Seed your local database)
   1. Make sure the `.env` is in your `.gitignore`
   1. Follow the [Lambda instructions](https://docs.labs.lambdaschool.com/api/#setup-postgres) to set up the local PostgreSQL database
      - In addition, create a 'test' database (for use in integration testing), and set the `TESTING_DATABASE_URL` environment variable, following the format of the `DATABASE_URL` variable, inside of your `.env` file to configure your connection to it. For reference this format is: `postgresql://USERNAME:PASSWORD@localhost:8080/DATABASE_NAME`
   1. Download the server dependencies by running `npm install`
   1. Migrate your tables by running `npm run knex migrate:latest`
   1. Seed your tables by running `npm run knex seed:run`
   1. Start up the server by running `npm run watch:dev`
1. From the frontend directory in your terminal:
   1. Download the frontend dependencies by running `npm install`
   1. Start up the app by running `npm start`

## Database Design

[DB Designer](https://dbdesigner.page.link/TpVFGQTXgwyFKyDg8)

[Whimsical Relational Database Design](https://whimsical.com/relationship-tables-and-api-s-backend-3TEHn4ZVYCjj6CKHua8BB8)

# Endpoints

## Response Codes
[Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#server_error_responses)
Please see [this file](./__tests__/README.md) for more info.

## Status

| Method | Endpoint | Request Body | Returns                    |
| ------ | -------- | ------------ | -------------------------- |
| GET    | `/`      | -            | `{ api: "up", timestamp }` |

## User Authorization

###### Except for non-logged in features, users must be logged in to access all endpoints

| User       | Authorization                   |
| ---------- | ------------------------------- |
| SuperAdmin | `only SuperAdmin can access`    |
| Admin      | `only admin and up can access`  |
| Mentor     | `only mentor and up can access` |
|            | `Anyone has access`             |

## Profiles

###### Reference profile schema:

    {
        "user_id": "00ulzfj6nX72gu3Nh4d6",
        "email": "email@email.mail",
        "first_name":"John",
        "last_name":"Doe",
        "role_id": 3,
        "role_name": "user",
        "created_at": "2021-04-21T18:47:18.712Z",
        "updated_at": "2021-04-21T18:47:18.712Z",
        "approved": True
    }

| Method | Endpoint                  | Required Request Body | Returns                           | User Auth    |
| ------ | ------------------------- | --------------------- | --------------------------------- | ------------ |
| GET    | `/profile`                | -                     | `get all profiles`                | `Admin`      |
| GET    | `/profile/:id`            | -                     | `get profile by id`               | `Admin`      |
| GET    | `/profile/current_user`   | -                     | `get current profile`             |              |
| POST   | `/profile`                | `first/last, email`   | `create new profile`              |              |
| PUT    | `/profile/:id`            | `first/last, email`   | `update a profile by profile id`  |              |
| PUT    | `/profile/roles`          | `role`                | `update a profiles role`          | `Admin`      |
| PUT    | `/profile/is_active/:id`  | -                     | `activates/deactivates a profile` | `SuperAdmin` |

## Applications / Mentee-Mentor Intakes

###### Application schema:

    {
        "application_id": 1,
        "position": "4",
        "profile_id": "10",
        "approved": false,
        "created_at": "2021-11-01T17:59:02.023Z",
        "application_notes":"Notes about applicant",
    }

###### Mentor intake schema:

    {
        "profile_id": '00u13oned0U8XP8Mb4x7',
        "email": 'fakeemail2@gmail.com',
        "country": 'USA',
        "state": 'California',
        "city": 'San Francisco',
        "first_name": 'Hotdog',
        "last_name": 'Jeopardy',
        "current_company": 'Amazin',
        "current_position": 'Front End Developer',
        "job_help": true,
        "industry_knowledge": true,
        "pair_programming": false,
        "subject": 'frontend'
        "experience_level": 'expert',
        "other_info": 'none',
        "validateStatus: 'pending',
    }

###### Mentee intake schema:

    {
        "profile_id": '12',
        "email": 'fakeemail1@gmail.com',
        "country": 'USA',
        "state": 'California',
        "city": 'San Francisco',
        "first_name": 'Joe',
        "last_name": 'Baseball',
        "formerly_incarcerated": true,
        "list_convictions": 'coded too much',
        "subject": 'frontend'
        "experience_level": beginner',
        "underrepresented_group": true,
        "low_income": false,
        "job_help": true,
        "industry_knowledge": true,
        "pair_programming": false,
        "other_info": 'Not really',
        "validateStatus: 'pending',
    }

| Method | Endpoint                        | Required Request Body                                                            | Returns                                                          | User Auth |
| ------ | ------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------- | --------- |
| GET    | `/application/`                 | -                                                                                | `gets all pending applications`                                  | `Admin`   |
| GET    | `/application/:role`            | -`mentor or mentee (req.param)`                                                  | `gets all pending applications filtered by role`                 | `Admin`   |
| GET    | `/application/profileId/:id`    | -`profile id (req.param)`                                                        | `gets pending application by profile id`                         | `Admin`   |
| POST   | `/application/new/:role`        | -`mentor or mentee (req.param)`, `sign-up form data(mentor/mentee intake)`       | `stores intake data & creates new pending application`           |           |
| PUT    | `/application/update-role`      | -`position (role_id)`, `application_id`, `profile_id`,                           | `update profile role and update application to approved: true`   | `Admin`   |
| PUT    | `/application/register/:id`     | -`profile_id (req.param)`                                                        | `registers user to okta & updates application to approved: true` | `Admin`   |
| PUT    | `/application/update-notes/:id` | -`application_id (req.param)` , `application_notes (req.body.application_notes)` | `updates note field on application ticket`                       | `Admin`   |
| PUT    | `/application/intake/:role/:id` | -`role (req.param)` , `profile_id (req.param)`                                   | `get mentor or mentee intake data from DS database`              | `Admin`   |

## Application - Matching Mentors and Mentees

###### Application schema:

    {
        "application_id": 2,
        "created_at": "2022-01-13T20:44:31.827Z",
        "first_name": "User",
        "last_name": "8",
        "profile_id": "00u13oned0U8XP8Mb4x7",
        "role_name": "mentee"
    }

## Assignments - Matching Mentors and Mentees

###### Assignments schema:

    {
        "assignment_id": 1,
        "mentor_id": "7",
        "mentee_id": "10"
    }

###### Mentor's mentees schema and vice versa:

    {
        "assignment_id": 1,
        "mentee_id": "10",
        "email": "llama0010@maildrop.cc",
        "first_name": "User",
        "last_name": "10",
        "role_id": 4,
        "created_at": "2021-11-01T17:59:02.023Z",
        "pending": true
    }

| Method | Endpoint                      | Required Request Body      | Returns                                               | User Auth |
| ------ | ----------------------------- | -------------------------- | ----------------------------------------------------- | --------- |
| GET    | `/assignments`                | -                          | `get all assignments`                                 | `Admin`   |
| GET    | `/assignments/:assignment_id` | -                          | `get assignment by assignment id`                     | `Admin`   |
| GET    | `/assignments/mentor/:id`     | -                          | `get all the mentees a mentor has by the mentor's id` | `Admin`   |
| GET    | `/assignments/mentee/:id`     | -                          | `get all the mentors a mentee has by the mentee's id` | `Admin`   |
| GET    | `/assignments/mymentors`      | -                          | `get all the mentors the current user has`            |           |
| GET    | `/assignments/mymentees`      | -                          | `get all the mentees the current user has`            |           |
| POST   | `/assignments`                | `mentor_id`,`mentee_id`    | `create a new assignment between a mentor and mentee` | `Admin`   |
| PUT    | `/assignments/:id`            | `mentor_id` or `mentee_id` | `update a assignment by assignment id,`               | `Admin`   |
| DELETE | `/assignments/:id`            | -                          | `delete assignment by assignment_id`                  | `Admin`   |

## Meetings

###### Meetings schema:

    {
        meeting_id: 2,
        created_at: 2022-03-12T00:42:20.382Z,
        updated_at: 2022-03-12T00:42:20.382Z,
        meeting_topic: 'lorem dipz um',
        meeting_start_date: 1640353440,
        meeting_end_date: 1640354210, 
        host_id: '7',
        attendee_id: '00ultx74kMUmEW8054x6',
        meeting_notes: 'Remember to bring a smile',
        meeting_missed: 'Pending'
    }

| Method | Endpoint                        | Required Request Body                                                             | Returns                                           | User Auth |
| ------ | ------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------- | --------- |
| GET    | `/meetings`                     | -                                                                                 | `get all meetings`                                | `Admin`   |
| GET    | `/meetings/:meeting_id`         | -                                                                                 | `get meeting by meeting id`                       | `Admin`   |
| GET    | `/meetings/profile/:profile_id` | -                                                                                 | `get all the meetings a profile_id has scheduled` | `Admin`   |
| GET    | `/meetings/my-meetings`         | -                                                                                 | `get all the meetings the current user has`       |           |
| POST   | `/meetings`                     | `meeting_topic`,`meeting_date`, `meeting_time`,`host_id`,`attendee_id`,           | `create a new meeting`                            | `Mentor`  |
| PUT    | `/meetings/:meeting_id`         | `meeting_topic` or `meeting_date` or `meeting_time` or `host_id` or `attendee_id` | `update a meeting by meeting_id,`                 | `Mentor`  |
| DELETE | `/meetings/:meeting_id`         | -                                                                                 | `delete meeting by meeting_id`                    | `Mentor`  |

## Resources

###### Resources schema:

    {
        "resource_id": 1,
        "created_at": "2021-11-12T19:50:44.914Z",
        "updated_at": "2021-11-12T19:50:44.914Z",
        "resource_name": "MacBook Pro 2020",
        "category": "Computers",
        "condition": "Excellent",
        "assigned": true,
        "current_assignee": "9",
        "previous_assignee": "7",
        "monetary_value": "1000$",
        "deductible_donation": true
    }

| Method | Endpoint                  | URL Parameters                                          | Required Request Body                  | Returns                                    | User Auth |
| ------ | ------------------------- | ------------------------------------------------------- | -------------------------------------- | ------------------------------------------ | --------- |
| GET    | `/resources`              | Allows Querying (i.e. `/resources?condition=Excellent`) | -                                      | `get all resources`                        |           |
| GET    | `/resources/:resource_id` | `resource_id` (required) must be an integer value       | -                                      | `get a resource by resource_id`            |           |
| POST   | `/resources`              |                                                         | `resource_name`,`category`,`condition` | `add a new resource to the db`             | `Admin`   |
| PUT    | `/resources/:resource_id` | `resource_id` (required) must be an integer value       | `resource_name`,`category`,`condition` | `update a resource by resource_id,`        | `Admin`   |
| DELETE | `/resources/:resource_id` | `resource_id` (required) must be an integer value       | -                                      | `delete a resource by resource_id from db` | `Admin`   |

## Resource Tickets

###### Resource tickets is the management system for Mentors/Admin to communicate about a specific resource. (Requests, Recommendations, etc.)

###### Resource Ticket schema:

    {
        "resource_ticket_id": 1,
        "created_at": "2021-11-12T19:50:44.916Z",
        "updated_at": "2021-11-12T19:50:44.916Z",
        "submitted_by": "7",
        "pertains_to": "Elon Musk",
        "message": "Elon deserves to have the 2020 MacBook Pro. Of all the mentees I have, I think he has the most potential."
    }

| Method | Endpoint                                | Required Request Body | Returns                                  | User Auth |
| ------ | --------------------------------------- | --------------------- | ---------------------------------------- | --------- |
| GET    | `/resource-tickets`                     | -                     | `get all resource tickets`               | `Admin`   |
| GET    | `/resource-tickets/:resource_ticket_id` | -                     | `get a ticket by it id`                  | `Admin`   |
| GET    | `/resource-tickets/mytickets`           | -                     | `get all the current user's tickets`     |           |
| POST   | `/resource-tickets`                     | `message`             | `create a new ticket`                    | `Mentor`  |
| PUT    | `/resource-tickets/:resource_id`        | `message`             | `update a ticket by resource_ticket_id,` | `Mentor`  |
| DELETE | `/resource-tickets/:resource_id`        | -                     | `delete a ticket by resource_id from db` | `Mentor`  |

###### Actions Tickets schema:

    {
        "action_ticket_id": 2,
        "submitted_by": "11",
        "subject_id": "00u13oned0U8XP8Mb4x7",
        "issue": "My mentor isn't really helping me learn, could I seek reassignment?",
        "comments": null,
        "pending": true,
        "resolved": true,
        "strike": false,
        "created_at": "2021-12-07T17:08:00.987Z",
        "updated_at": "2021-12-07T17:08:00.987Z"
    }

| Method | Endpoint               | Required Request Body                 | Returns                       | User Auth |
| ------ | ---------------------- | ------------------------------------- | ----------------------------- | --------- |
| GET    | `/actions`             | -                                     | `get all actions tickets`     | -         |
| GET    | `/actions/:actions_id` | -                                     | `get an actions ticket by id` | -         |
| POST   | `/actions`             | `submitted_by`, `subject_id`, `issue` | `create a new actions ticket` | -         |
| PUT    | `/actions/:actions_id` | -                                     | `update an actions ticket`    | -         |

###### Roles schema:

    {
        "profile_id": 2,
        "role_id": 4 (from 2 to 5)
    }

| Method | Endpoint             | Required Request Body | Returns                            | User Auth |
| ------ | -------------------- | --------------------- | ---------------------------------- | --------- |
| GET    | `/roles`             | -                     | `get all available roles`          | `admin`   |
| GET    | `/roles/:profile_id` | -                     | `get a specific profile's role_id` | -         |
| PUT    | `/roles/:profile_id` | `role_id`             | `update a profile's role`          | `admin`   |

###### Role Ticket Schema:

    {
        "role_ticket_id": 1,
        "submitted_by": "00ulthapbErVUwVJy4x6",
        "subject_id": "00ulthapbErVUwVJy4x6",
        "requested_role": 1,
        "approved_by": "00ulthapbErVUwVJy4x6",
        "comments": "This is my 1st dummy data comment",
        "pending": true,
        "resolved": false,
        "created_at": "2022-01-25T20:33:26.119Z",
        "updated_at": "2022-01-25T20:33:26.119Z"
    }

| Method | Endpoint                        | Required Request Body                          | Returns                       | User Auth |
| ------ | ------------------------------- | ---------------------------------------------- | ----------------------------- | --------- |
| GET    | `/role-tickets`                 | -                                              | `get all role tickets`        | `admin`   |
| GET    | `/role-tickets/:role_ticket_id` | -                                              | `get a specific role ticket`  | `admin`   |
| POST   | `/role-tickets`                 | `submitted_by`, `subject_id`, `requested_role` | `create a new role ticket`    |           |
| PUT    | `/role-tickets/:role_ticket_id` | -                                              | `updates a role ticket by id` |           |
| DELETE | `/role-tickets/:role_ticket_id` | -                                              | `delete a role ticket by id`  |           |

###### Progress schema:

    {
        "profile_id": 2,
        "progress_id": 4 (from 1 to 5)
    }

| Method | Endpoint                | Required Request Body | Returns                                     | User Auth |
| ------ | ----------------------- | --------------------- | ------------------------------------------- | --------- |
| GET    | `/progress`             | -                     | `get all available progress tags`           | `mentor`  |
| GET    | `/progress/:profile_id` | -                     | `get a specific profile's current progress` | -         |
| PUT    | `/progress/:profile_id` | `progress_id`         | `update a profile's progress`               | `admin`   |

###### Notes schema:

    {
        "note_id": 1 (PK, integer),
        "content_type": type here,
        "status": ["in progress", "resolved", "no action needed", "escalated"]
        "content": note text,
        "level": low medium or high,
        "visible_to_admin": true,
        "visible_to_mentor": true,
        "mentor_id": profile_id of mentor(FK),
        "mentee_id": profile_id of mentee(FK),
        "created_at": timestamp with time zone,
        "updated_at": timestamp with time zone
    }

| Method | Endpoint                            | Required Request Body                                 | Returns                           | User Auth |
| ------ | ----------------------------------- | ----------------------------------------------------- | --------------------------------- | --------- |
| GET    | `/notes`                            | -                                                     | `get all notes`                   | -         |
| GET    | `/notes/:note_id`                   | `note_id`(params)                                     | `get note by note_id`             | -         |
| GET    | `/notes/mentee/:mentee_id`          | `mentee_id`(params)                                   | `get notes by mentee_id`          | -         |
| POST   | `/notes`                            | `content_type`,                                       | `newly created note`              | -         |
                                                 `status`,
                                                 `content`,
                                                 `level`,
                                                 `visible_to_admin`,
                                                 `visible_to_mentor`,
                                                 `mentor_id`,
                                                 `mentee_id`                                           | `added note`                      | -         |
| PUT    | `/notes/:note_id`                   | `note_id`(params), `status, content, and/or level`    | `updated note`                    | -         |
| DELETE | `/notes/:note_id`                   | `note_id`(params)                                     | `remove note by note_id`          | -         |