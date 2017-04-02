var mongoose = require('mongoose');

var ClassSchema = new mongoose.Schema({
  name : {type:String,required : true},
  subject:[{ type: mongoose.Schema.Types.ObjectId, ref: 'subject',required : true}]

});

mongoose.model('class', ClassSchema);

// var mongoose = require('mongoose');

// module.exports = mongoose.model('class', {
//    name : String,
// });

