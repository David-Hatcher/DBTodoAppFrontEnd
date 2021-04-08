import React from 'react'

export default function Button(props) {
    return (
        <button
            className={`${props.activeBtn === props.id ? "border-black border-4 font-bold" : " border-gray-400 font-semibold border-2"} bg-white text-gray-800 hover:bg-gray-100  py-2 px-4 rounded shadow ${props.classAdds}`}
            onClick={props.onclick}
            id={props.id}
            >{props.text}</button>
    )
}
