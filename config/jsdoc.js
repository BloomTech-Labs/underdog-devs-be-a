module.exports = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Lambda Labs Starter API',
      version: '1.0.0',
      description:
        'A basic API server to act as a starting point for Labs projects',
      license: {
        name: 'MIT',
        url: 'https://en.wikipedia.org/wiki/MIT_License',
      },
    },
    tags: [
      {
        name: 'status',
        description: 'Everything about your status',
      },
      {
        name: 'profile',
        description: 'Operations for profile',
      },
      {
        name: 'assignments',
        description: 'Operations for profile',
      },
      {
        name: 'data',
        description: 'Operations for data science service',
      },
      {
        name: 'application',
        description: 'Operations for applications API',
      },
    ],
    externalDocs: {
      description: 'Data Science scaffold service docs',
      url: 'https://ds.labsscaffolding.dev/',
    },
    components: {
      securitySchemes: {
        okta: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'Okta idToken JWT',
        },
      },
      responses: {
        BadRequest: {
          description: '400: Bad request. Client Error.',
        },
        Unauthorized: {
          description: '401: Access token is missing or invalid.',
        },
        Forbidden: {
          description: '403: You do not have authorization to be here.',
        },
        NotFound: {
          description: '404: Not Found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    description: `The server has not found the requested #field#.`,
                    example: 'Not Found',
                  },
                },
              },
            },
          },
        },
        UnacceptablePost: {
          description: '406: Unacceptable post request.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    description: 'When ready to deploy app - change to 404!',
                    example: 'Cannot post. #Some_field# is probably missing.',
                  },
                },
              },
            },
          },
        },
        OktaErr: {
          description: `407: Third Party Auth Error.`,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    description: `When ready to deploy app - change to 404!
                    Generally used as a proxy definition. But we will use this as
                    a Third Party error. Please do not use 407 error in deployment
                    as this could cause an intruder to understand too much of the real issue`,
                    example: 'Okta server error - please contact support.',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ['./api/**/*Router.js'],
};
