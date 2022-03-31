var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var b_todoSchema = new Schema ({
    username : String,
    todo: String ,
    isDone: Boolean,
    hasAttachment: Boolean 
});
var B_todos = mongoose.model('B_todos', b_todoSchema);
   
module.exports =  B_todos;