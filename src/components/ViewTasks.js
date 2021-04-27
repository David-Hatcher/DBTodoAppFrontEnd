import React, { useEffect, useState} from 'react'
import TaskList from './TaskList'

export default function ViewTasks() {
    const [tasks,setTasks] = useState({});
    const [currentEmp, setCurrentEmp] = useState("All");
    const [empList, setEmpList] = useState([])

    useEffect(() => {
        fetch("https://databasedesignprojapi.herokuapp.com/queries/getTasksByUser")
        .then(response => response.json())
        .then((response) => {
            findEmpWhoHaveTasks(response);
            setTasks(response);
        })
    }, [])

    const filterTasks = (tasks,status) => {
        if(currentEmp == "All"){
            return filterTasksByStatus(tasks,status);
        }else{
            return filterTasksByStatusAndEmployee(tasks,status,currentEmp);
        }
    }
    const filterTasksByStatus = (tasks,status) => {
        let data = {};
        Object.keys(tasks).map((d) => {
            if(doesEntryMatch(tasks[d].status,status)){
                data[d] = tasks[d];
            }
        })
        return data;
    }
    const filterTasksByStatusAndEmployee = (tasks,status,emp) => {
        let data = {};
        Object.keys(tasks).map((d) => {
            if(doesEntryMatch(tasks[d].status,status) && doesEntryMatch(tasks[d].assignedTo,emp)){
                data[d] = tasks[d];
            }
        })
        return data;
    }
    const doesEntryMatch = (entry,matchValue) =>{
        return entry.toLowerCase() === matchValue.toLowerCase();
    }
    const findEmpWhoHaveTasks = (tasks) => {
        let locEmpList = [];
        Object.keys(tasks).forEach((key) => {
            if(!locEmpList.includes(tasks[key].assignedTo)){
                locEmpList.push(tasks[key].assignedTo);
            }
        })
        setEmpList(locEmpList);
    }
    const genEmpsOptions = (option) => {
        return <option key={option}>{option}</option>
    }
    const updateCurrentEmp = (event) => {
        setCurrentEmp(event.target.value);
    }
    return (
        <>
        <div className="grid grid-cols-7 font-bold text-gray-100 text-2xl">
            <div className="">
                <div className="">
                    Employee:
                </div>
                <select id="empSelector" className="text-black" onChange={updateCurrentEmp}>
                    <option>All</option>
                    {empList.map(genEmpsOptions)}
                </select>
            </div>
            <div className="col-start-4">
                Current Tasks
            </div>
        </div>
        <div className='grid text-xl gap-2 grid-rows-6 h-9-10'>            
            <div className="row-span-5 grid-cols-5 grid col-span-5">
                <TaskList title='Todo' task={filterTasks(tasks,"todo")}/>
                <TaskList title='In Progress' task={filterTasks(tasks,"in progress")}/>
                <TaskList title='Staging' task={filterTasks(tasks,"staging")}/>
                <TaskList title='UAT' task={filterTasks(tasks,"uat")}/>
                <TaskList title='Production' task={filterTasks(tasks,"production")}/>
            </div>
        </div>
        </>
    )
}
