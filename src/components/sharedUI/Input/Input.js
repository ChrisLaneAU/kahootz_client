import React from 'react';
import './Input.scss';

const Input = (props) => {
    return(
        <input
        onChange={props.onChange} 
        className={props.type} 
        value=""
        placeholder=""
        >
        </input>
    )
}

export default Input


