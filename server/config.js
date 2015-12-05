'use strict';

module.exports = (function() {
	return {
		development: {
			db: {
				port: process.env.PORT || 3000,
				url:'mongodb://kpingul:spacejam23@ds057944.mongolab.com:57944/users'
			}
		}
	};

}());
