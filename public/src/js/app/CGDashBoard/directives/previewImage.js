(function() {
  'use strict';
  angular.module('CGDashBoard')
    .directive('previewImage', previewImage)

  function previewImage() {
    var directive = {
      restrict: 'A',
      link: link
    };

    return directive;

    function link(scope, elem, attrs) {

      if (attrs.data) {

        //*bottleneck
        //use angular or jquery to manipulate DOM
        document.getElementById(attrs.data.split(" ")[0]).onchange = function() {
          var reader = new FileReader();

          reader.onload = function(e) {
            // get loaded data and render thumbnail.
            document.getElementById(attrs.data.split(" ")[1]).src = e.target.result;
          };

          // read the image file as a data URL.
          reader.readAsDataURL(this.files[0]);
        };

      }

    }

  }
}());