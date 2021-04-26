import React from 'react'
import Button from './Button'

export default function Header(props) {
    return (
        <div className="grid grid-cols-4 h-1-10">
            <Button text="View Tasks" onclick={props.showViewTask} classAdds="max-w-max m-auto" id="viewBtn" activeBtn={`${props.body}Btn`}/>
            <Button text="Manage Tasks" onclick={props.showAddTask} classAdds="max-w-max m-auto" id="addBtn" activeBtn={`${props.body}Btn`}/>
            <Button text="View Analytics" onclick={props.showAnalytics} classAdds="max-w-max m-auto" id="analBtn" activeBtn={`${props.body}Btn`}/>
            <Button text="Log Out" onclick={props.logout} classAdds="max-w-max m-auto" id="logoutBtn" activeBtn={`${props.body}Btn`}/>
        </div>
    )
}
