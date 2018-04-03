const app = require('./app');
const config = require('./config');

const port = config.get('port');

app.listen(port, () => {
  /* eslint no-console:0 */
  console.log(`Server listen on port ${port}`);
});
