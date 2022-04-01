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
        GeneralErr: {
          description: 'Something wrong in the frontend, not backend.',
        },
        UnauthorizedError: {
          description: 'Access token is missing or invalid.',
        },
        BadRequest: {
          description: 'Bad request. Already exists',
        },
        Forbidden: {
          description: 'You do not have authorization to be here.',
        },
        NotFound: {
          description: 'Not Found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    description: 'A message about the result',
                    example: 'Not Found',
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
