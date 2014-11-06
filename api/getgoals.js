// Name        : getgoals.js
// Author(s)   : Cerek Hillen
// Date Created: 11/6/2014
// Date Changed: 11/6/2014
//
// Description:
//   This API endpoints returns goals based on the GET query.

/////////////
// Imports //
var schema = require('../schema.js');

//////////
// Code //

function get(req, res) {
    var dbJSON = {};

    if (req.query.value         !== undefined)
        dbJSON.value        = req.query.value;
    if (req.query.userId        !== undefined)
        dbJSON.userId       = req.query.userId;
    if (req.query.isPublic      !== undefined)
        dbJSON.isPublic     = req.query.isPublic;
    if (req.query.subId         !== undefined)
        dbJSON.subId        = req.query.subId;
    if (req.query.made          !== undefined)
        dbJSON.made         = req.query.made;
    if (req.query.completed     !== undefined)
        dbJSON.completed    = req.query.completed;
    if (req.query.dateCompleted !== undefined)
        dbJSON.dateComplete = req.query.dateCompleted;

    schema.get.Goal.find(
        dbJSON
    ).sort({
        subId: 'descending'
    }).exec(function (err, goals) {
        if (err) {
            res.json({
                success: false,
                message: 'There was an error in looking up the goals.'
            });
        } else {
            res.json({
                success: true,
                goals  : goals
            })
        }
    })
}

/////////////
// Exports //
module.exports.get = get;
