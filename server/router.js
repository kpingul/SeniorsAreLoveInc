'use strict';
var UserModel = require('./models/Users'),
    cloudinary = require('cloudinary'),
    multer     = require('multer'),
    upload 		 = multer({dest: './uploads/'}),
		passport = require('passport');

module.exports = function(app, config) {

	/* _____________________*/
	/* Global Configuration Routes */
	/* _____________________*/
	app.get('/', function(req, res){
  	res.render('index');
	});
	app.get('/login', function(req, res){
	  res.render('login', { message: req.flash('loginMessage') });
	});
	app.get('/logout', function(req, res){
  	req.logout();
  	res.redirect('/');
	});
	app.get('/signup', function(req, res) {
		res.render('signup');
	});

	cloudinary.config({ 
  	cloud_name: 'seniorsreloveinc', 
  	api_key: '869915418475518', 
  	api_secret: 'KA9ffHIuCK1gXN-c0UZzWRwfTpI' 
	});


	app.post('/api/images', upload.single('photo'), function (req, res) {
	 
	  cloudinary.uploader.upload(req.file.path, function(result) { 
	 	 if(result) {
	 	 	UserModel.findOne({_id: req.user._id}, function(err, user) {
	 	 		if(err) {
	 	 			res.sendStatus(err);
	 	 		}
	 	 		user.cgImageUrl = result.url;
	 	 		user.save(function(err) {
	 	 			if(err)
	 	 				console.log(err);
	 	 			res.redirect('/caregiver/dashboard/')
	 	 		});
	 	 	});
	 	 } 
		}, {angle: 'exif'});

	 });


	/* _____________________*/
	/* Auth Strategy routes  */
	/* _____________________*/


	app.post('/login', 
	  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
	  	function(req, res) {
	  		if( req.user.position == 'caregiver' ) {
	  			res.redirect('/caregiver/dashboard/');
	  		} else if ( req.user.position == 'family' ) {
	  			res.redirect('/family/dashboard/');
	  		}	  			
	  		
	  	});




	/* _____________________*/
	/* Public  API          */
	/* _____________________*/

	app.get('/api/caregivers', function(req, res) {
		UserModel.find({}, function(err, users) {
			var careGivers = [];
			if(err)
				res.sendStatus(err)
			users.forEach(function(user, index) {
				if(user.position == 'caregiver')
					careGivers.push(user);
			});
			res.send(careGivers);
			
		});
	});		

	app.get('/api/caregiverJobs', function(req, res) {
		UserModel.find({}, function(err, users) {
			var family = [];
			if(err)
				res.sendStatus(err)
			users.forEach(function(user, index) {
				if(user.position == 'family')
					family.push(user);
			});
			res.send(family);
			
		});
	});	


	/*
		A message sent to the family of the job position from
		a caregiver
	*/
	app.post('/api/caregiverjob/message/:id', function(req, res) {
		console.log(req.body);
		UserModel.findById({_id: req.params.id}, function(err, user) {
			if(err)
				res.sendStatus(err);
			console.log(user);
			user.family.patientMessages.push({
				fromId: req.body.fromId,
				fromFName: req.body.fromFName,
				fromLName: req.body.fromLName,
				message: req.body.message
			});

			user.save(function(err) {
				if(err)
					console.log(err);
				res.send(user);
			});
		});
	});	

	app.post('/api/caregiver/message/:id', function(req, res) {
		console.log(req.body);
		UserModel.findById({_id: req.params.id}, function(err, user) {
			if(err)
				res.sendStatus(err);
			console.log(user);
			user.cgMessages.push({
				fromId: req.body.fromId,
				fromFName: req.body.fromFName,
				fromLName: req.body.fromLName,
				message: req.body.message
			});

			user.save(function(err) {
				if(err)
					console.log(err);
				res.send(user);
			});
		});
	});

	/* _____________________*/
	/* Register  as Family */
	/* _____________________*/

	app.get('/register/family', function(req, res) {
		res.render('registerFamily', { message: req.flash('register') });
	});

	app.post('/register/family', function(req, res) {

			UserModel.findOne({email: req.body.email}, function(err, user) {
				if(err) {
					res.sendStatus(err);
				}
				if(user) {
					req.flash('register', 'Email Already Exists!')
					res.redirect('/register/family');
				} 
				if(!user) {
					var newFamily = new UserModel({
						position: 'family',
						email: req.body.email,
						fName: req.body.fName,
						lName: req.body.lName,
						contact: {
							city: req.body.city,
							zipCode: req.body.zipCode
						}
					});

					newFamily.password = newFamily.generateHash(req.body.password)
					newFamily.save(function(err) {
						if(err) res.sendStatus(err);
						
						req.login(newFamily, function(err) {
			        if (err) {
			          console.log(err);
			        }
							console.log('successfully registered ' + newFamily.fName);
			        return res.redirect('/family/dashboard/');
		      	});
						
					});
				}
					
			});
	});

	/* _____________________*/
	/*  Family API       */
	/* _____________________*/
	app.get('/family/dashboard/', ensureAuthenticated, function(req, res) {
		res.render('dashboardFamily', {user: JSON.stringify(req.user._id) });
	});

		app.get('/api/family/:id', ensureAuthenticated, function(req, res) {
		UserModel.findOne({_id: req.params.id}, function(err, user) {
			if(err)
				res.sendStatus(err);
			res.send(user);
		});
	});

	app.post('/api/family/:id', ensureAuthenticated, function(req, res) {
		UserModel.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, user) {
			if(err)
				res.sendStatus(err);
			res.send(user);
		});
	});			


	/* _____________________*/
	/* Register  as Caregiver */
	/* _____________________*/

	app.get('/register/caregiver', function(req, res) {
		res.render('registerCaregiver',  { message: req.flash('register') });
	});

	app.post('/register/caregiver', function(req, res) {

		UserModel.findOne({email: req.body.email}, function(err, user) {
			if(err) {
				res.sendStatus(err);
			}
			if(user) {
				req.flash('register', 'Email Already Exists!')
				res.redirect('/register/caregiver');
			} 
			if(!user) {
				var newCareGiver = new UserModel({
					position: 'caregiver',
					email: req.body.email,
					fName: req.body.fName,
					lName: req.body.lName,
					contact: {
						city: req.body.city,
						zipCode: req.body.zipCode
					}
				});

				newCareGiver.password = newCareGiver.generateHash(req.body.password)
				newCareGiver.save(function(err) {
					if(err) res.sendStatus(err);
					
					req.login(newCareGiver, function(err) {
		        if (err) {
		          console.log(err);
		        }
						console.log('successfully registered ' + newCareGiver.fName);
		        return res.redirect('/caregiver/dashboard/');
	      	});
					
				});
			}
				
		});

	});

	/* _____________________*/
	/*  Caregiver API       */
	/* _____________________*/
	app.get('/caregiver/dashboard/', ensureAuthenticated, ensureCareGiver, function(req, res) {
		res.render('dashboardCareGiver', {user: JSON.stringify(req.user._id) });
	});


	app.get('/api/caregiver/:id', ensureAuthenticated, function(req, res) {
		UserModel.findOne({_id: req.params.id}, function(err, user) {
			if(err)
				res.sendStatus(err);
			res.send(user);
		});
	});

	app.post('/api/caregiver/:id', ensureAuthenticated, function(req, res) {
		UserModel.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, user) {
			if(err)
				res.sendStatus(err);
			res.send(user);
		});
	});	
	app.post('/api/caregiver/experience/:id', ensureAuthenticated, function(req, res) {

		UserModel.findById({ _id: req.params.id}, function(err, user) {
			if(err)
				res.sendStatus(err);

			user.yrsExp = req.body.yrsExp;
			user.workExp.push({
				title: req.body.title,
				employer: req.body.employer,
				start: req.body.start,
				end: req.body.end,
				desc: req.body.desc
			});
			user.save(function(err) {
				if(err)
					console.log(err);
				res.send(user);
			});
		})

	});
	app.post('/api/caregiver/services/:id', ensureAuthenticated, function(req, res) {

		UserModel.findById({_id: req.params.id}, function(err, user) {
			if(err)
				res.sendStatus(err);
			user.hourRate = req.body.hourRate;
			user.careType = req.body.careType;
			user.skills = req.body.skills;
			user.save(function(err) {
				if(err)
					console.log(err);
				res.send(user);
			});
		});		
	});



	function ensureCareGiver(req, res, next) {
		if(req.user.position == 'caregiver') {
			return next();
		}
		console.log(req.url);
		res.redirect(req.url);
	}


	// Middleware that checks to see if the user is authenticated
	// using the req object that contains  the isAuthenticated
	// method. If the user is authenticated, next is called which
	// executes out of the method and goes along the other middlewares. But if not,
	// the user is redirected to the login page
	function ensureAuthenticated(req, res, next) {
		  if (req.isAuthenticated()) { 
		  	return next(); 
		  }
		  res.redirect('/login');
		}

};


