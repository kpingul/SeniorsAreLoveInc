'use strict';
var CareGiverModel 	= require('./models/CareGiver'),
    FamilyModel 		= require('./models/Family'),
    MessageModel 		= require('./models/Message'),
    multer     			= require('multer'),
    upload 		 			= multer({dest: './uploads/'}),
		passport 				= require('passport');

module.exports = function(app, config) {

	/* ___________________________*/
	/* 				Main  Routes 				*/
	/* __________________________*/

	app.use('/', require('./routes/main').index);
	app.use('/login', require('./routes/main').login);
	app.use('/loginUser', require('./routes/main').loginUser);
	app.use('/logoutUser', require('./routes/main').logoutUser);
	app.use('/signup', require('./routes/main').signUp);
	app.use('/uploadImages', require('./routes/main').uploadImages);
	app.use('/register/family', require('./routes/main').registerFamily);
	app.use('/register/caregiver', require('./routes/main').registerCareGiver);
	

	/* _____________________*/
	/* 			Public  API     */
	/* _____________________*/

	app.use('/api', require('./routes/api').getCareGivers);
	app.use('/api', require('./routes/api').getCareGiverJobs);

	/*
		A message sent to the family of the job position from
		a caregiver
	*/

	app.get('/api/messages', function(req, res) {
		MessageModel
			.find({recipient: req.user.id})
			.exec(function(err, messages) {
				if(err)
					console.log(err);
				res.send(messages);
			})
	});
	app.post('/api/messages', function(req, res) {
		var newMessage = new MessageModel({
			from: req.user.id,
			fName: req.user.fName,
			lName: req.user.lName,
			recipient: req.body.recipientId,
			message: req.body.message	
		});
	
		newMessage.save(function(err) {
			if(err)
				console.log(err);
			res.send({success: true});
		});
	});	
	/* _____________________*/
	/* Register  as Family */
	/* _____________________*/



	app.post('/register/family', function(req, res) {

			FamilyModel.findOne({email: req.body.email}, function(err, user) {
				if(err) {
					res.sendStatus(err);
				}
				if(user) {
					req.flash('register', 'Email Already Exists!')
					res.redirect('/register/family');
				} 
				if(!user) {
					var newFamily = new FamilyModel({
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
		FamilyModel.findOne({_id: req.params.id}, function(err, user) {
			if(err)
				res.sendStatus(err);
			res.send(user);
		});
	});

	app.post('/api/family/:id', ensureAuthenticated, function(req, res) {
		FamilyModel.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, user) {
			if(err)
				res.sendStatus(err);
			res.send(user);
		});
	});			


	/* _____________________*/
	/* Register  as Caregiver */
	/* _____________________*/



	app.post('/register/caregiver', function(req, res) {

		CareGiverModel.findOne({email: req.body.email}, function(err, user) {
			if(err) {
				res.sendStatus(err);
			}
			if(user) {
				req.flash('register', 'Email Already Exists!')
				res.redirect('/register/caregiver');
			} 
			if(!user) {
				var newCareGiver = new CareGiverModel({
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
		CareGiverModel.findOne({_id: req.params.id}, function(err, user) {
			if(err)
				res.sendStatus(err);
			res.send(user);
		});
	});

	app.post('/api/caregiver/:id', ensureAuthenticated, function(req, res) {
		CareGiverModel.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, user) {
			if(err)
				res.sendStatus(err);
			res.send(user);
		});
	});	
	app.post('/api/caregiver/experience/:id', ensureAuthenticated, function(req, res) {

		CareGiverModel.findById({ _id: req.params.id}, function(err, user) {
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

		CareGiverModel.findById({_id: req.params.id}, function(err, user) {
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


