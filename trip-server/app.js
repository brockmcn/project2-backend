const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

let credentials = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));
let connection = mysql.createConnection(credentials);
connection.connect();

function rowToObject(row) {
   return {
      id: row.id,
      message: row.message,
   };
}

app.get('/notes/:id', (request, response) => {
   const query = 'SELECT id, message FROM note WHERE is_deleted = 0 AND id = ?';
   const params = [request.params.id];
   connection.query(query, params, (error, rows) => {
      response.send({
         ok: true,
         note: rows.map(rowToObject),
      });
   });
});

app.get('/notes', (request, response) => {
   const query = 'SELECT id, message FROM note WHERE is_deleted = 0';
   connection.query(query, (error, rows) => {
      response.send({
         ok: true,
         note: rows.map(rowToObject),
      });
   });
});

app.post('/notes', (request, response) => {
   const query = 'INSERT INTO note(message) VALUES (?)';
   const params = [request.body.message];
   connection.query(query, params, (error, result) => {
      response.send({
         ok: true,
         id: result.insertID,
      });
   });
});

app.patch('/notes/:id', (request, response) => {
   const query = 'UPDATE note SET message = ? WHERE id = ?';
   const params = [request.body.message, request.params.id];
   connection.query(query, params, (error, result) => {
      response.send({
         ok: true,
      });
   });
});

app.delete('/notes/:id', (request, response) => {
   const query = 'UPDATE note SET is_deleted = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
   const params = [request.params.id];
   connection.query(query, params, (error, result) => {
      response.send({
         ok: true,
      });
   });
});

const port = 3443;
app.listen(port, () => {
    console.log(`We're live on port ${port}!`);
});
