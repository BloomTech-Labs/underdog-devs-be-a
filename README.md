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
   1. Download the server dependencies by running `npm install`
   1. Migrate your tables by running `npm run knex migrate:latest`
   1. Seed your tables by running `npm run knex seed:run`
   1. Start up the server by running `npm run watch:dev`
1. From the frontend directory in your terminal:
   1. Download the frontend dependencies by running `npm install`
   1. Start up the app by running `npm start`

## Database Design

[Whimsical Relational Database Design](https://whimsical.com/relationship-tables-and-api-s-backend-3TEHn4ZVYCjj6CKHua8BB8)

# Endpoints

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

| Method | Endpoint          | Required Request Body | Returns                          | User Auth    |
| ------ | ----------------- | --------------------- | -------------------------------- | ------------ |
| GET    | `/profiles`       | -                     | `get all profiles`               |              |
| GET    | `/profiles/:id`   | -                     | `get profile by id`              |              |
| POST   | `/profiles`       | `first/last, email`   | `create new profile`             |              |
| PUT    | `/profiles/:id`   | `first/last, email`   | `update a profile by profile id` |              |
| PUT    | `/profiles/roles` | `role`                | `update a profiles role`         | `SuperAdmin` |
| DELETE | `/profiles/:id`   | -                     | `delete a profile by profile id` |              |

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
        "meeting_id": 4,
        "created_at": "2021-11-08T19:21:16.551Z",
        "updated_at": "2021-11-08T19:21:16.551Z",
        "meeting_topic": "Resume Help",
        "meeting_date": "2021-12-04",
        "meeting_time": "4pm PCT - 5pm PCT",
        "host_id": "9",
        "attendee_id": "7",
        "meeting_notes": "Remember to bring your resume"
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

| Method | Endpoint                  | Required Request Body                  | Returns                                    | User Auth |
| ------ | ------------------------- | -------------------------------------- | ------------------------------------------ | --------- |
| GET    | `/resources`              | -                                      | `get all resources`                        |           |
| GET    | `/resources/:resource_id` | -                                      | `get a resource by resource_id`            |           |
| POST   | `/resources`              | `resource_name`,`category`,`condition` | `add a new resource to the db`             | `Admin`   |
| PUT    | `/resources/:resource_id` | `resource_name`,`category`,`condition` | `update a resource by resource_id,`        | `Admin`   |
| DELETE | `/resources/:resource_id` | -                                      | `delete a resource by resource_id from db` | `Admin`   |

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
