var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to the mongoose database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://test:test@ds159344.mlab.com:59344/todotest');

//create schema
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);


// var data = [{ item: 'learn node'}, { item: 'run node'}, { item: 'help juniors'}];
var urlencodedParser = bodyParser.urlencoded({extended:false});


module.exports = function(app){

app.get('/todo', function(req, res){
    // get data from mongodb
    Todo.find({}, function(err, data){
        if(err) throw err;

    res.render('todo', { todos: data });
    });
});
app.post('/todo', urlencodedParser, function(req, res){
    //get data and add to mongodb
    var newTodo = Todo(req.body).save(function(err, data){
        if(err) throw err;
        res.json(data);
    });
    // data.push(req.body);
});
app.delete('/todo/:item', function(req, res){
    //dalete item from mongodb
    Todo.find({item:req.params.item.replace(/\-/g, ' ')}).remove(function(err,data){
        if(err) throw err;
        res.json(data);
    });
    // data = data.filter(function(todo){
    //     return todo.item.replace(/ /g, '-') !== req.params.item;
    // });
});

};
