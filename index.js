var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var url = require('url');
var levelup = require('levelup');
var jsonParser = bodyParser.json()
var utf8 = require('utf8');
var querystring = require('querystring');

var db = levelup('./mydb')

db.put('name', 'LevelUP', function (err) {
  if (err) return console.log('Error!', err)
})

var ops = [
    { type: 'put', key: '1', value:  { number: '3733002', last_name: 'машина1'   }, valueEncoding: 'json' }
  , { type: 'put', key: '2', value:  { number: '3733019', last_name: 'машина2'     }, valueEncoding: 'json' }
  , { type: 'put', key: '3', value:  { number: '3733020', last_name: 'машина3'    }, valueEncoding: 'json' }
  , { type: 'put', key: '4', value:  { number: '3733018', last_name: 'машина4'        }, valueEncoding: 'json' }
  , { type: 'put', key: '5', value:  { number: '3733019', last_name: 'машина5'    }, valueEncoding: 'json' }
  , { type: 'put', key: '6', value:  { number: '3733042', last_name: 'машина6'     }, valueEncoding: 'json' }
  , { type: 'put', key: '7', value:  { number: '3733043', last_name: 'машина7'      }, valueEncoding: 'json' }
  , { type: 'put', key: '8', value:  { number: '3733129', last_name: 'машина8'    }, valueEncoding: 'json' }
  , { type: 'put', key: '9', value:  { number: '3733130', last_name: 'машина9'      }, valueEncoding: 'json' }
  , { type: 'put', key: '10', value: { number: '3733132', last_name: 'машина10'       }, valueEncoding: 'json' }
  , { type: 'put', key: '11', value: { number: '3733139', last_name: 'машина11'    }, valueEncoding: 'json' }
  , { type: 'put', key: '12', value: { number: '3733133', last_name: 'машина12'    }, valueEncoding: 'json' }
  , { type: 'put', key: '13', value: { number: '3733176', last_name: 'машина13'   }, valueEncoding: 'json' }
  , { type: 'put', key: '14', value: { number: '3733199', last_name: 'машина14'      }, valueEncoding: 'json' }
  , { type: 'put', key: '15', value: { number: '3733200', last_name: 'машина15'      }, valueEncoding: 'json' }
  , { type: 'put', key: '16', value: { number: '3733201', last_name: 'машина16'     }, valueEncoding: 'json' }
  , { type: 'put', key: '17', value: { number: '3733248', last_name: 'машина17'      }, valueEncoding: 'json' }
  , { type: 'put', key: '18', value: { number: '3733249', last_name: 'машина18'     }, valueEncoding: 'json' }
  , { type: 'put', key: '19', value: { number: '3733250', last_name: 'машина19'      }, valueEncoding: 'json' }
  , { type: 'put', key: '20', value: { number: '3733274', last_name: 'машина20' }, valueEncoding: 'json' }
  , { type: 'put', key: '21', value: { number: '3733275', last_name: 'машина21'      }, valueEncoding: 'json' }
  , { type: 'put', key: '22', value: { number: '3733276', last_name: 'машина22'     }, valueEncoding: 'json' }
]

db.batch(ops, function (err) {
  if (err) return console.log('Ooops!', err)
  console.log('success')
})

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function (request, response) {
  response.send('Добро пожаловать! Выберите номер машины')
})

app.listen(app.get('port'), function () {
  console.log("Node app is running at localhost:" + app.get('port'))
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/*  "/students"
 *    GET
 */

app.get("/students", function (request, response) {
  response.send('Добро пожаловать! машина')
});

/*  "/students/:id"
 *    GET: find students by id
 *    POST: add students by id
 */

app.get("/students/:id", function (request, response) {
  var pId = request.params.id;
  if ((typeof pId != 'undefined')) {
    db.get(pId, function (err, value) {
      if (err) return response.send(err);
      response.send(value)
    })
  }
});

app.post("/students/:id", function (request, response) {
  var string = request.body.last_name.replace(/!/g, "\\x");
  var unescaped = querystring.unescape(string);
  var decstr = utf8.decode(eval('\'' + unescaped + '\''));
  console.log(decstr);
  var ops = [
    { type: 'put', key: request.params.id, value: { number: request.body.number, last_name: decstr }, valueEncoding: 'json' }
  ]
  db.batch(ops, function (err) {
    if (err) return response.send('Error')
    response.status(201).send('Success');
  })
});

app.delete("/students/:id", function (request, response) {
});


