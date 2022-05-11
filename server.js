const express = require('express');
const path = require('path');
const app = express();
app.use(express.json({ limit: '10mb' }));
var cors = require('cors');
app.use(cors());
const http = require('http').createServer(app);

http.listen(8080, function () {
  console.log('listening on 8080');
});

app.use(express.static(path.join(__dirname, 'notwait/dist')));

app.get('*', function (요청, 응답) {
  응답.sendFile(path.join(__dirname, '/notwait/dist/index.html'));
});
