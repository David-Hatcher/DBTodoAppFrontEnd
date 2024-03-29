import React, { useEffect } from 'react'

export default function Modal(props) {
    const closeOnEscapeKeyDown = (e) => {
        if((e.charCode || e.keyCode) === 27){
            props.onClose();
        }
    }
    useEffect(() => {
        document.body.addEventListener('keydown',closeOnEscapeKeyDown)
        return function cleanup() {
            document.body.removeEventListener('keydown',closeOnEscapeKeyDown)
        }
    }, [])
    
    
    if(!props.show){
        return null;
    }else{
        return (
            <div className="modal" onClick={props.onClose}>
                <div className="modal-content rounded border-2 border-black" onClick={e => e.stopPropagation()}>
                    <div className="modal-header grid grid-cols-4">
                        <h4 className="modal-title col-start-2 col-span-2">{props.task.taskTitle}<br/> Task ID:  {props.taskId}</h4>
                        <div className="text-right">
                            <button onClick={props.onClose} className="w-3/6 button bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">X</button>
                        </div>

                    </div>
                    <div className="modal-body h-96 grid grid-rows-5 content-end">
                        <div className='task-description row-start-2'>
                            {props.task.description}
                        </div>
                        <div className="task-details row-start-5 grid grid-cols-3">
                            <div className="task-assignedTo">Assigned To: {props.task.assignedTo}</div>
                            <div className="task-dept">Department: <br/> {props.task.deptId}</div>                         
                            <div className="task-due">Due Date: {props.formatDate(props.task.dueDate)}</div>
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button onClick={props.onClose} className="button bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Close</button>
                    </div>
                </div>
            </div>
        )
    }
}
