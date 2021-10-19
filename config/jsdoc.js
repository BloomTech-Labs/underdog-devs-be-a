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
        name: 'data',
        description: 'Operations for data science service',
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
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
        },
        BadRequest: {
          description: 'Bad request. profile already exists',
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
