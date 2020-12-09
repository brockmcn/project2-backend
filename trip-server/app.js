const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;
app.listen(port, () => {
    console.log(`We're live on port ${port}!`);
})