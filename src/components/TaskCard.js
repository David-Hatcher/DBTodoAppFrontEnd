import React, {useState} from 'react'
import EditModal from './EditModal';
import Modal from './Modal';

export default function TaskCard(props) {
    const [show,setShow] = useState(false);
    const getColor = (task) => {
        switch (task.priority.toLowerCase()) {
            case "high":
                return 'bg-red-200';
            case "medium":
                return 'bg-yellow-200';
            case "low":
                return "bg-blue-200";
            default:
                return 'bg-gray-200';
        }
    }

    const formatDate = (date) =>{
        let dateObj = new Date(date * 1000);
        let day = dateObj.getDate();
        let month = dateObj.getMonth() + 1;
        let year = dateObj.getFullYear()
        return `${month}/${day}/${year}`;
    }

    const whichModal = () => {
        if(props.edit === true){
            return <EditModal show={show} onClose={() => setShow(false)} task={props.task} formatDate={formatDate} taskId={props.taskId} emps={props.emps}/>
        }else{
            return <Modal show={show} onClose={() => setShow(false)} task={props.task} formatDate={formatDate} taskId={props.taskId}/>
        }
    }

    return (
        <>
        <div
            draggable
            className={`grid draggable content-around grid-cols-4 border-2 border-black my-2 mx-2 rounded ${getColor(props.task)}`}
            onClick={() => setShow(true)}
        >
            <div className="col-span-4">{props.task.taskTitle}</div>
            <div className="col-span-2 text-left mx-1 text-sm">{props.task.assignedTo}</div>
            <div className="col-span-2 text-sm text-right mx-1">{`Due Date: \n ${formatDate(props.task.dueDate)}`}</div>
        </div>
        {whichModal()}
        </>
    )
}
