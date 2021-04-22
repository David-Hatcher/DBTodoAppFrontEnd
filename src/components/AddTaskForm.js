import React, { useState, useEffect} from 'react'
import ReactDayPicker from './ReactDayPicker';
import Button from './Button';
import ErrorModal from './ErrorModal';
import SuccessModal from './SuccessModal';

export default function AddTaskForm(props) {

    const [emps, setEmps] = useState({});
    const [showErr, setShowErr] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorList, setErrorList] = useState([]);
    const [dayKey, setDayKey] = useState(1);

    let options = ['Todo','In Progress','Staging','UAT','Production'];
    let urgencies = ['Low','Medium','High'];

    const [prevDueDate,setPrevDueDate] = useState(parseInt(new Date()/1000))
    const [prevAssignedTo,setPrevAssignedTo] = useState("");
    const [prevTaskTitle,setPrevTaskTitle] = useState("");
    const [prevStatus,setPrevStatus] = useState("");
    const [prevCreateDate] = useState(parseInt(new Date()/1000));
    const [prevPriority,setPrevPriority] = useState("");
    const [prevDepartment,setPrevDepartment] = useState("");
    const [prevDescription,setPrevDescription] = useState("");
    const [prevEmpId,setPrevEmpId] = useState("");


    const genOptions = (option) => {
        return <option key={option}>{option}</option>;
    }
    const updateDate = (day) => {
        setPrevDueDate(parseInt(new Date(day)/1000))
    }
    
    useEffect(() => {
        fetch("http://localhost:5000/queries/getEmployees")
        .then(response => response.json())
        .then((response) => {
            setEmps(response);
        })
    }, [])

    const handleChange = (event) => {
        setValue(event.target.id,event.target.value);
    }

    const setValue = (id,value) => {
        switch (id) {
            case "title":
                setPrevTaskTitle(value);
                return;
            case "level":
                setPrevPriority(value);
                return;        
            case "assignedTo":
                setPrevAssignedTo(value);
                setPrevDepartment(findEmpDept(value));
                setPrevEmpId(findEmpId(value));
                return;
            case "status":
                setPrevStatus(value);
                return;
            case "desc":
                setPrevDescription(value);
                return;
            default:
                console.log(`Incorrect ID:  ${id}`)
                return;
        }
    }

    const findEmpDept = (empName) => {
        for(const key in emps){
            if(emps[key].name.toLowerCase() === empName.toLowerCase()){
                return emps[key].deptId;
            }
        }
        return "N/A";
    }

    const findEmpId = (empName) => {
        for(const key in emps){
            if(emps[key].name.toLowerCase() === empName.toLowerCase()){
                return key;
            }
        }
        return "N/A";
    }

    const updateTask = () => {
        props.updatePreviewTask(createTaskFromForm());
    }

    const createTaskFromForm = () => {
        return {
            taskTitle:prevTaskTitle,
            dueDate: prevDueDate.toString(),
            createDate: prevCreateDate.toString(),
            status: prevStatus,
            description: prevDescription,
            assignedTo : prevAssignedTo,
            priority: prevPriority,
            deptId: prevDepartment,
            empId : prevEmpId
        }
    }

    useEffect(() => {
        updateTask();
    },[prevDepartment,prevDescription,prevDueDate,prevPriority,prevStatus,prevTaskTitle])

    const submitClick = () => {
        const validResults = validateTask();
        if(!validResults[0]){
            setErrorList(validResults[1]);
            setShowErr(true);
        }else{
            setShowSuccess(true);
            clearForm();
            console.log(props.onsubmit(createTaskFromForm()));
        }
        
    }

    const validateTask = () => {
        let ct = createTaskFromForm();
        let errorStrings = []
        let valid = true;
        if(ct.taskTitle.length < 5){
            valid = false;
            errorStrings.push(`Title should be at least 5 characters.`);
        }
        if(ct.dueDate === "" || ct.dueDate < parseInt(new Date()/1000)){
            valid = false;
            errorStrings.push(`Due date needs to be some time in the future.`)
        }
        if(!options.includes(ct.status)){
            valid = false;
            errorStrings.push(`Please select a status for the task.`)
        }
        if(!urgencies.includes(ct.priority)){
            valid = false;
            errorStrings.push(`Please select an urgency level.`);
        }
        if(!isEmpValid(ct.assignedTo)){
            valid = false;
            errorStrings.push(`Please select someone to assign the ticket to.`)
        }
        if(ct.description.length < 10){
            valid = false;
            errorStrings.push(`Description should be at least 10 characters`);
        }
        return [valid,errorStrings];
    }

    const isEmpValid = (emp) => {
        for(const key in emps){
            if(emps[key].name.toLowerCase() === emp.toLowerCase()){
                return true;
            }
        }
        return false;
    }
    
    const clearForm = () => {
        document.getElementById('addTaskForm').reset();
        setDayKey(dayKey + 1);
        setPrevDueDate(parseInt(new Date()/1000));
        setPrevAssignedTo("");
        setPrevTaskTitle("");
        setPrevStatus("");
        setPrevPriority("");
        setPrevDepartment("");
        setPrevDescription("");
    }

    return (
        <>
            <h4 className="text-gray-100 text-2xl">Add A Task</h4>
            <form id="addTaskForm"className="addTaskForm grid grid-cols-2 grid-rows-8 text-left gap-2">
                <div>Task Title:</div>
                <div>
                    <input
                        id="title"
                        className="rounded taskTitle text-black w-2/3"
                        onChange={handleChange}
                    />
                </div>
                <div>Task Description:</div>
                <div>
                    <textarea onChange={handleChange} id="desc" className="rounded taskDescription text-black w-2/3"/>
                </div>
                <div>Task Status:</div>
                <select onChange={handleChange} id="status" className="text-black taskStatus rounded w-2/3">
                    <option value={null} selected>Select One</option>
                    {options.map(genOptions)}
                </select>
                <div>Urgency:</div>
                <select onChange={handleChange} id="level" className="text-black taskLevel rounded w-2/3">
                    <option value={null} selected>Select One</option>
                    {urgencies.map(genOptions)}
                </select>
                <div>Assigned To:</div>
                <select onChange={handleChange} id="assignedTo" className="text-black taskAssignedTo rounded w-2/3">
                    <option value={null} selected>Select One</option>
                    {Object.keys(emps).map((key) => {return genOptions(emps[key].name)})}
                </select>
                <div>Due Date:</div>
                <div>
                    <ReactDayPicker key={`due-${dayKey}`} onChange={updateDate}/>
                </div>                
            </form>
            <Button activeBtn={false} onclick={submitClick} id="addTaskSubmit" text="Add Task" classAdds="my-3"/>
            <ErrorModal show={showErr} errList={errorList} onClose={() => setShowErr(false)}/>
            <SuccessModal show={showSuccess} onClose={() => setShowSuccess(false)} />
        </>
    )
}
