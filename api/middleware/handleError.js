// eslint-disable-next-line
function handleError(err, req, res, next) {
  const fallbackErrorMessage = 'Uh oh! Something went wrong.';
  if (process.env.NODE_ENV === 'production') {
    res.status(500).json({
      message: fallbackErrorMessage,
    });
  } else {
    console.error(`STATUS ${err.status || 500} ERROR:`, err.message);
    res.status(err.status || 500).json({
      message: err.message || fallbackErrorMessage,
    });
  }
}
module.exports = handleError;
