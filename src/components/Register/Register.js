import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            name: ""
            
        }
    }
    onNameChange = (event) => {
        this.setState({ name: event.target.value })
    }
    onEmailChange = (event) => {
        this.setState({ email: event.target.value })
    }
    onPasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }
   
    onSubmit = (event) => {
        
        fetch("http://localhost:3000/register", {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(response => response.json())
            .then(user => {
                if(user){
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }

            })
            
    }
    render() {
        return (
            <div className=''>
                <article className="br3 ba bg-white b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center">
                    <main className="pa4 black-80">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw6 ph0 mh0">Sign Up</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" >Name</label>
                                    <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-transparent w-100" type="name" name="name" id="name" />
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" >Email</label>
                                    <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-transparent w-100" type="email" name="email" id="email" />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" >Password</label>
                                    <input onChange={this.onPasswordChange} className="pa2 input-reset ba bg-transparent hover-bg-transparent w-100" type="password" name="password" id="password" />
                                </div>
                            </fieldset>
                            <div className="">
                                <input onClick={this.onSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign Up" />
                            </div>
                        </div>
                    </main>
                </article>
            </div>

        )
    }
}

export default Register;