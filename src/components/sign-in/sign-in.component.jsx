import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import './sign-in.styles.scss';
import { auth, signInWithPopupCustom }  from '../../firebase/firebase.utils';
import { signInWithEmailAndPassword } from "firebase/auth";

class SignIn extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            email:'',
            password:''
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        const { email, password } = this.state;
        try{
            signInWithEmailAndPassword(auth, email, password);
            this.setState({email:'', password:''});
        }catch(error){
            console.log(error);
        }
    }

    handleChange = event => {
        event.preventDefault();
        const {name, value} = event.target;
        this.setState({[name]:value});
    }

    render(){
        return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name='email'
                        type='email'
                        value={this.state.email} 
                        handleChange={this.handleChange}    
                        label='email'
                        required
                    />
                    <FormInput 
                        name='password'
                        type='password'
                        value={this.state.password} 
                        handleChange={this.handleChange}
                        label='password'
                        required  
                    />
                    <div className='buttons'>
                        <CustomButton type='submit'>Sign in</CustomButton>
                        <CustomButton type='button' onClick={signInWithPopupCustom} isGoogleSignIn>
                            Sign in with Google
                        </CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignIn;