import React from 'react'
import Aux from '../../../hoc/Aux/Aux'
import buildControlClasses from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [ 
    {type:"salad", label:"Salad"},
    {type:"bacon", label:"Bacon"},
    {type:"meat", label:"Meat"},
    {type:"cheese", label:"Cheese"},
]
const buildControls = (props) => (<Aux>
    <div className={buildControlClasses.BuildControls}>
        <p>Current Price : {props.price.toFixed(2)}</p>
        {controls.map((control, index) => <BuildControl 
        key={index} 
        label={control.label}
        added={() => props.ingredientAdded(control.type)}
        remove={() => props.ingredientRemove(control.type)}
        disable={props.disableInfo[control.type]}
        />
        )}
    </div>
    <div style={{textAlign: 'center', marginTop: '10px'}}>
        <button className={buildControlClasses.OrderButton} 
        disabled={!props.purchasable}
        onClick={props.purchasing}>{props.isAuth ? 'ORDER NOW' : 'Signup' }</button>
    </div>
</Aux>);

export default buildControls;