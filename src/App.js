import React, {useState} from 'react'
//import logo from './logo.svg';
import './App.css';
import './index.css';
import Header from './components/Header';
import Body from './components/Body';

function App() {

  const [body,setBody] = useState('view');
  const showViewTasks = () => {
    setBody('view');
  }
  const showAnalytics = () => {
    setBody('anal');
  }
  const showAddTask = () => {
    setBody('add');
  }
  return (
    <div className="App h-screen">
      <Header showViewTask={showViewTasks} showAnalytics={showAnalytics} showAddTask={showAddTask} body={body}/>
      <Body show={body}/>
    </div>
  );
}

export default App;
