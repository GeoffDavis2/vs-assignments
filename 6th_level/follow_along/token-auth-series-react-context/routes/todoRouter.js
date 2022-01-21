const express = require("express");
const todoRouter = express.Router();
const Todo = require("../models/todo");



todoRouter.post("/", (req, res, next) => {
    req.body.user = req.user._id;
    const todo = new Todo(req.body);
    todo.save(function (err, newTodo) {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(201).send(newTodo);
    });
});

todoRouter.get("/", (req, res, next) => {
    Todo.find((err, todos) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).json(todos);
    });
});

// todoRouter.get("/:todoId", (req, res, next) => {
    //     Todo.findById(req.params.todoId, (err, todo) => {
        //         if (err) {
//             res.status(500);
//             return next(err);
//         } else if (!todo) {
    //             res.status(404)
//             return next(new Error("No todo item found."));
//         }
//         return res.status(200).json(todo);
//     });
// });

todoRouter.get("/user", (req, res, next) => {
    Todo.find({user: req.user._id}, (err, todos) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).json(todos);
    });
});


todoRouter.put("/:todoId", (req, res, next) => {
    Todo.findOneAndUpdate({_id: req.params.todoId, user:req.user._id}, req.body, { new: true }, (err, todo) => {
        if (err) {
            console.log("Error");
            res.status(500);
            return next(err);
        }
        return res.status(202).json(todo);
    }
    );
});

todoRouter.delete("/:todoId", (req, res, next) => {
    Todo.findOneAndDelete({ _id: req.params.todoId, user: req.user._id }, (err, todo) => {
        if (err) {
            console.log("**********************************************");
            res.status(500);
            return next(err);
        }
        return res.status(202).json(todo);
    });
});

module.exports = todoRouter;
