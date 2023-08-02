https://gist.github.com/huynhsamha/4dcf00a1fba96ae7f186b606b33b7e9c

## .env

```bash
MONGO_USER=<User Name>
MONGO_PW=<Password>
MONGO_HOST=<Host Domain>
MONGO_PORT=<DB Port>
MONGO_DB=<Database Name>

MONGO_URI="mongodb://${MONGO_USER}:${MONGO_PW}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=admin"
```

## Run

```bash
$ npm run local:up
$ npm start
```

## Test

`Channel ID`는 path param으로 처리하고, <br>
`User ID`는 query string으로 다루었습니다.

```bash
$ curl -X POST http://localhost:8080/channel/1?userId=1 \
  -H 'Content-Type: application/json' \
  -d '{"message": "message1"}'

$ curl -X POST http://localhost:8080/channel/1?userId=2 \
  -H 'Content-Type: application/json' \
  -d '{"message": "message2"}'

$ curl -X POST http://localhost:8080/channel/2?userId=3 \
  -H 'Content-Type: application/json' \
  -d '{"message": "message3"}'

$ curl -X POST http://localhost:8080/channel/2?userId=3 \
  -H 'Content-Type: application/json' \
  -d '{"message": "message4"}'
```

### Result

```mongosh
> use test

test> db.getCollectionNames()
< [ 'channel1_user1', 'channel2_user3', 'channel1_user2' ]

test> db.channel1_user1.find()
< {
  _id: ObjectId("64c9a68aa266b5453a2a2f32"),
  message: 'message1',
  timeline: 2023-08-02T00:42:50.989Z,
  __v: 0
}

test> db.channel1_user2.find()
< {
  _id: ObjectId("64c9a69aa266b5453a2a2f34"),
  message: 'message2',
  timeline: 2023-08-02T00:43:06.235Z,
  __v: 0
}

test> db.channel2_user3.find()
< {
  _id: ObjectId("64c9a69ea266b5453a2a2f36"),
  message: 'message3',
  timeline: 2023-08-02T00:43:10.272Z,
  __v: 0
}
{
  _id: ObjectId("64c9a6a3a266b5453a2a2f38"),
  message: 'message4',
  timeline: 2023-08-02T00:43:15.625Z,
  __v: 0
}
```
