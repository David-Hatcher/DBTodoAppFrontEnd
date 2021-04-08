import React from 'react'
import AddTask from './AddTask';
import TaskAnalytics from './TaskAnalytics';
import ViewTasks from './ViewTasks'

export default function Body(props) {
    const whatToShow = () =>{
        switch (props.show) {
            case 'view':
                return <ViewTasks/>
            case 'add':
                return <AddTask/>
            case 'anal':
                return <TaskAnalytics/>
            default:
                return <></>
        }
    }
    return (
        <>
            {whatToShow()}
        </>
    )
}
