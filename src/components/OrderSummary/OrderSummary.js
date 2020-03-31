import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Aux'
import Button from  '../../UI/Button/Button'
class OrderSummary extends Component {

    componentWillUpdate() {
    }

    render() {
        const ingredientSummary = 
Object.keys(this.props.ingredient).map(key =>
     <li key={key}>
         <span  style={{textTransform: 'capitalize'}}>{key}</span> 
         : <span >{this.props.ingredient[key]}</span>
    </li>
    );
        return <Aux>
        <h3>Your Order </h3>
        <p>A delicious burger with the following ingredients:-</p>
        <ul>
            {ingredientSummary}
        </ul>
<p><strong>Total Price: {this.props.total.toFixed(2)}</strong></p>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={this.props.cancel}>CANCEL</Button>
        <Button btnType="Success" clicked={this.props.continue}>CONTINUE</Button>
    </Aux> 
    }
}
export default OrderSummary;