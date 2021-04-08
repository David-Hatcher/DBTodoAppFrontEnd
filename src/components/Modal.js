import React, { useEffect } from 'react'
import TaskCard from './TaskCard';

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
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <div classname="modal-header">
                        <h4 className="modal-title">{props.task.taskTitle}</h4>
                    </div>
                    <div className="modal-body">
                        <div className='task-description'>
                            {props.task.description}
                        </div>
                        <div className="task-assignedTo">
                            Assigned To: {props.task.assignedTo}
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button onClick={props.onClose} className="button">Close</button>
                    </div>
                </div>
            </div>
        )
    }


}
