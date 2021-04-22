import React, { useState } from 'react'
import AddTask from './AddTask';
import EditTask from './EditTask';
import CloseTask from './CloseTask';
import Button from './Button';

export default function ManageTasks() {
    const [view, setView] = useState("add");
    const [active,setActive] = useState("add");

    const handleClick = (event) => {
        setActive(event.target.id);
        setView(event.target.id);
    }

    const selectView = () => {
        switch (view) {
            case "add":
                return <AddTask/>
            case "edit":
                return <EditTask/>
            case "close":
                return <CloseTask/>
            default:
                return null;
        }
    }

    return (
        <div className="grid grid-cols-3 text-gray-100 grid-rows-6 h-9-10">
            <div className="grid grid-rows-6 row-start-3 row-span-2 grid-cols-6 col-start-1 gap-2">
                <Button id={"add"} activeBtn={active} text={"Add A Task"} onclick={handleClick} classAdds={"py-2 px-4 rounded max-w-fill col-start-3 col-span-2"}/>
                <Button id={"edit"} activeBtn={active} text={"Edit A Task"} onclick={handleClick} classAdds={"py-2 px-4 rounded max-w-fill col-start-3 col-span-2"}/>
            </div>
            {selectView()}            
        </div>
    )
}
