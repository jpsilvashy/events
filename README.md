## Event Stream
### Node.js, Socket.io, Redis

An event bus and relay written in Node

### Running

First be sure that Redis is running, then install the npm packages and start the server:

    npm start

Connect to the redis server on Redis-to-go like this:

    redis-cli -h hostname -p port -a password

To publish events to the channel (which is hard-coded as "events.*")

    PUBLISH events.foo '{ "key" : "val" }'
    PUBLISH events.bar '{ "key" : "val", "message" : "Any valid JSON" }'

If setting up a new deployment, be sure to set this env var:

    jitsu env set REDISTOGO_URL redis://redistogo:password@host:port

### Sending events

You can send any arbitraty event to any channel, it should be rebroadcast to any listeners:

#### POST

You can use HTTP to post events to the event listener, here is an example:

```
http post localhost:8080 channel=events.foo message=test -v
```

#### Request
```
POST / HTTP/1.1
Accept: application/json
Accept-Encoding: gzip, deflate, compress
Content-Length: 44
Content-Type: application/json; charset=utf-8
Host: localhost:8080
User-Agent: HTTPie/0.7.2

{
    "channel": "events.foo",
    "message": "test"
}
```

#### Response

```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 2
Content-Type: text/plain
Date: Mon, 24 Feb 2014 21:35:05 GMT
X-Powered-By: Express

OK
```


#### Dependencies

 - Redis
 - Node.js
 - Socket.io

### Issues

Still needs tests, should have been TDD