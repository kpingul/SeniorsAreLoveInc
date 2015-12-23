# SeniorsAreLoveInc
Author: Kirck Pingul

Date: 12/7/15

####Business Requirements

- Caregivers can seek job opportunities 
- Families can seek potential caregivers
- Allow communication between both family and caregiver

####System Requirements
- Login system with authentication/authorization
- Email Notifcations when registered to services
- Security validation done on server side
- Virtual Cloud Server located near Bay Area

####Technology Requirements

Client
- jQuery for client form validation in login/signup pages
- Angular for user dashboard (SPA/AJAX)

Server
- AWS EC2 instance ( Hosted on Virtual Cloud Server )
- Node.js (  Web Server )
- Express.js (Routing/RESTful)
- EJS ( Template Engine)
- Mongoose (odm) to create schema based model and query MongoDB
- Middleware 
	- Parsers(Body, Cookies)
	- Password hashing(Bcrypt)
	- Authentication (Passport.js)
	- Sessions(Express.sessions)

Cloud Services
- MongoDB (Document based) Store users using MongoLab (PAAS)
- Amazon Web Services EC2 ( Virtual Cloud server)
- Cloudinary  ( Store images / manipulation )
- MongoDB (Document based) Store users using MongoLab (PAAS)
- Amazon Web Services EC2 ( Virtual Cloud server)
- Cloudinary  ( Store images / manipulation )
- SendGrid ( SMTP Email Cloud Services )

####Design 
Application Architecture ( https://wireframe.cc/0ba0sQ )
