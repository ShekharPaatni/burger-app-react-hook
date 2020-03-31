import React from 'react';
import classes from './Input.css';
const input = (props) => {
    let inputElement = null;

    const classNames = [classes.InputElement]
    if(props.invalid && props.shouldValidate && props.isUpdate) {
        classNames.push(classes.Invalid);
    }
    switch(props.elementType) {

        case ('input') : 
            inputElement = <input className={classNames.join(' ')} 
            {...props.elementConfig} value={props.value}  onChange={props.changed}/>
            break;
        case ('textarea') :
            inputElement = <textarea className={classNames.join(' ')}
             {...props.elementConfig} value={props.value}  onChange={props.changed}/>
            break;
        case ('select')  :
            inputElement = <select className={classNames.join(' ')} onChange={props.changed}>
                {props.elementConfig.options.map((option, index) => 
                <option key={index} value={option.value} 
                selected={option.value==='cheapest'}>{option.displayValue}</option>)}
                
                </select>
            break;  
        default:
            inputElement = <input className={classNames.join(' ')}
             {...props.elementConfig} value={props.value}  onChange={props.changed}/>
            break;       
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;