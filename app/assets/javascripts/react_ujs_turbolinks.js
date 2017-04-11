// Modified Version of:
// https://github.com/reactjs/react-rails/blob/v1.11.0/lib/assets/javascripts/react_ujs_turbolinks.js
;(function(document, window) {
  window.ReactRailsUJS.Turbolinks = {
    // Turbolinks 5+ got rid of named events (?!)
    setup: function() {
      ReactRailsUJS.handleEvent('DOMContentLoaded', function() {window.ReactRailsUJS.mountComponents()});
      ReactRailsUJS.handleEvent('turbolinks:render', function() {window.ReactRailsUJS.mountComponents()});
      // ReactRailsUJS.handleEvent('turbolinks:load', function() {window.ReactRailsUJS.mountComponents()});
      ReactRailsUJS.handleEvent('turbolinks:before-render', function() {window.ReactRailsUJS.unmountComponents()});
    }
  };
})(document, window);
