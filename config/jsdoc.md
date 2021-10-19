# Swagger Setup

Swagger docs are created using [open api v3 notations](https://swagger.io/specification/).
There are 2 libraries used to generate the swagger formatted docs:

- [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)
- [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc)

## Swagger UI Express

This library is used to setup and serve the offical swager ui resources
(html,css,js). The express app is setup to send requests to the route
`/api-docs` to the `swagger-ui-express` library.

## Swagger JS Doc

This library is used to parse the root definition file and inline JsDoc
comments. The api documentation entries are found inline on the router files in
`api/**/*Router.js` and use the yaml notation format. This is the most common
format found in swagger reference docs and resources found online.

The `jsdoc.js` definition file contains the application level information,
like app name, version, description and license. You can define reusable
components in this file and reference them throughout your jsdoc comments.

> Take note in the `jsdoc.js` file that tags are used to group routes together.
