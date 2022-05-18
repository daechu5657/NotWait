const express = require('express');
const path = require('path');
const app = express();
app.use(express.json({ limit: '10mb' }));
var cors = require('cors');
const { json } = require('express/lib/response');
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
    app.get('/Customer/:id', function (요청, 응답) {
      응답.sendFile(path.join(__dirname, '/notwait/dist/index.html'));
    });
    app.get('/Owner', function (요청, 응답) {
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
                setTimeout(() => {
                  응답.send(b);
                }, 500);
              });
          } else {
            응답.send('돈내야지');
          }
        });
    });
    app.post('/LoginCustomer', function (요청, 응답) {
      db.collection('code')
        .find({ _id: 요청.body.code })
        .toArray()
        .then(data => {
          var b = [];
          db.collection('menu')
            .find({ _id: 요청.body.code })
            .toArray()
            .then(a => {
              b.push(a[0].menu);
            });
          db.collection('table')
            .find({ _id: 요청.body.code })
            .toArray()
            .then(a => {
              b.push(a[0].table[요청.body.table - 1]);
              setTimeout(() => {
                응답.send(b);
              }, 500);
            });
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
    app.post('/Talkupdate', function (요청, 응답) {
      var obj = {};
      obj[`table.${요청.body.index}.talk`] = 요청.body.text;
      if (요청.body.text != '') {
        db.collection('table').updateOne(
          {
            _id: '1234',
          },
          {
            $push: obj,
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
      }
    });
    app.get('/Sync/:id', function (요청, res) {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      });
      var 문서;
      const menu = db.collection('menu').watch();
      menu.on('change', result => {
        문서 = result.updateDescription.updatedFields;
        res.write('event: test\n');
        res.write(`data: ${JSON.stringify(문서)}\n\n`);
      });
      // var 문서1;
      // const table = db.collection('table').watch();
      // table.on('change', result => {
      //   문서1 = result.updateDescription.updatedFields;
      //   res.write('event: test\n');
      //   res.write(`data: ${JSON.stringify(문서1)}\n\n`);
      // });

      var 문서2;
      const talk = db.collection('table').watch();
      talk.on('change', result => {
        문서2 = result.updateDescription.updatedFields;
        var n = Object.keys(문서2).toString();
        let num = Number(n.substr(6, 1));
        if (요청.params.id == num + 1) {
          res.write('event: test\n');
          res.write(`data: ${JSON.stringify(문서2)}\n\n`);
        }
      });

      // const pipeline = [
      //   { $match: { 'fullDocument.participants': socket.uid } },
      // ];

      // var 문서2;
      // const talk = db.collection('table').watch(pipeline);
      // talk.on('change', result => {
      //   문서2 = result
      //   res.write('event: test\n');
      //   res.write(`data: ${JSON.stringify(문서2)}\n\n`);
      // });
    });
    //owner=>customer 방향 싱크 반대방향싱크도 만들어야함(owner 수신이 필요함)
    app.post('/Orderlist', function (요청, 응답) {
      db.collection('table').updateOne(
        {
          _id: '1234',
          'table.index': 요청.body.index - 1,
        },
        {
          $push: {
            'table.$.orderlist': {
              $each: 요청.body.payload,
            },
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
    app.post('/Review', function (요청, 응답) {
      db.collection('menu').updateOne(
        {
          _id: '1234',
          'menu.menuname': 요청.body.menuname,
        },
        {
          $push: {
            'menu.$.review': {
              text: 요청.body.text,
              value: 요청.body.value,
            },
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
  }
);
