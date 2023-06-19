import './App.css';
import { useState } from 'react';
import TodoList from './components/TodoList';

function App() {
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [createdAt, setCreatedAt] = useState("");
  const [todosData, setTodosData] = useState([]);
  const [showData, setShowData] = useState(false);
  const [showButton, setShowButton] = useState(true);

  function handleShowData() {
    fetch('http://localhost:3001/api/todo')
        .then(res => res.json())
        .then(responseData => {
          console.log(responseData.data);
          setTodosData(responseData.data);
          setShowData(true);
          setShowButton(false);
        })
        .catch(error => console.log(error));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = { 
      title: title, 
      comment: comment, 
      createdAt: createdAt 
    };

    fetch('http://localhost:3001/api/todo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(response => {
        if (response.title === data.title) {
          handleShowData();
        };
      })
      .catch(error => {
        console.log("error", error);
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </label>
        <label>
          Comment:
          <input type="text" value={comment} onChange={e => setComment(e.target.value)} />
        </label>
        <label>
          CreatedAt:
          <input type="date" value={createdAt} onChange={e => setCreatedAt(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {showButton && <button onClick={handleShowData}>Show Todo's</button>}
      {showData && <TodoList
                      todosdata={todosData} 
                      setshowdata={setShowData}
                      setshowbutton={setShowButton}
                      handleshowdata={handleShowData}
                    />
      }
    </div>
    
  );
}

export default App;
