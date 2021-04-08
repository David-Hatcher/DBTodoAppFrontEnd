import React from 'react'
import Button from './Button'

export default function Header(props) {
    return (
        <div className="grid grid-cols-3  h-1-10">
            <Button text="View Tasks" onclick={props.showViewTask} classAdds="max-w-max m-auto" id="viewBtn" activeBtn={`${props.body}Btn`}/>
            <Button text="Add Task" onclick={props.showAddTask} classAdds="max-w-max m-auto" id="addBtn" activeBtn={`${props.body}Btn`}/>
            <Button text="View ANALytics" onclick={props.showAnalytics} classAdds="max-w-max m-auto" id="analBtn" activeBtn={`${props.body}Btn`}/>
        </div>
    )
}
