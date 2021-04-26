import React, { useState } from 'react'
import Button from './Button'

export default function Login(props) {
    const [message,setMessage] = useState("")

    const handleLogin = (event) => {
        event.preventDefault();
        let password = document.querySelector('#password').value;
        let username = document.querySelector('#username').value;

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            username:username,
            pass:password
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:5000/posts/login", requestOptions)
        .then(response => response.text())
        .then(result => {
            result = JSON.parse(result);
            console.log(result);
            if(result.authenticated == true){
                props.login()
            }else{
                setMessage("Incorrect Login Information");
            }
        })
        .catch(error => console.log('error', error));
    }

    return (
        <div className="grid grid-cols-12 h-full grid-rows-6">
            <form className="col-start-5 col-span-4 rounded row-start-3 row-span-2 bg-gray-100 border-4 border-black grid grid-cols-3 grid-rows-6 shadow-xl gap-3">
                <div className="col-span-full row-start-2 text-3xl">Enter Login Information</div>
                <div className="col-start-2 row-start-3">
                    Username:
                    <input
                        type='text'
                        placeholder='Username'
                        id='username'
                        className="rounded"
                    />
                </div>                
                <div className="col-start-2 row-start-4">
                    Password:
                    <input
                        type='password'
                        placeholder='Password'
                        id='password'
                        className="rounded"
                    />    
                </div>
                <Button text={'Login'} classAdds={"col-start-2 row-start-5 hover:text-black"} onclick={handleLogin}/>
                <p className="col-start-1 row-start-6 col-span-3 text-red-600 font-bold glow">{message}</p>
            </form>
        </div>

    )
}
