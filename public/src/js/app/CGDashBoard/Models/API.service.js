(function() {
	'use strict';
		angular.module('CGDashBoard')
			.factory('APIService', function ($http) {
					var API = {
						getCareGiver: getCareGiver,
						getCareGiverJobs: getCareGiverJobs,
						getJobProfile: getJobProfile,
						updateCareGiver: updateCareGiver,
						updateInformation: updateInformation,
						updateCareGiverServices: updateCareGiverServices,
						getMessages: getMessages,
						sendMessageToJob: sendMessageToJob
					};
				
					return API;

					/*
						GET METHOD 
					*/
					function getCareGiver(idOfCareGiver) {
						return $http
							.get('/api/caregiver/' + idOfCareGiver)
							.then(function(response) {
								return response.data;
							})
							.catch(handleError);
					};

					function getCareGiverJobs() {
							return $http
								.get('/api/caregiverJobs')
								.then(function(response) {
									var careGiverJobs = _.filter(response.data, function(job, index) {
		                return job.family.active == true;
		              });
									return careGiverJobs;
								})
								.catch(handleError);
					};

					function getJobProfile(idOfJobProfile) {
						return $http
							.get('/api/family/' + idOfJobProfile)
							.then(function(response) {
								return response.data;
							})
							.catch(handleError);
					}

					/*
						POST METHOD
					*/

					function updateCareGiver(idOfCareGiver, updatedValues) {
						return $http
							.post('/api/caregiver/' + idOfCareGiver, updatedValues)
							.then(function(response) {
								return response;
							})
							.catch(handleError);
					}			

					function updateInformation(idOfCareGiver, active, gender, address, city, zipcode) {
						var updatedCareGiver = {
            	cgActive: active,
            	gender: gender,
            	contact: {
              	address: address,
              	city: city,
              	zipCode: zipcode
            	}
          	};
          	
						return $http
							.post('/api/caregiver/' + idOfCareGiver, updatedCareGiver)
							.then(function(response) {
								return response;
							})
							.catch(handleError);
					}	
					function updateCareGiverServices(idOfCareGiver, updatedValues) {
						return $http
							.post('/api/caregiver/services/' + idOfCareGiver, updatedValues)
							.then(function(response) {
								return response;
							})
							.catch(handleError);
					}
					function getMessages() {
						return $http
							.get('/api/messages')
							.then(function(response) {
								return response.data;
							})
							.catch(handleError);

					}
					function sendMessageToJob(idOfJobProfile, message) {
						return $http
							.post('/api/messages', message)
							.then(function(response) {
								return response.data;
							})
							.catch(handleError);	
					}
					function handleError(error) {
						console.log(error);
					}
				
			})
	
}());