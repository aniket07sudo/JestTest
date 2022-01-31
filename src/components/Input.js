import React from 'react';
import './input.css';

const input = (props) => {
    let inputElement = null;
    let inputClasses = ["inputElement"];
    if(props.invalid && props.touched) {
        inputClasses.push("invalid");
    }
    switch(props.elementType) {
        case ('input'):
            inputElement = <input className={inputClasses.join(" ")} {...props.elementConfig} value={props.value}  onChange={props.changed}/>
            break;
        case ('select'):
            inputElement = (<select value={props.value}>
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value} onChange={props.changed}>{option.displayValue}</option>
                ))}
            </select>)
            break;
        default:
            inputElement = <input className={inputClasses.join(" ")} {...props.elementConfig} value={props.value} />
    }
    return (
        <div>
            <label>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input;