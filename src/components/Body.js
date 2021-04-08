import React from 'react'
import ManageTasks from './ManageTasks'
import TaskAnalytics from './TaskAnalytics';
import ViewTasks from './ViewTasks'

export default function Body(props) {
    const whatToShow = () =>{
        switch (props.show) {
            case 'view':
                return <ViewTasks/>
            case 'add':
                return <ManageTasks/>
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
