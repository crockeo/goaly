// Name        : routes.js
// Author(s)   : Cerek Hillen
// Date Created: 11/7/2014
// Date Changed: 11/7/2014
//
// Description:
//   This route serves the about page.

/////////////
// Imports //
var renderer = require('../renderer.js');

//////////
// Code //

// The request / response file.
function get(req, res) {
    renderer.renderAndSend('about.jade', req, res, {});
}

/////////////
// Exports //
module.exports.get = get;
