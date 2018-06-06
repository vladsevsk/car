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
    { type: 'put', key: '1', value:  { itemprice: '9900', items: ‘Планшетный компьютер'   }, valueEncoding: 'json' }
  , { type: 'put', key: '2', value:  { itemprice: ‘200', items: ‘Чехол для телефона'     }, valueEncoding: 'json' }
  , { type: 'put', key: '3', value:  { item-price: '24990', items: ‘Ноутбук'    }, valueEncoding: 'json' }
  , { type: 'put', key: '4', value:  { itemprice: '10000', items: 'Смартфон'        }, valueEncoding: 'json' }
  , { type: 'put', key: '5', value:  { itemprice: '49900', items: ‘Моноблок'    }, valueEncoding: 'json' }
  , { type: 'put', key: '6', value:  { itemprice: ‘1900', items: ‘Кнопочный телефон'     }, valueEncoding: 'json' }
  , { type: 'put', key: '7', value:  { itemprice: '24000', items: 'кофемашина'      }, valueEncoding: 'json' }
  , { type: 'put', key: '8', value:  { itemprice: ‘3000', items: ‘Утюг'    }, valueEncoding: 'json' }
  , { type: 'put', key: '9', value:  { itemprice: '6900', items: ‘Микроволновая печь'      }, valueEncoding: 'json' }
  , { type: 'put', key: '10', value: { itemprice: '590', items: 'Монопод'       }, valueEncoding: 'json' }
  , { type: 'put', key: '11', value: { itemprice: '990', items: 'Флешкарта'    }, valueEncoding: 'json' }
  , { type: 'put', key: '12', value: { itemprice: '6000', items: 'Фотоаппарат'    }, valueEncoding: 'json' }
  , { type: 'put', key: '13', value: { itemprice: '23000', items: 'Видеокамера'   }, valueEncoding: 'json' }
  , { type: 'put', key: '14', value: { itemprice: '18000', items: 'Аудиоплеер'      }, valueEncoding: 'json' }
  , { type: 'put', key: '15', value: { itemprice: '20000', items: ‘Стиральная машина'      }, valueEncoding: 'json' }
  , { type: 'put', key: '16', value: { itemprice: ‘10000', items: 'Сабвуфер'     }, valueEncoding: 'json' }
  , { type: 'put', key: '17', value: { itemprice: '400', items: 'Наушники'      }, valueEncoding: 'json' }
  , { type: 'put', key: '18', value: { itemprice: '50', items: 'Ножницы'     }, valueEncoding: 'json' }
  , { type: 'put', key: '19', value: { itemprice: '500', items: ‘Капсулы кофе'      }, valueEncoding: 'json' }
  , { type: 'put', key: '20', value: { itemprice: '5000', items: 'Блендер' }, valueEncoding: 'json' }
  , { type: 'put', key: '21', value: { itemprice: '2000', items: 'Миксер'      }, valueEncoding: 'json' }
  , { type: 'put', key: '22', value: { itemprice: '13000', items: ‘Посудомоечная машина'     }, valueEncoding: 'json' }
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


