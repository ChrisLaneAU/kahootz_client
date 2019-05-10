import React from 'react';
import './Input.scss';

const Input = (props) => {
    function handlChange(event){
    if(props.onChange) props.onChange(event)
}
    return(
        <input
        onChange={handlChange} 
        className={props.type} 
        value={props.value}
        >
        </input>
    )
}

export default Input


