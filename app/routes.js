var mongoose = require('mongoose');
var User = mongoose.model('user');
var Class = mongoose.model('class');
var Subject = mongoose.model('subject');
var TimeTable = mongoose.model('timetabledetail');
var validator = require('validator');


// expose the routes to our app with module.exports
module.exports = function(app) {

app.post('/insert/subject', function(req, res, next){
  var sub=[{'name':'english'},
      {'name':'hindi'},
      {'name':'maths'},
      {'name':'computer'},
      {'name':'computer science'},
      {'name':'social study'},
      {'name':'physics'},
      {'name':'chemistry'},
      {'name':'general knowledge'},
      {'name':'physical education'}
      ];
  for (var i = sub.length - 1; i >= 0; i--) {
    var Subject_obj = new Subject(sub[i]);  
      Subject_obj.save(function (err, data) {  
          if (err) {
              console.log(err);
          }
          console.log(data);
      });
  }
  res.json('ok');
});
app.post('/insert/class', function(req, res, next){
  var sub=[{'name':'11th','subject':['58d40c5c780d19130049b0c0','58d40c5c780d19130049b0c7','58d40c5c780d19130049b0c2','58d40c5c780d19130049b0c9','58d40c5c780d19130049b0c3','58d40c5c780d19130049b0c5']},
        {'name':'12th','subject':['58d40c5c780d19130049b0c0','58d40c5c780d19130049b0c7','58d40c5c780d19130049b0c2','58d40c5c780d19130049b0c9','58d40c5c780d19130049b0c3','58d40c5c780d19130049b0c5']}
      ];
  for (var i = sub.length - 1; i >= 0; i--) {
    var Class_obj = new Class(sub[i]);  
    Class_obj.save(function (err, data) {  
        if (err) {
            console.log(err);
        }
        console.log(data);
    });   
  }
  res.json('ok');
});

// var Class_obj = new Class({'name':'1st'});  
// Class_obj.save(function (err, data) {  
//     if (err) {
//         console.log(err);
//     }
//     console.log(data);
// });
// var Subject_obj = new Subject({'name':'english',class:'58d1727f7dfa071198fd522b'});  
// Subject_obj.save(function (err, data) {  
//     if (err) {
//         console.log(err);
//     }
//     console.log(data);
// });

app.post('/register', function(req, res, next){
    
    // if(!req.body.name && !req.body.email && !req.body.mobile && !req.body.password && !req.body.dob && !req.body.address && !req.body.role)
    // {
    //   return res.status(400).json({message: 'Please fill out all fileds'});

    // }
 if(!req.body.name){
    return res.status(400).json({message: 'Please fill out name'});
  }

  if(!req.body.email){
    return res.status(400).json({message: 'Please fill out email'});
  }

  if (!validator.isEmail(req.body.email)) {
    return res.status(400).json({message: 'Please enter valid email'});

  }

  if(!req.body.mobile){
    return res.status(400).json({message: 'Please fill out mobile'});
  }

  if(!req.body.password){
    return res.status(400).json({message: 'Please fill out password'});
  }

  if(!req.body.dob){
    return res.status(400).json({message: 'Please fill out dob'});
  }

  if(!req.body.address){
    return res.status(400).json({message: 'Please fill out address'});
  }

  if(!req.body.role){
    return res.status(400).json({message: 'Please fill out role'});
  }

  User.findOne({ email: req.body.email }, function (err, user) {  //validate
    if (err) { 
      console.log(err);
      return res.status(500).json({message: 'Somethin want worng!'});
    } else {
      if (user) {
        return res.status(400).json({message: 'Email already register'});
      } else {
        //validate mobile
        User.findOne({ mobile: req.body.mobile }, function (err, user2) {
          if (err) { 
            console.log(err);
            return res.status(500).json({message: 'Somethin want worng!'});
          } else {
            if (user2) {
              return res.status(400).json({message: 'Mobile already register'});
            } else {
              //register user 
              var user_save = new User();
              user_save.name = req.body.name;
              user_save.email = req.body.email;
              user_save.mobile = req.body.mobile;
              user_save.setPassword(req.body.password);
              user_save.dob = req.body.dob;
              user_save.address = req.body.address;
              user_save.role = req.body.role;
              user_save.save(function (err){
                if(err){
                  console.log(err);
                  return res.status(500).json({message: 'Somethin want worng!'});
                }
                res.status(200).json(user_save);
              });
            }
          } //end of else validate mobile
        });
      }
    } //end of else validate email    
  });

    
});

app.post('/login', function(req, res, next){
    
    // if(!req.body.email && !req.body.password )
    // {
    //   return res.status(400).json({message: 'Please fill out alll fileds'});

    // }
   
  
    if(!req.body.email){
      return res.status(400).json({message: 'Please fill out email'});
    }

    if (!validator.isEmail(req.body.email)) {
      return res.status(400).json({message: 'Please enter valid email'});

    }


    if(!req.body.password){
      return res.status(400).json({message: 'Please fill out password'});
    }


    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) { 
        console.log(err);
        return res.status(500).json({message: 'Somethin want worng!'});
      }
      if (!user) {
            return res.status(400).json({message: 'Incorrect email.'});
      }
        //console.log(user);
      if (!user.validPassword(req.body.password,user.password)) {
         return res.status(400).json({message: 'Incorrect password.'});
      }
     res.status(200).json(user);
        
    });
});


