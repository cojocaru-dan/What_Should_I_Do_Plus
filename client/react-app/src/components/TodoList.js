import { useState } from 'react';

let filter;

export default function TodoList(props) {
    const [editTodo, setEditTodo] = useState("");

    const [todoTitle, setTodoTitle] = useState("");
    const [todoComment, setTodoComment] = useState("");
    const [todoCreatedAt, setTodoCreatedAt] = useState(undefined);

    const retrievedData = props.todosdata;
    const setshowdata = props.setshowdata;
    const setshowbutton = props.setshowbutton;
    const handleshowdata = props.handleshowdata;


    function handleHideData() {
        setshowdata(false);
        setshowbutton(true);
    }

    function handleDeleteTodo(event) {
        console.log(event.target.id);
        fetch('http://localhost:3001/api/todo', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({title: event.target.id})
        })
            .then(response => response.json())
            .then(res => {
                if (res.status === "ok") {
                    handleshowdata();
                }
            })
            .catch(error => {
              console.log("error", error);
            });
    }

    function handleEditTodo(event) {
        setEditTodo(event.target.id);
        filter = {title: event.target.id};
    }

    function handleSubmitOneTodo(e) {
        e.preventDefault();
        const data = {};
        if (todoTitle !== "") data.title = todoTitle; 
        if (todoComment !== "") data.comment = todoComment; 
        if (todoCreatedAt !== "") data.createdAt = todoCreatedAt;
        
        data.filter = filter.title;
        console.log("collected data", data);
        if (Object.keys(data).length === 1) return;
    
        fetch('http://localhost:3001/api/todo', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(response => {
                if (response.status === "ok") {
                    handleshowdata();
                    alert("Todo has been updated!");
                }
            })
            .catch(error => {
                console.log("error", error);
            });
        
        setTodoTitle("");
        setTodoComment("");
        setTodoCreatedAt("");
        setEditTodo("");
        filter = undefined;
    }

    return (
        <>
        <table>
            <tbody>
                {retrievedData.map((todo, idx) => (
                    (todo.title === editTodo ? (
                        <tr>
                            <td>
                            <form onSubmit={handleSubmitOneTodo}>
                                <td>
                                <input type="text" value={todo.title} onChange={e => {
                                    setTodoTitle(e.target.value);
                                    todo.title = e.target.value;
                                    setEditTodo(e.target.value);
                                }}/>
                                </td>
                                <td>
                                <input type="text" value={todo.comment} onChange={e => {
                                    setTodoComment(e.target.value);
                                    todo.comment = e.target.value;
                                }}/>
                                </td>
                                <td>
                                <input type="date" value={todo.createdAt.slice(0, 10)} onChange={e => {
                                    setTodoCreatedAt(e.target.value);
                                    todo.createdAt = e.target.value;
                                }}/>
                                </td>
                                <td>
                                <button>Submit Todo</button>
                                </td>
                            </form> 
                            </td>
                        </tr>
                    ) : (
                        <tr key={idx}>
                            <td>{todo.title}</td>
                            <td>{todo.comment}</td>
                            <td>{todo.createdAt}</td>
                            <td><button id={todo.title} onClick={handleDeleteTodo}>Delete Todo</button></td>
                            <td><button id={todo.title} onClick={handleEditTodo}>Edit Todo</button></td>
                        </tr>
                    ))
                ))}
            </tbody>
        </table>
        <button onClick={handleHideData}>Hide Todo's</button>
        </>
    )
}

