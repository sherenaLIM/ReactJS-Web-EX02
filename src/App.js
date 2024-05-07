// eslint-disable-next-line
import logo from './logo.svg';
import {useState, useEffect} from "react";
import './App.css';

// define a functional component named App
// the component is responsible for loading initial todos from a backend service or mock API server
function App() {
  const [data, setData] = useState([]);
  const [entry, setEntry] = useState("");

  function addNewEntry(value) {
    fetch("http://localhost:3001/todos", {
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({value}),

      // POST request 
      method: "POST",
    }).then((res) => refreshData());
  }

  function deleteEntry(id) {
    fetch(`http://localhost:3001/todos/${id}`, {
      method: "DELETE",
    }).then((res) => refreshData());
  }

  function refreshData() {
    fetch("http://localhost:3001/todos")
    .then((res) => res.json())
    .then((todos) => {
      setData(todos);
    });
  }

  // load the initial todos
  useEffect(() => {
    refreshData();
  }, []);


  const todoElements = data.map((t) => (
    <div className="entry" key={t.id}>
      <div className="entry-text">{t.value}</div>
      <div className="right">
        <button 
        onClick={() => {
          if (window.confirm("Do you want to delete?")) {
            deleteEntry(t.id);
          }
        }}
        >
          Delete
        </button>
      </div>
    </div>
  ));

  return(
    // return statement of the component JSX renders the UI
    // returns empty <div> element, which will be rendered to the DOM
    // div element properly returned from the component
    <div className="container">
      <h2>To Do :</h2>
      {todoElements}
      <br/>
      <textarea
      className="form-text"
      onChange={(e) => setEntry(e.target.value)}
      value = {entry}></textarea>
      <br/>
      <div>
        <button onClick={() => {
          addNewEntry(entry);

          // clear the textbox after adding
          setEntry("");
        }}
        >
          Add
        </button>
      </div>
    </div>
);}

export default App;
