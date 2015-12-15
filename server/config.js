'use strict';

module.exports = (function() {
	return {
		development: {
			db: {
				port: 3000,
				url:'mongodb://kpingul:spacejam23@ds057944.mongolab.com:57944/users'
			},
			cloudinary: {
				cloud_name: 'seniorsreloveinc',
				api_key: '869915418475518',
				api_secret: 'KA9ffHIuCK1gXN-c0UZzWRwfTpI'
			}
		}
	};

}());
