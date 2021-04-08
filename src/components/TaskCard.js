import React, {useState} from 'react'
import Modal from './Modal';

export default function TaskCard(props) {
    const [show,setShow] = useState(false);
    const [data,setData] = useState(props.task);
    const getColor = (task) => {
        switch (task.level.toLowerCase()) {
            case "high":
                return 'bg-red-200';
            case "medium":
                return 'bg-yellow-500';
            case "low":
                return "bg-blue-200";
            default:
                return 'bg-gray-200';
        }
    }

    const formatDate = (date) =>{
        let dateObj = new Date(date * 1000);
        let day = dateObj.getDate();
        let month = dateObj.getMonth();
        let year = dateObj.getFullYear()
        return `${month}/${day}/${year}`;
    }
    return (
        <>
        <div
            className={`grid content-around grid-cols-4 border-2 border-black my-2 mx-2 rounded ${getColor(data)}`}
            onClick={() => setShow(true)}
        >
            <div className="col-span-4">{data.taskTitle}</div>
            <div className="col-span-2 text-left mx-1 text-sm">{data.assignedTo}</div>
            <div className="col-span-2 text-sm text-right mx-1">{`Due Date: ${formatDate(data.dueDate)}`}</div>
        </div>
        <Modal show={show} onClose={() => setShow(false)} task={data} formatDate={formatDate} taskId={props.taskId}/>
        </>
    )
}
