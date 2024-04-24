const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const app = express();

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
