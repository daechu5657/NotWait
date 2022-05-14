const express = require('express');
const path = require('path');
const app = express();
app.use(express.json({ limit: '10mb' }));
var cors = require('cors');
app.use(cors());
const http = require('http').createServer(app);

app.use(express.static(path.join(__dirname, 'notwait/dist')));

const MongoClient = require('mongodb').MongoClient;
var db;
MongoClient.connect(
  'mongodb+srv://kimdaeho5657:rlaeogh5657@cluster0.bxeux.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useUnifiedTopology: true },
  function (에러, client) {
    if (에러) return console.log(에러);

    db = client.db('notwait');
    app.listen('8080', function () {
      console.log('listening on 8080');
    });
    app.get('*', function (요청, 응답) {
      응답.sendFile(path.join(__dirname, '/notwait/dist/index.html'));
    });
    app.post('/Login', function (요청, 응답) {
      db.collection('code')
        .find({ _id: 요청.body.code })
        .toArray()
        .then(data => {
          if (data.length === 0) {
            응답.send('틀려유');
          } else if (data[0].onoff == 1) {
            var b = [];
            db.collection('menu')
              .find({ _id: 요청.body.code })
              .toArray()
              .then(a => {
                b.push(a[0]);
              });
            db.collection('table')
              .find({ _id: 요청.body.code })
              .toArray()
              .then(a => {
                b.push(a[0]);
                응답.send(b);
              });
          } else {
            응답.send('돈내야지');
          }
        });
    });
    app.post('/Menuset', function (요청, 응답) {
      db.collection('menu').updateOne(
        {
          _id: '1234',
        },
        {
          $set: {
            menu: 요청.body,
          },
        },
        { upsert: true },
        function (에러, 결과) {
          db.collection('menu')
            .find({ _id: '1234' })
            .toArray()
            .then(a => {
              응답.send(a);
            });
        }
      );
    });
    app.post('/Tableupdate', function (요청, 응답) {
      db.collection('table').updateOne(
        {
          _id: '1234',
        },
        {
          $set: {
            table: 요청.body,
          },
        },
        { upsert: true },
        function (에러, 결과) {
          db.collection('table')
            .find({ _id: '1234' })
            .toArray()
            .then(a => {
              응답.send(a);
            });
        }
      );
    });
  }
);
