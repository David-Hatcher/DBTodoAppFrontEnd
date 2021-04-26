import React, {useState} from 'react'
//import logo from './logo.svg';
import './App.css';
import './index.css';
import Header from './components/Header';
import Body from './components/Body';
import Login from './components/Login';

function App() {
  const [body,setBody] = useState('view');
  const [loggedIn, setLoggedIn] = useState(false);
  const showViewTasks = () => {
    setBody('view');
  }
  const showAnalytics = () => {
    setBody('anal');
  }
  const showAddTask = () => {
    setBody('add');
  }
  const handleLogin = () => {
    setLoggedIn(true);
  }

  const handleLogout = () => {
    setLoggedIn(false);
  }
  const whatToShow = () => {
    if(loggedIn){
      return  <>
                <Header showViewTask={showViewTasks} showAnalytics={showAnalytics} showAddTask={showAddTask} body={body} logout={handleLogout}/>
                <Body show={body}/>
              </>
    }else{
      return <Login login={handleLogin}/>
    }
  }
  return (
    <div className="App h-screen font-mono overflow-hidden">
      {whatToShow()}
    </div>
  );
}

export default App;
