import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../actions/index'
import classes from './Auth.css'

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'email address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'enter password'
                },
                value: '',
                validation: {
                    required: true,
                    isPassword: true,
                    minLength: 5
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true
    }

    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onRedirectPath()
        }
    }
    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }


    inputChangeHandler = (event, controlName) => {
        const updateControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({ controls: updateControls })
    }
    formSubmit = (event) => {
        event.preventDefault();
        this.props.authUser(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
    }
    switchAuthHandler = () => {
        this.setState(prevState => {
            return {
                isSignup: !prevState.isSignup
            }
        })
    }
    render() {
        const formElementArray = [];
        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event => this.inputChangeHandler(event, formElement.id))} />
        ))
        if (this.props.loading) {
            form = <Spinner />
        }
       let errorMessage = null
         if(this.props.error){
           errorMessage=(
               <p>{this.props.error.message}</p>
           )
       }
       let userAuthenticated = null;
       if(this.props.userAuthenticated){
           userAuthenticated=<Redirect to={this.props.authRedirectPath}/>
       }

        return (
            <div className={classes.AuthData}>
               {userAuthenticated}
                 {errorMessage}
                <form onSubmit={this.formSubmit}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button btnType="Danger" clicked={this.switchAuthHandler}>SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>

        )
    }
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        userAuthenticated: state.auth.token !== null,
        buildingBurger: state.ings.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authUser: (email, password, isSignup) => dispatch(actions.authUser(email, password, isSignup)),
        onRedirectPath:(path) => dispatch(actions.authRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);