describe('CGDashBoard Controller', function() {
	var $controller,
			$scope,
			$location,
			$q,
			mockAPIService,
			CGDashBoardCtrl;

	  beforeEach(function() {
	  	module('CGDashBoard');
	   	mockAPIService = {
  			getCareGiver: function getCareGiver(){},
				getCareGiverJobs: function getCareGiverJobs(){},
				getJobProfile: function getJobProfile(){},
				updateCareGiver: function updateCareGiver(){},
				updateCareGiverServices: function updateCareGiverServices(){},
				sendMessageToJob: function sendMessageToJob(){}
	  	};

	  	inject(function(_$rootScope_, _$controller_, _$location_, _$q_) {
	  		$scope = _$rootScope_.$new();
	  		$controller = _$controller_;
	  		$location = _$location_;
	  		$q = _$q_;
	  		APIService = mockAPIService;
	  		spyOn(APIService, "getCareGiver").and.callFake(function() {
		      var deferred = $q.defer();
		        deferred.resolve('Remote call result');
		        return deferred.promise;
		    });
		    spyOn(APIService, "getCareGiverJobs").and.callFake(function() {
		      var deferred = $q.defer();
		        deferred.resolve('Remote call result');
		        return deferred.promise;
		    });
	  	});

	  	CGDashBoardCtrl = $controller('CGDashBoardCtrl', {
	  		$scope: $scope,
	  		$location: $location,
	  		APIService: mockAPIService
	  	});
	  	
	  });

	  /* 
			Controller  and Services Definition
	  */
	  it('should have CGDashBoardCtrl defined', function() {
	  	expect(CGDashBoardCtrl).toBeDefined();
	  });	  
	  it('should have mockAPIService defined', function() {
	  	expect(APIService).toBeDefined();
	  });

	  /* 
		  Controller Variables 
	  */
	  it('should contain variables when CGDashBoardCtrl is instantiated', function() {
        expect($scope.workExp2).toBeFalsy();
        expect($scope.informationSubmitted).toBeFalsy();
        expect($scope.aboutSubmitted).toBeFalsy();
        expect($scope.expSubmitted).toBeFalsy();
        expect($scope.skillsExpSubmitted).toBeFalsy();
        expect($scope.accountSubmitted).toBeFalsy();
        expect($scope.photoSubmitted).toBeFalsy();

	  });

	  /*
			Method Definitions
	  */
	  it('should contain methods when CGDashBoardCtrl is instantiated', function() {
	  	expect($scope.init).toBeDefined();
	  	expect($scope.updateInformation).toBeDefined();
	  	expect($scope.updateAbout).toBeDefined();
	  	expect($scope.updateExperience).toBeDefined();
	  	expect($scope.updateAllExperience).toBeDefined();
	  	expect($scope.updateAccount).toBeDefined();
	  	expect($scope.updateSkillsExp).toBeDefined();
	  	expect($scope.addSkill).toBeDefined();
	  	expect($scope.removeSkill).toBeDefined();
	  });

	  /*
			Method Calls
	  */

	  it('should initialize data when init is called', function() {
			spyOn($scope, 'init').and.callThrough();
			$scope.init('543543543543');
	  });

	  it('should update the caregiver when updateInformation is called', function() {
	  	spyOn($scope, 'updateInformation').and.callThrough();
	  	$scope.updateInformation('male');

	  	expect($scope.cgActive).toBe(true);


	  });




});