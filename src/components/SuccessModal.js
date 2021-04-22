import React, { useEffect } from 'react'

export default function SuccessModal(props) {
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
                <div className="modal-content rounded border-2 border-black text-black" onClick={e => e.stopPropagation()}>
                    <div className="modal-header grid grid-cols-4">
                        <h4 className="modal-title col-start-2 col-span-2 text-xl">Task Successfully Added</h4>
                        <div className="text-right">
                            <button onClick={props.onClose} className="w-3/6 button bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">X</button>
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
