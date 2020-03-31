import React, { useState, Fragment, useEffect } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'
import classes from '../Auth/Auth.css'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {authInitialize, setAuthRedirectPath} from '../../store/action/index'
import Spinner from '../../UI/Spinner/Spinner' 
import {checkValidity} from '../../shared/Utility/utility'
const auth = props => {

    const [controls, setControls] = useState({
            email : {
                elementType : "input",
                elementConfig : {
                    type : "email",
                    placeholder : "Mail Address",
                    
                },
                value:'',
                validation: {
                    required : true,
                    isEmail :  true
                },
                valid : false,
                touched : false
            },
            password : {
                elementType : "input",
                elementConfig : {
                    type : "password",
                    placeholder : "Password",
                    
                },
                value:'',
                validation: {
                    required : true,
                    minLength : 6
                },
                valid : false,
                touched : false
            }

        });
        const [showSignUp, setShowSignUp] = useState(true);

    useEffect(() => {
        if(!props.building && props.authRedirectUri !== '/') {
            props.onSetAuthRedirectPath();
        }
    }, [])

    const switchShowSignUp = () => {
        setShowSignUp(!showSignUp);
    }

    const inputChangeHandler = (event, controlName) => {
        const updateControls = {
            ...controls,
            [controlName] : {
                ...controls[controlName],
                value : event.target.value,
                valid : checkValidity(
                    event.target.value,
                    controls[controlName].validation),
                touched : true
            }
        };
        setControls(updateControls)
        
    }

    const submitHandler = (event) => {
        event.preventDefault();
       props.authHandler(controls.email.value, controls.password.value, showSignUp);
    }
        let authRedirect = null;
        if(props.isAuth) {
            authRedirect = <Redirect to={props.authRedirectUri} />
        }
        const formElementArrays = [];
        for(let key in controls) {
            formElementArrays.push( {
                id : key,
                config : controls[key]
            })
        }
        let error = null;
        if(props.error) {
            error = <p style={{color: 'red', fontWeight: 'bold'}}>{props.error.message}</p>
        }

        let form = (
            <Fragment>
                <h4>               {error}</h4>
                <form onSubmit={submitHandler}>
                    {formElementArrays.map((ele, index) => <Input 
                    key={ele.id}
                    elementType={ele.config.elementType} 
                    elementConfig={ele.config.elementConfig}
                    value={ele.config.value}
                    invalid={!ele.config.valid}
                    shouldValidate={ele.config.validation ? true : false}
                    isUpdate={ele.config.touched}
                    changed={(event) => inputChangeHandler(event, ele.id)} /> )}
                    <Button btnType="Success" >Authenicate</Button>
                     </form>
                     <Button 
                    clicked={switchShowSignUp}
                    btnType='Danger'>Swtich to {showSignUp ? 'SignIn' : 'SignUp'}</Button>
            </Fragment>


        );
        
        if(props.loading) {
            form = <Spinner />
        }
       
                    

        return (
            <Aux>
               {authRedirect}
                <div className={classes.Auth}>
                    {form}
                </div>
            </Aux>
        )
    }


const mapStateToProps = state => {
    return {
        loading : state.authRed.loading,
        error : state.authRed.error,
        isAuth : state.authRed.token != null,
        building : state.bBRed.building,
        authRedirectUri : state.authRed.authRedirectUri
        }
}

const mapDispatchToStore = dispatch => {
    return {
        authHandler : (email, password, isSignUP) => dispatch(authInitialize(email, password, isSignUP)),
        onSetAuthRedirectPath : () => dispatch(setAuthRedirectPath("/"))

    }
}
export default connect(mapStateToProps, mapDispatchToStore)(auth);