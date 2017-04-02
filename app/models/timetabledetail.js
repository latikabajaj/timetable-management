var mongoose = require('mongoose');

var TimeTableSchema = new mongoose.Schema({
   user: { type: mongoose.Schema.Types.ObjectId, ref: 'user',required : true },
   role: {type:String,required : true},
   class: { type: mongoose.Schema.Types.ObjectId, ref: 'class',required : true },
   subject: { type: mongoose.Schema.Types.ObjectId, ref: 'subject',required : true },

 
});

mongoose.model('timetabledetail', TimeTableSchema);

// var mongoose = require('mongoose');

// module.exports = mongoose.model('user', {
//     name : {type:String,required : true},
//  	email: {type: String, lowercase: true, unique: true,required : true},
//  	mobile: {type: Number, unique: true,required : true},
//  	dob:{type: Date,required : true},
//     address:{type:String,required : true},
//     password : {type:String,required : true},
//     role:{type:String,required : true}
// });

