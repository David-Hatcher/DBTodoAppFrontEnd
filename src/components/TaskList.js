import React from 'react'
import TaskCard from './TaskCard'
import TaskTitle from './TaskTitle'

export default function TaskList(props) {
    const buildTaskCard = (task,taskId) =>{
        return <TaskCard key={taskId} task={task} taskId={taskId} edit={props.edit} emps={props.emps ?? null}/>
    }
    return (
        <div className="mx-2">
            <TaskTitle text={props.title}/>            
            <div className="border-2 text-black border-black rounded h-full grid-rows-5 grid bg-gray-200 bg-opacity-50">
                {Object.keys(props.task).map((d) => { return buildTaskCard(props.task[d],d);})}
            </div>
        </div>
    )
}
