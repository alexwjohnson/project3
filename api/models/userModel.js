const mongoose = require('mongoose'); 

const UserSchema = mongoose.Schema({
    name: {
      type: String, 
      required: [true, 'Name required']
    }, 
    email: {
      type: String, 
      required: [true, 'Email required'],
      unique: true
    }, 
    password: {
      type: String, 
      required: [true, 'Please add a password']
    }, 
                                                                  //ToDo add admin perms
},{
  tmestamps: true
})

module.exports = mongoose.model('User', UserSchema);