import React from 'react'

export default function Button(props) {
    return (
        <button
            className={`${props.activeBtn === props.id ? "border-2 font-bold bg-gray-600 text-white" : "font-semibold border-2 bg-white text-gray-800"} border-white hover:text-black hover:bg-gray-400 py-2 px-4 rounded shadow ${props.classAdds}`}
            onClick={props.onclick}
            id={props.id}
            >{props.text}</button>
    )
}
