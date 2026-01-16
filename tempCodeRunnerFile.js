const Redis = require('ioredis')

const redis = new Redis()

const runthis=async()=>{
  await redis.set('name','sanskar')
  console.log(await redis.get('name'))
}


runthis()