app.post('/class/data', function(req, res, next){
  Class.find().sort({'name': 'asc','_id':'desc'}).populate('subject').exec(function (err, data) {
    if (err) { 
      console.log(err);
      return res.status(500).json({message: 'Somethin want worng!'});
    } else {
      res.status(200).json(data);
    }
  });
});

app.post('/get/subject/class', function(req, res, next){ 
  if(!req.body.user_id || !req.body.user_role ){
    return res.status(400).json({message: 'User id and user role required'});
  }
  TimeTable.find({ 'user': req.body.user_id,'role':req.body.user_role }, function (err, docs){
    if (err) { 
    console.log(err);
    return res.status(500).json({message: 'Somethin want worng!'});
    }
    res.status(200).json(docs);

  });
}); 


app.post('/save/subject/class', function(req, res, next){
  if(!req.body.data ){
    return res.status(400).json({message: 'Data is required'});
  }
  var sub=req.body.data;
  for (var i = sub.length - 1; i >= 0; i--) {
  //var TimeTable_obj = new TimeTable(sub[i]);
  TimeTable.remove({user:sub[i].user,role:sub[i].role},function (err, data) {
    if (err) {
        console.log(err);
        return res.status(500).json({message: 'Something want worng!'});
      }


      //insert
          var TimeTable_obj = new TimeTable(sub[this.i]);
            TimeTable_obj.save(function (err, data) {  
              if (err) {
                console.log(err);
                return res.status(500).json({message: 'Something want worng!'});
              }
              console.log(data);
          }); 

      //console.log(data);  
  }.bind( {i: i} ));
  }
  return res.status(200).json({message: 'Data inserted/updated successfully'});
});

// app.post('/save/subject/class', function(req, res, next){
//   if(!req.body.data ){
//     return res.status(400).json({message: 'Data is required'});
//   }
//   var sub=req.body.data;
//   for (var i = sub.length - 1; i >= 0; i--) {
//   //var TimeTable_obj = new TimeTable(sub[i]);
//   TimeTable.findOne({user:sub[i].user,role:sub[i].role,class:sub[i].class,subject:sub[i].subject},function (err, data) {
//     if (err) {
//         console.log(err);
//         return res.status(500).json({message: 'Something want worng!'});
//       }
//       if (data) {  //update 
//           TimeTable.update({_id: data.id}, sub[this.i], {upsert: true}, function (err, place) {
//             if (err) {
//                   console.log(err);
//                   return res.status(500).json({message: 'Something want worng!'});
//                 }
//                 console.log(place);
//           });
//         } else { //insert
//           var TimeTable_obj = new TimeTable(sub[this.i]);
//             TimeTable_obj.save(function (err, data) {  
//               if (err) {
//                 console.log(err);
//                 return res.status(500).json({message: 'Something want worng!'});
//               }
//               console.log(data);
//           }); 
//         }

//       //console.log(data);  
//   }.bind( {i: i} ));
//   }
//   return res.status(200).json({message: 'Data inserted/updated successfully'});
// });

// app.post('/get/timetable', function(req, res, next){
//   if(!req.body.data ){
//     return res.status(400).json({message: 'Data is required'});
//   }
//   var sub=req.body.data;
//   var searchRole=[],searchClass=[],searchSubject=[];
//   for (var i = 0; i < sub.length; i++) {
//     if(sub[i].role == 'Student')var role= "Teacher";
//     if(sub[i].role == 'Teacher')var role= "Student";
//     searchRole.push(role);
//     searchClass.push(sub[i].class);
//     searchSubject.push(sub[i].subject);
//   }
//   TimeTable.find({role:searchRole,class:searchClass,subject:searchSubject}).populate('user class subject')
//   .exec(function (err, result) {
//        if (err) {
//         console.log(err);
//         return res.status(500).json({message: 'Something want worng!'});
//       }
//     return res.status(200).json(result);  
//   });
// }); 

app.post('/get/timetable', function(req, res, next){
  if(!req.body.data ){
    return res.status(400).json({message: 'Data is required'});
  }
  var senddata=[];
  var sub=req.body.data;
  var LastId=0;
  var arrayCount=(sub.length);
  //console.log(LastId);
  for (var i = 0; i < sub.length; i++) {
    if(sub[i].role == 'Student')
    var role= "Teacher";
    if(sub[i].role == 'Teacher')
    var role= "Student";
    TimeTable.findOne({role:role,class:sub[i].class,subject:sub[i].subject}).populate('user class subject')
    .exec(function (err, result) {
         if (err) {
          console.log(err);
          return res.status(500).json({message: 'Something want worng!'});
        } else {
            senddata[this.i]=result;
            LastId++;
            console.log("(this.i:"+this.i+")(LastId:"+LastId+")(arrayCount:"+arrayCount+")");
            if(LastId == arrayCount) {
                return res.status(200).json(senddata);  
            }  
        }
        
    }.bind({i: i}));
  }
});  





};