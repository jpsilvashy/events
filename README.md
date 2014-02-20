## Event Stream
### Node.js, Socket.io, Redis

Connect to the redis server on Redis-to-go like this:

    redis-cli -h pearlfish.redistogo.com -p 9125 -a 486fe92f56169ff309a6dca4ef520d88

To publish events to the channel (which is hard-coded as "events.*")

    PUBLISH events.foo '{ "key" : "val" }'
    PUBLISH events.bar '{ "key" : "val", "message" : "Any valid JSON" }'

If setting up a new deployment, be sure to set this env var:

    jitsu env set REDISTOGO_URL redis://redistogo:486fe92f56169ff309a6dca4ef520d88@pearlfish.redistogo.com:9125

#### Dependencies

 - Redis
 - Node.js
 - Socket.io
