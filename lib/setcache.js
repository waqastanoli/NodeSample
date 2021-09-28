var redis = require("redis"),
    client = redis.createClient({
		host: 'redis',
		port: 6379
	});
module.exports = (req, res, next) => {
	console.log('in set cache')
	var oldWrite = res.write,
      oldEnd = res.end;

  var chunks = [];

  res.write = function (chunk) {
    chunks.push(chunk);

    return oldWrite.apply(res, arguments);
  };

  res.end = function (chunk) {
    if (chunk)
      chunks.push(chunk);

    var body = Buffer.concat(chunks).toString('utf8');
	var requestSegments = req.originalUrl.split('/').filter((s) => { return s !== ''});
    
	switch (requestSegments[1]){
		case 'user':			
			var response = JSON.parse(body);			
			client.set(requestSegments[1]+":"+response.user.id, JSON.stringify(response.user), redis.print);
		break;
		case 'post':				
			var response = JSON.parse(body);						
			client.set(requestSegments[1]+":"+response.post.id, JSON.stringify(response.post), redis.print);
		break;
	}
    oldEnd.apply(res, arguments);
  };		
	next();
};