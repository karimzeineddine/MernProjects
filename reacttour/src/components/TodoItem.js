function TodoItem({todo}){
    return (
        <div className="todo-items">
            <input type="checkbox"/>
            <span>{todo.text}</span>
        </div>
    );
}

export default TodoItem;