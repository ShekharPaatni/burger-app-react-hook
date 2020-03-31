import React, { Fragment, useState } from 'react'
import Button from '../../../UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../config/axios/orderAxios'
import Spinner from '../../../UI/Spinner/Spinner'
import Input from '../../../UI/Input/Input'
import {connect} from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import {purchaseBurgerStart} from '../../../store/action/index'
import {updateObject, checkValidity} from '../../../shared/Utility/utility'
const contactData = props => {
    const [orderForm, setOrderForm] = useState({
            name : {
                elementType : "input",
                elementConfig : {
                    type : "text",
                    placeholder : "Your Name",
                    
                },
                value:'',
                validation: {
                    required : true
                },
                valid : false,
                touched : false
            },
            email : {
                elementType : "input",
                elementConfig : {
                    type : "email",
                    placeholder : "Your email",
                },
                value:'',
                validation: {
                    required : true
                },
                valid : false,
                touched : false
            },
            street : {
                elementType : "input",
                elementConfig : {
                    type : "text",
                    placeholder : "Street",
                },
                value:'',
                validation: {
                    required : true
                },
                valid : false,
                touched : false
            },        
            zipCode : {
                elementType : "input",
                elementConfig : {
                    type : "text",
                    placeholder : "Zip Code"
                },
                value:'',
                validation: {
                    required : true,
                    minLength : 5,
                    maxLength : 6
                },
                valid : false,
                touched : false
            },        
            deliveryMethod : {
                elementType : "select",
                elementConfig : {
                options : [
                    {value:'cheapest', displayValue:'Cheapest'},
                    {value:'fastest', displayValue:'Fastest'},
                    ]
                },
                valid: true,
                validation : {},
                value:'cheapest'
            }
        });
    const [isFormValid, setIsFormValid] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in orderForm) {
            formData[formElementIdentifier] =orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredient : props.ingredients,
            price : props.price,
            customer : formData,
            userId : props.userId
        }
        props.onOrderBurger(order, props.token)
    }



    const changeListnerHandler = (event, idListner) =>  {
        const updateForm = updateObject(orderForm, {
            value : event.target.value,
            valid : checkValidity(event.target.value,
                orderForm[idListner].validation),
                touched : true
        })
        const updatedOrderForm =updateObject(orderForm, 
            {[idListner] : updateForm})
        let isFormValid = true;
        for (let inputEle in updatedOrderForm) {
            isFormValid = updatedOrderForm[inputEle].valid && isFormValid;
        }
        setOrderForm(updatedOrderForm);
        setIsFormValid(isFormValid);
    }



    const formElementArrays = [];
    for(let key in orderForm) {
        console.log(key)
        formElementArrays.push( {
            id : key,
            config : orderForm[key]
        })
        }

        let form = (
            <Fragment>
                <h4>Enter your contact data</h4>
                <form onSubmit={orderHandler}>
                    {formElementArrays.map((ele, index) => <Input 
                    key={ele.id}
                    elementType={ele.config.elementType} 
                    elementConfig={ele.config.elementConfig}
                    value={ele.config.value}
                    invalid={!ele.config.valid}
                    shouldValidate={ele.config.validation ? true : false}
                    isUpdate={ele.config.touched}
                    changed={(event) => changeListnerHandler(event, ele.id)} /> )}
                    <Button btnType="Success" disabled={!isFormValid}>Order</Button>
                </form>
            </Fragment>
        );

        if(props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                {form}
            </div>
        )
    }
const mapStateToProps = state => {
    return {
        ingredients : state.bBRed.ingredients,
        price : state.bBRed.totalPrice,
        loading : state.oRed.loading,
        token : state.authRed.token,
        userId : state.authRed.userId
    }
}

const mapDispatchToProps = dispatch  => {
   return {
        onOrderBurger : (data, token) => dispatch(purchaseBurgerStart(data, token))
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(contactData, axios));