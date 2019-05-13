import React from 'react';
import './Input.scss';

const Input = (props) => {
    function handlChange(event){
    if(props.onChange) props.onChange(event)
}
    return(
        <input
        onChange={handlChange} 
        className={props.class} 
        value={props.value}
        type={props.type || "text"}
        placeholder={props.placeholder}
        >
        </input>
    )
}

export default Input


