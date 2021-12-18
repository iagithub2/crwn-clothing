import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import { createUserWithEmailAndPassword } from "firebase/auth";

import './sign-up.styles.scss';


class SignUp extends React.Component{

    constructor(props){
        super(props);

        this.state={
            displayName:'Joe8',
            email:'joe8@gmail.com',
            password:'123456',
            confirmPassword:'123456'
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const { displayName, email, password, confirmPassword } = this.state;
        if(password != confirmPassword){
            alert("password don't match");
            return;
        }
        try{
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            await createUserProfileDocument(user, {displayName});
            this.setState({
                displayName:'',
                email:'',
                password:'',
                confirmPassword:''
            });
        }catch(error){
            console.error(error);
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]:value});
    }

    render(){
        const { displayName, email, password, confirmPassword } = this.state;
        return(
            <div className='sign-up'>
                <h2 className='title'>I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                        type='text'
                        name='displayName'
                        value='Joe'//{displayName}
                        label='Display Name'
                        handleChange={this.handleChange}
                        required/>
                    <FormInput 
                        type='text'
                        name='email'
                        value='joe@gmail.com'//{email}
                        label='Email'
                        handleChange={this.handleChange}
                        required/>
                    <FormInput 
                        type='password'
                        name='password'
                        value='123456'//{password}
                        label='Password'
                        handleChange={this.handleChange}
                        required/>
                    <FormInput 
                        type='password'
                        name='confirmPassword'
                        value='123456'//{confirmPassword}
                        label='Confirm Password'
                        handleChange={this.handleChange}
                        required/>
                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp;