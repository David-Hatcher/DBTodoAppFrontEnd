import React, { useState, useEffect} from 'react'
import Button from './Button';
import ReactDayPicker from './ReactDayPicker';

export default function EditModal(props) {
    const [emp, setEmp] = useState(props.task.assignedTo);
    const [dept, setDept] = useState(props.task.deptId);
    const [date,setDate] = useState(props.task.dueDate);
    const [status, setStatus] = useState(props.task.status);
    const [level, setLevel] = useState(props.task.priority);
    const [description, setDescription] = useState(props.task.description);
    const [empId, setEmpId] = useState(props.task.empId);
    const [modTask, setModTask] = useState(props.task);
    let options = ['Todo','In Progress','Staging','UAT','Production','Closed'];
    let urgencies = ['Low','Medium','High'];
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
    }, []);

    useEffect(() => {
        setModTask(getTaskFromChanges());
    },[emp,dept,date,status,level,description])


    const handleDateChange = (date) => {
        setDate(date.getTime()/1000)
    }
    
    const genEmps = (emp, selected = null,key) => {
        if(emp.name.toLowerCase() == selected.toLowerCase()){
            return <option selected value={`${emp.deptId}|${emp.name}|${key}`}>{emp.name}</option>            
        }
        return <option value={`${emp.deptId}|${emp.name}|${key}`}>{emp.name}</option>
    }

    const genOptions = (option, selected = "") => {
        if(option.toLowerCase() === selected.toLowerCase()){
            return <option selected>{option}</option>
        }
        return <option>{option}</option>
    }

    const modifyDescription = (text) => {
        if(text.length == 0){
            setDescription(props.task.description);
        }else{
            setDescription(text);
        }
    }

    const modifyAssignedTo = (value) => {
        let vals = value.split("|");
        setEmp(vals[1]);
        setDept(vals[0]);
        setEmpId(vals[2]);
    }

    const setValues = (id,value) => {
        switch (id) {
            case "description":
                modifyDescription(value);
                return;
            case "assignedTo":
                modifyAssignedTo(value);
                return;
            case "status":
                setStatus(value);
                return;
            case "level":
                setLevel(value);
                return;
            default:
                console.log("invalid input")
        }
    }

    const getTaskFromChanges = () => {
        return {
            taskId:props.taskId,
            taskTitle:props.task.taskTitle,
            dueDate:date.toString(),
            createDate:props.task.createDate,
            description:description,
            status:status,
            assignedTo:emp,
            level:level,
            deptId:dept,
            empId:empId
        }
    }

    const handleChange = (event) => {
        setValues(event.target.id,event.target.value);
    }

    const sendToAPI = async () => {
        console.log(modTask);
        let myHeaders = new Headers();
        myHeaders.append("Content-Type","application/json");
        let ready = JSON.stringify(modTask);
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: ready,
            redirect: 'follow'
        }
        const res = await fetch('http://localhost:5000/posts/updateTask', requestOptions)
        .then(response => response.text())
        .then((result) =>{
            console.log(result);
            if(JSON.parse(result).task == 'accepted'){
                props.onClose()
            }
        })
        .catch(err => console.log(err));
        return res;
    }
    
    if(!props.show){
        return null;
    }else{
        return (
            <div className="modal" onClick={props.onClose}>
                <div className="modal-content rounded border-2 border-black" onClick={e => e.stopPropagation()}>
                    <div className="modal-header grid grid-cols-4">
                        <h4 className="modal-title col-start-2 col-span-2">{`${props.task.taskTitle}`} <br/> Task ID: {props.taskId}</h4>
                        <div className="text-right">
                            <button onClick={props.onClose} className="w-3/6 button bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">X</button>
                        </div>

                    </div>
                    <div className="modal-body grid grid-cols-5">
                        <div className="col-span-2 grid grid-rows-5 gap-3">
                            <div className='task-description'>
                                {props.task.description}
                            </div>
                            <div className="task-assignedTo">Assigned To: {props.task.assignedTo}</div>
                            <div classname="task-status">Status: {props.task.status}</div>
                            <div className="task-dept">Urgency: <br/> {props.task.level}</div>                         
                            <div className="task-due">Due Date: {props.formatDate(props.task.dueDate)}</div>
                        </div>
                        <div className="col-span-1 grid grid-rows-5 inline-block align-middle gap-3">
                            <div>&#8594;</div>
                            <div>&#8594;</div>
                            <div>&#8594;</div>
                            <div>&#8594;</div>
                            <div>&#8594;</div>
                        </div>
                        <div className="col-span-2 grid grid-rows-5 gap-3">
                            <textarea id="description" onChange={handleChange} placeholder={props.task.description} className="description border-black border rounded"/>
                            <div className="grid grid-rows-2">
                                <select id="assignedTo" onChange={handleChange} className="assignedTo h-6 box-border border border-black rounded">
                                    {Object.keys(props.emps).map((key) => {
                                        return genEmps(props.emps[key],emp,key);
                                    })}
                                </select>
                                <span>Dept: {dept}</span>
                            </div>
                            
                            <select id="status" onChange={handleChange} className="status h-6 box-border border border-black rounded">
                                {options.map((d) => {
                                    return genOptions(d,status);
                                })}
                            </select>
                            <select id="level" onChange={handleChange} className="level h-6 box-border border border-black rounded">
                                {urgencies.map((d) => {
                                    return genOptions(d,level);
                                })}
                            </select>
                            <ReactDayPicker onChange={handleDateChange} defaultDate={date}/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <Button text={"Update Task"} onclick={sendToAPI} activeBtn={null} id={"submit"} classAdd={""}/>
                        {/* <button onClick={props.onClose} className="button bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Close</button> */}
                    </div>
                </div>
            </div>
        )
    }
}
