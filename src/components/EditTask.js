import React, { useEffect, useState} from 'react'
import TaskList from './TaskList';

export default function EditTask() {
    const [tasks, setTasks] = useState({});
    const [emps, setEmps] = useState({});
    
    useEffect(() => {
        fetch("https://databasedesignprojapi.herokuapp.com/queries/getEmployees")
        .then(response => response.json())
        .then((response) => {
            setEmps(response);
        })
    }, [])

    useEffect(() => {
        fetch("https://databasedesignprojapi.herokuapp.com/queries/getTasksByUser")
        .then(response => response.json())
        .then((response) => {
            setTasks(response);
        })
    }, [])
    

    return (
        <div className='col-start-2 row-start-2'>
            <TaskList title="Click On Task To Edit" task={tasks} edit={true} emps={emps}/>
        </div>
    )
}
