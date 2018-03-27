import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';

import './SignUp.css';
import SignIn from '../SignIn/SignIn';

const style = {
    textAlign: 'center',
};

class SignUp extends Component {
    state = {
        state: {
            value: ''
        }
        // city: {
        //     value: '',
        //     error: ''
        // },
        // zipCode: {
        //     value: '',
        //     error: ''
        // }
    };

    handleChange = (event, index, value) => this.setState({ value });
    render() {
        return (
            <div>
                <div className="center">
                    <div className="right">
                        <SignIn />
                    </div>
                    <div className="top_margin">
                        <h2 className="top_margin">Sign Up</h2>
                        <div>
                            <div>
                                <TextField
                                    className='margin-2'
                                    hintText="First Name"
                                    floatingLabelText="First Name"
                                    //errorText="This field is required"
                                />
                                <TextField
                                    className='margin-2'
                                    hintText="Last Name"
                                    floatingLabelText="Last Name"
                                   //errorText="This field is required"
                                />
                            </div>
                            <div>
                                <TextField
                                    className='margin-2'
                                    hintText="Email"
                                    floatingLabelText="Email"
                                   //errorText="This field is required"
                                />
                                <TextField
                                    className='margin-2'
                                    hintText="Phone Number"
                                    floatingLabelText="Phone Number"
                                    //errorText="This field is required"
                                />
                            </div>
                            <div>
                                <TextField
                                    className='margin-2'
                                    hintText="Company Name"
                                    floatingLabelText="Company Name"
                                    //errorText="This field is required"
                                />
                                <TextField
                                    className='margin-2'
                                    hintText="Company Address"
                                    floatingLabelText="Company Address"
                                    //errorText="This field is required"
                                />
                            </div>
                            <div>
                                <TextField
                                    hintText="Address Line 2"
                                    floatingLabelText="Address Line 2"
                                />
                            </div>
                            <div>
                                <SelectField
                                    className='left'
                                    floatingLabelText="State"
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                >
                                    {this.getMenuItems()}
                                </SelectField>
                            </div>
                            <div>
                                <TextField
                                    //value={this.state.city.value}
                                    className='margin-2'
                                    hintText="City"
                                    floatingLabelText="City"
                                    // onChange={(event) => this.onChangeHandler(event)}
                                    //onBlur={(event) => this.onBlurHandler(event)}
                                    // errorText={this.state.city.error}
                                    id='city'
                                />
                                <TextField
                                    //value={this.state.zipCode.value}
                                    className='margin-2'
                                    hintText="ZIP/Postal Code"
                                    floatingLabelText="ZIP/Postal Code"
                                    //onChange={(event) => this.onChangeHandler(event)}
                                    //onBlur={(event) => this.onBlurHandler(event)}
                                    //errorText={this.state.zipCode.error}
                                    id='zipCode'
                                />
                            </div>
                            <div className="signUp_bt">
                                <RaisedButton label="Sign Up" primary={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    onChangeHandler(event) {
        this.setState({ [event.target.id]: event.target.value });
        console.log('id: ' + event.target.id);
    };

    onBlurHandler(event) {
        let obj = Object.assign({}, this.state.zipCode.error);
        if (event.target.value === '' || event.target.value === null) {
            this.setState({ obj: 'This field is required' });
        }
        else {
            this.setState({ [event.target.id.error]: '' });
        }
    };

    getMenuItems() {
        var states = this.getStates();
        var menuItems = [];

        states.forEach((element, index) => {
            menuItems.push(<MenuItem value={index} key={index} primaryText={element} />);
        });

        return menuItems;
    };

    getStates() {
        return ['Alabama',
            'Alaska',
            'Arizona',
            'Arkansas',
            'California',
            'Colorado',
            'Connecticut',
            'Delaware',
            'Florida',
            'Georgia',
            'Hawaii',
            'Idaho',
            'Illinois',
            'Indiana',
            'Iowa',
            'Kansas',
            'Kentucky',
            'Louisiana',
            'Maine',
            'Maryland',
            'Massachusetts',
            'Michigan',
            'Minnesota',
            'Mississippi',
            'Missouri',
            'Montana',
            'Nebraska',
            'Nevada',
            'New',
            'Hampshire',
            'New',
            'Jersey',
            'New',
            'Mexico',
            'New',
            'York',
            'North',
            'Carolina',
            'North',
            'Dakota',
            'Ohio',
            'Oklahoma',
            'Oregon',
            'Pennsylvania',
            'Rhode',
            'Island',
            'South',
            'Carolina',
            'South',
            'Dakota',
            'Tennessee',
            'Texas',
            'Utah',
            'Vermont',
            'Virginia',
            'Washington',
            'West',
            'Virginia',
            'Wisconsin',
            'Wyoming']
    };
};

export default SignUp;
