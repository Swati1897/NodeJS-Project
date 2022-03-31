
var Todos = require('../models/todoModel');
var B_todos = require('../models/b_todosModel');

module.exports = function(app){
      app.get('/api/setupTodos', function(req, res){
         
          const starterTodos =[
              {
              username: 'test',
              todo: 'buy apple',
              isDone : false,
              haAttachment: false
            },
            {
                username: 'test', 
                todo: 'buy milk',
                isDone : false,
                haAttachment: false
            },
            {
                username: 'test',
                todo: 'buy mango',
                isDone : false,
                haAttachment: false
            }
          ];
     Todos.create(starterTodos,function (err,results)
          {
              res.send(results);
             });
      });
      app.get('/api/setupB_todos', function (req, res) {

        const starterB_todos =[
            {
                username: 'test',
                todo: '123',
                isDone : false,
                haAttachment: false
              },
              {
                  username: 'test', 
                  todo: '456',
                  isDone : false,
                  haAttachment: false
              },
              {
                  username: 'test',
                  todo: '678',
                  isDone : false,
                  haAttachment: false
              }
        ];
     B_todos.create(starterB_todos,function (err,results)
       {
            res.send(results);

        });
    });

}
