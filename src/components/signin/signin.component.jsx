import React from "react";
import './signin.styles.scss';
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { auth, signInWithGoogle} from '../../firebase/firebase.utils';

class SignIn extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password:''
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        const { email, password } = this.state;

        try {
            auth.signInWithEmailAndPassword(email, password);
            this.setState({email : '', password : '' });
        }catch(error){
            error.log(error);
        }
    }

    handleChange = event => {
        const {value, name} = event.target;

        this.setState({[name]:value});
    }

    render(){
        return (
        <div className='sign-in'>
            <h2>I already have an account!</h2>
            <span>Signin with email and password</span>

            <form onSubmit={this.handleSubmit}>
                <FormInput type='email' name='email' label='Email' value={this.state.email} 
                onChange={this.handleChange} required />
                <FormInput type='password' name='password' label='Password' value={this.state.password} 
                onChange={this.handleChange} required />

                <div className='buttons'>
                    <CustomButton type='submit' > Sign in</CustomButton>
                    <CustomButton onClick={ signInWithGoogle } isGoogleSignIn > Sign in with Google</CustomButton>
                </div>
            </form>
        </div>
        )
    }
}

export default SignIn;