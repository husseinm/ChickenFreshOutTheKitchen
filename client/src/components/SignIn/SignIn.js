import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import AppBar from 'material-ui/AppBar';
import './SignIn.css';

class SignIn extends Component {
    render() {
        return (
            <AppBar
                title={
                    <div>                        
                        {/* <h2 className="top_margin">Sign In</h2> */}
                        <TextField                            
                            className='text-box'
                            hintText="username"
                        //errorText="This field is required"
                        />
                        <TextField
                            className='text-box'
                            hintText="password"
                        //errorText="This field is required"
                        />

                        <RaisedButton className="signIn_bt" label="Log In" primary={true} />

                    </div>
                }
            />
        );
    }
}

export default SignIn;
