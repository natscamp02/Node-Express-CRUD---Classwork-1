require('dotenv').config({ path: './secrets.env' });

const conn = require('./db');
const app = require('./app');
const PORT = process.env.PORT || 5000;

conn.connect(() => console.log('Connected to database...'));
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
