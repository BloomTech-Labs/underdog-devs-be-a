const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const jsdocConfig = require('../config/jsdoc');
const dotenv = require('dotenv');
const config_result = dotenv.config();
const { authRequired, authProfile } = require('./middleware/auth0Middleware');
if (process.env.NODE_ENV != 'production' && config_result.error) {
  throw config_result.error;
}
const handleError = require('./middleware/handleError');

const swaggerSpec = swaggerJSDoc(jsdocConfig);
const swaggerUIOptions = {
  explorer: true,
};

//###[  Routers ]###
const indexRouter = require('./index/indexRouter');
const profileRouter = require('./profile/profileRouter');
const dsRouter = require('./dsService/dsRouter');
const assignmentsRouter = require('./assignments/assignmentsRouter');
const applicationRouter = require('./applications/applicationRouter');
const meetingsRouter = require('./meetings/meetingsRouter');
const actionsRouter = require('./actions/actionsRouter');
const resourcesRouter = require('./resources/resourcesRouter');
const resourceTicketRouter = require('./resources/resourceTicketsRouter');
const rolesRouter = require('./roles/rolesRouter');
const progressionRouter = require('./progession/progressionRouter');
const roleTicketsRouter = require('./roleTickets/roleTicketsRouter');
const noteRouter = require('./notes/noteRouter');
const reviewsRouter = require('./reviews/reviewsRouter');
const gettingStartedRouter = require('./getting_started/gettingStartedRouter');

const app = express();

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});
// docs would need to be built and committed
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUIOptions)
);

app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//using auth0 middleware to verify user is authenticated
app.use(authRequired);
//using authProfile middle ware to save current user data
app.use(authProfile);

// application routes
app.use('/', indexRouter);
app.use('/profile', profileRouter);
app.use('/data', dsRouter);
app.use('/assignments', assignmentsRouter);
app.use('/application', applicationRouter);
app.use('/meetings', meetingsRouter);
app.use('/actions', actionsRouter);
app.use('/resources', resourcesRouter);
app.use('/resource-tickets', resourceTicketRouter);
app.use('/roles', rolesRouter);
app.use('/progress', progressionRouter);
app.use('/role-tickets', roleTicketsRouter);
app.use('/notes', noteRouter);
app.use('/reviews', reviewsRouter);
app.use('/getting_started', gettingStartedRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(handleError);

module.exports = app;
