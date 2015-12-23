'use strict';

module.exports = (function() {
  return {
    email: 'contact@seniorsareloveinc.co',
    subject: 'Thanks for joining the team at SeniorsAreLoveInc.com!',
    setHtml: function(fName) {
      var message = "<p>Welcome " + fName + ",</p><br/><p>We are glad to hear that you've chosen us as your caring services. If you have any questions about our services, please feel free to call us directly at 415-240-3729.</p><br/><p>CEO and Founder,</p><p>Dantes Gonzales</p>";
      return message;
    }
  }
}());