var mongoose = require('mongoose');
var crypto = require('crypto');

var UserSchema = new mongoose.Schema({
  name : {type:String,required : true},
 	email: {type: String, lowercase: true, unique: true,required : true},
 	mobile: {type: String, unique: true,required : true},
 	dob:{type: String,required : true},
    address:{type:String,required : true},
    password : {type:String,required : true},
    role:{type:String,required : true}
});


UserSchema.methods.setPassword = function(textpassword){
	var algorithm = 'aes-256-ctr';
  var password = 'd6F3Efeq';
  var cipher = crypto.createCipher(algorithm,password);
  var crypted = cipher.update(textpassword,'utf8','hex');
  crypted += cipher.final('hex');
  this.password=crypted;
};

UserSchema.methods.validPassword = function(user_textpass,textpassword) {
	var algorithm = 'aes-256-ctr';
  var password = 'd6F3Efeq';
	var decipher = crypto.createDecipher(algorithm,password);
  var dec = decipher.update(textpassword.toString(),'hex','utf8');
  dec += decipher.final('utf8');
  console.log(dec);
  console.log(user_textpass);
  
  return user_textpass === dec;
};

mongoose.model('user', UserSchema);


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

