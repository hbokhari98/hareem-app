import React from 'react';
import { Redirect } from 'react-router-dom';
import LoggedIn from './LoggedIn'

class Login extends React.Component {
  state = {
    error: false,
    success: false,
    email: '',
    password: ''
  }

  emailChanged = (event) => {
    this.setState({
      email: event.target.value
    });
  }
  passwordChanged = (event) => {
    this.setState({
      password: event.target.value
    });
  }

  login = (event) => {   
    var user = {email: this.state.email, password: this.state.password}; 
        fetch("/api/users/users", {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user),
        })
      .then(res => {
        console.log(res);
        if(res.ok) {
          return res.json()
        }
      })
      .then(user => {
        console.log(user);
        this.setState({
          success: true,
        });
      })
      .catch(err => {
        this.setState({
          error: true,
        })
      });
  }  
    

  render() {
    if(this.state.success) 
      return (
        <LoggedIn /> 
    );

    let errorMessage = null;
    if(this.state.error) {
      errorMessage = (
        <div className="alert alert-danger">
          "There was an error Logging In."
        </div>
      );
    }

    return (
      <div className="col-10 col-md-8 col-lg-7">
        { errorMessage }
        <div className="input-group">
        <label>Email: </label>
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={this.state.email}
            className="form-control mr-3 rounded"
            onChange={this.emailChanged}
            required
          />
        <label>Password: </label>
          <input 
            type="password" 
            value={this.state.password}
            className="form-control mr-3 rounded"
            onChange={this.passwordChanged}
            required
          />
          <button className="btn btn-primary" onClick={this.login}>Login</button>
        </div>
      </div>
    );
  }
}

export default Login;