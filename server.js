const app = require("./app");
const port = require("./app/config/config");

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`listen: http://localhost:${port}`);
  /* eslint-enable no-console */
});
