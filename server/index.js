import express from 'express';
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
app.listen(port, () => {
  console.log(`Sever running on port ${port}`);
});

export default app;