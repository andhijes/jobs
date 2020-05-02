import React from 'react'

export default function Input(props) {
    const {name, type, labelName, HandleInput, value} = props
    return (
        <>
            <div className="form-group">
                <label htmlFor={name}>{labelName}</label>
                <input type={type} name={name} value={value} className="form-control" id={name} onChange={HandleInput} />
            </div>    
        </>
    )
}
