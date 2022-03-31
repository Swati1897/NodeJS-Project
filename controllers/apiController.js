var Todos = require('../models/todoModel');
var bodyParser = require('body-parser');
var B_todos = require('../models/b_todosModel');

module.exports = function (app) {

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

 app.get('/api/todos/:uname', async (req, res) =>{
         try { 
          const  backup_data = B_todos();
         Todos.find({ username: req.params.uname }, function (err,todos) {
            if (err)
            throw err;
             res.status(200).json({ Count: todos.length, Result: todos , Backup_id: backup_data._id });
              }); 
        }catch(e){
          res.status(500).send(err); 
        }
     });

     app.get('/api/todo/:id', async (req, res) => {
      try{ 
             Todos.findById({ _id: req.body.id }, function (err) {
              if (err)
              throw err;
              res.send("id's");
                });
               }catch(e){
                 res.status(500).send(e);
                }
              });

  app.post('/api/todo', async(req, res)=> {
    try {
           if (req.body.id) {
          Todos.findByIdAndUpdate(req.body.id, function (err) {
                  if (err)
                   throw err;
                 });
                }
               else {
                 const newTodo = Todos({
                      username:'test',
                      todo: req.body.todo,
                      isDone: req.body.isDone,
                      hasAttachment: req.body.hasAttachment
                   });
                newTodo.save(function (err) {
                   if (err)
                    throw err;
                 res.status(200).json({ Result:'success', _id: newTodo._id });
              });
            }
          }catch(err){
            
                res.status(500).send(err);
             }
          });
  // delete 
  app.delete('/api/todo/delete', async (req, res ) =>{
    const  backup_data =B_todos();
    try{
                console.log("find id", req.body);
                   if (req.body._id) 
                   {
                       let todos = await Todos.findById(req.body._id);
                          console.log('todos :>> ', todos);
                                console.log( "Find data !");
                              
              const  backup_data = await B_todos.create({
                            username:todos.username,
                            todo:todos.todo, 
                            isDone:todos.isDone,
                            hasAttachment:todos.hasAttachment });
                      console.log(backup_data);
                    }
                    let todos = await Todos.findByIdAndRemove(req.body._id);
                                  console.log('todos:>>',todos);
                                  console.log('data is deleted !');
                 }
                catch(err)
              {
                res.status(500).send(err);
            } 
         res.status(200).json({backup_data:'Successfully Done', Data:backup_data});
      });
}
