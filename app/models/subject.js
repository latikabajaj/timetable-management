var mongoose = require('mongoose');

var SubjectSchema = new mongoose.Schema({
  name : {type:String,required : true}
});

mongoose.model('subject', SubjectSchema);
