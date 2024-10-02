import './index.css'

import {Component} from 'react'

import Cookie from 'js-cookie'

import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookie.set('jwt_token', jwtToken, {expires: 3})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, showError: true})
  }

  renderUserNameField = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="username">Username</label>
        <input
          type="input"
          value={username}
          id="username"
          onChange={this.onChangeUsername}
          placeholder="username"
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={this.onChangePassword}
          value={password}
          placeholder="password"
        />
      </>
    )
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const apiUrl = 'https://apis.ccbp.in/login'

    const userDetails = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)

    const data = await response.json()

    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showError, errorMsg} = this.state

    const jwtToken = Cookie.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-main-container">
        <form onSubmit={this.submitForm} className="login-form-container">
          {this.renderUserNameField()}
          {this.renderPasswordField()}
          <button type="submit">Login</button>
          {showError && <p className="error_msg">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
