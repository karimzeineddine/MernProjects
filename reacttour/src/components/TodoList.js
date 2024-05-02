import TodoItem from "./TodoItem";

const TodoData =[
    {id:1,text:"learn react js"},
    {id:2,text:"learn node and express js"},
    {id:3,text:"learn mongodb and mongoose"},
    {id:4,text:"learn git and source control"},
];

function TodoList(){
    return(
     <div className="todo-list"> 
            { TodoData.map(todo => (
                < TodoItem key={todo.id} todo={todo}/>
            ))}
    </div>
    );
}

export default TodoList;