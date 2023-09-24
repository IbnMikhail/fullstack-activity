import express from 'express';
import cors from "cors"
import sql from "./db.js"

const app = express();

//middleware
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173"] }));


//ROUTES
// CREATE A TODO
app.post("/todos", async (req,res) => {
    
    try {
        const {task, is_completed} = req.body;
        console.log(req.body);
        
        const todos = await sql `INSERT INTO  todos (task, is_completed) VALUES (${task}, ${is_completed}) RETURNING *`;
        res.json(todos);
        console.log(todos)
    } catch (error) {
        console.log(error.message);
    }
})
//GET ALL TODO
app.get("/todos", async(req,res) => {
    try {
        const allTodos = await sql `SELECT * FROM todos `;
        res.json(allTodos)
    } catch (error) {
        console.error(error.message);
    }
})


//GET A TODO

app.get("/todos/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const todo = await sql `SELECT * FROM todos WHERE id = ${id}`;
        res.json(todo);
    } catch (error) {
        console.error(error.message);
        
    }
});

//UPDATE A TODO
app.put("/todos/:id", async(req,res) => {
    try {
      const {id} = req.params;
      const { task, is_completed} = req.body;
      const updateTodos = await  sql `UPDATE todos SET task = ${task},is_completed = ${is_completed} WHERE id = ${id} `;
      res.json("Todos was updated");
    } catch (error) {
       console.log(error.message); 
    }
})
//DELETE A TODO
app.delete("/todos/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await sql `DELETE FROM todos WHERE id = ${id}`;
        res.json("Todo was deleted");
    } catch (error) {
        console.log(error.message)
        
    }
})
app.listen(8000, () => {
    console.log("server has started on port 8000")
}) 
