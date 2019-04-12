import express from 'express';

import router from './routes';

const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8081;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);

router.use('/*', (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Endpoint not found! Go to the homepage using: /api/v1',
  });
});

app.listen(port, () => {
  console.log(`Sever running on port ${port}`);
});

export default app;
