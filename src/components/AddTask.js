import React, { useState, useEffect } from 'react'
import AddTaskForm from './AddTaskForm';
import TaskCard from './TaskCard';

export default function AddTask(props) {
    const [previewTask,setPreviewTask] = useState({
        "taskTitle": "",
        "dueDate": "",
        "createDate": "",
        "status" : "",
        "description" : "",
        "assignedTo" : "",
        "priority" : "",
        "deptId" : "",
        "empId" : ""
    });
    const updateTask = (newTask) => {
        setPreviewTask(newTask)
    }
    const addTask = async (task) => {

        var raw = "";

        var requestOptions = {
        method: 'GET',
        redirect: 'follow'
        };

        const res = await fetch("http://localhost:5000/queries/getTaskId", requestOptions)
        .then(response => response.text())
        .then(result => {
            task.taskId = JSON.parse(result).taskId;
            console.log(task);
            
            var mySubHeaders = new Headers();
            mySubHeaders.append("Content-Type", "application/json");

            var rawSub = JSON.stringify(task);

            var requestOptions = {
            method: 'POST',
            headers: mySubHeaders,
            body: rawSub,
            redirect: 'follow'
            };
            fetch("http://localhost:5000/posts/addTask", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        })
        .catch(error => console.log('error', error));

        // console.log(task);
        // let myHeaders = new Headers();
        // myHeaders.append("Content-Type","application/json");
        // let raw = JSON.stringify(task);
        // let requestOptions = {
        //     method: 'POST',
        //     headers: myHeaders,
        //     body: raw,
        //     redirect: 'follow'
        // };
        
        // const res =  await fetch('http://localhost:5000/addTask',requestOptions)
        // .then(response => response.text())
        // .then(result => console.log(result))
        // .catch(err => console.log(err));
        return res;
    }
    // useEffect(() => {
    //     //console.log(previewTask);
    // },[previewTask])
    return (
        <>
        <div className="text-gray-100 col-start-2 row-start-2">
            <AddTaskForm updatePreviewTask={updateTask} onsubmit={addTask}/>
        </div>
        <div className="col-start-3 row-start-2 w-2/4 text-black text-xl" style={{margin:'auto'}}><p className="text-gray-100">Task Preview</p>
            <TaskCard task={previewTask} taskId={"####"}/>
        </div>
        </>
    )
}
