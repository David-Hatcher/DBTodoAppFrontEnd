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
        var requestOptions = {
        method: 'GET',
        redirect: 'follow'
        };
        const res = await fetch("http://localhost:5000/queries/getTaskId", requestOptions)
        .then(response => response.text())
        .then(result => {
            
            task.taskId = JSON.parse(result).taskId;
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
