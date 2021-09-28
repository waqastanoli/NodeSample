var redis = require("redis"),
    client = redis.createClient({
		host: 'redis',
		port: 6379
	});
    
module.exports = (req, res, next) => {
	console.log("in get cache");
	var requestSegments = req.originalUrl.split('/').filter((s) => { return s !== ''});
    
	if(requestSegments[3]){
		var redis_key = requestSegments[3]+':'+requestSegments[2];
	} else {
		var redis_key = requestSegments[1]+':'+requestSegments[2];
	}
		console.log(requestSegments)
	client.get(redis_key, function(err, reply) {				
		if(reply){
			if(requestSegments[3]){
				var cached_response  = 	{
					"success": true,
					"posts":JSON.parse(reply)
				};
			} else 			
			switch(requestSegments[1]){
				case 'user':
					var cached_response  = 	{
						"success": true,
						"user":JSON.parse(reply)
					};				
				break;
				case 'post':
					var cached_response  = 	{
						"success": true,
						"post":JSON.parse(reply)
					};				
				break
			}
			console.log('cached');
			res.status(200).send(cached_response);
			return;
		} 
		console.log('not cached');
		next();
		
		
	});
	

};