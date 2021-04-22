import React, { useEffect, useState} from 'react'
import TaskList from './TaskList'

export default function ViewTasks() {
    const [tasks,setTasks] = useState({});
    // useEffect(() => {
    //     fetch("http://localhost:5000/getTasks")
    //     .then(response => response.json())
    //     .then((response) => {
    //         setTasks(response);
    //     })
    // }, [])

    useEffect(() => {
        fetch("http://localhost:5000/queries/getTasksByUser")
        .then(response => response.json())
        .then((response) => {
            console.log(response);
            setTasks(response);
        })
    }, [])
    const filterTasksByStatus = (tasks,status) => {
        let data = {};
        Object.keys(tasks).map((d) => {
            if(doesEntryMatch(tasks[d],status)){
                data[d] = tasks[d];
            }
        })
        return data;
    }
    const doesEntryMatch = (entry,status) =>{
        return entry.status.toLowerCase() === status;
    }
    return (
        <>
        <div className="col-span-5 font-bold text-gray-100 text-2xl">Current Tasks</div>
        <div className='grid text-xl gap-2 grid-rows-6 h-9-10'>            
            <div className="row-span-5 grid-cols-5 grid col-span-5">
                <TaskList title='Todo' task={filterTasksByStatus(tasks,"todo")}/>
                <TaskList title='In Progress' task={filterTasksByStatus(tasks,"in progress")}/>
                <TaskList title='Staging' task={filterTasksByStatus(tasks,"staging")}/>
                <TaskList title='UAT' task={filterTasksByStatus(tasks,"uat")}/>
                <TaskList title='Production' task={filterTasksByStatus(tasks,"production")}/>
            </div>
        </div>
        </>
    )
}
