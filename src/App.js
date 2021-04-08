import React, {useState, useEffect} from 'react'
//import logo from './logo.svg';
import './App.css';
import './index.css';
import Header from './components/Header';
import Body from './components/Body';

function App() {
  useEffect(() => {
    fetch("http://localhost:5000/url")
    .then(response => response.json())
    .then(response => {console.log(response)})
  }, [])
  const [body,setBody] = useState('view');
  const showViewTasks = () => {
    setBody('view');
    console.log('show tasks pls');
  }
  const showAnalytics = () => {
    setBody('anal');
    console.log('show anal pls');
  }
  const showAddTask = () => {
    setBody('add');
    console.log('show add tasks pls');
  }
  return (
    <div className="App h-screen">
      <Header showViewTask={showViewTasks} showAnalytics={showAnalytics} showAddTask={showAddTask} body={body}/>
      <Body show={body}/>
    </div>
  );
}

export default App;
