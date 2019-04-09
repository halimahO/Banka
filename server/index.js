import express from 'express';
const bodyParser = require('body-parser');
import router from './routes'

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1', router);
 
app.listen(port, () => {
  console.log(`Sever running on port ${port}`);
});

export default app;