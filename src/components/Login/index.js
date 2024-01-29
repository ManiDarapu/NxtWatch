import React, {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {
  LoginDiv,
  Form,
  Logo,
  Label,
  Input,
  LoginBtn,
  Para,
} from './styledComponents'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isDarkTheme: false,
    showPassword: false,
    showError: false,
    error: '',
  }

  onChangeCheckbox = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = error => {
    this.setState({showError: true, error})
  }

  onFormSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const url = 'https://apis.ccbp.in/login'
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, isDarkTheme, showPassword, showError, error} =
      this.state
    const logo = isDarkTheme
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
    const passwordFieldType = showPassword ? 'text' : 'password'
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <LoginDiv>
        <Form onSubmit={this.onFormSubmit}>
          <Logo src={logo} alt="website logo" />
          <Label htmlFor="username">USERNAME</Label>
          <Input
            type="text"
            id="username"
            name="username"
            value={username}
            placeholder="Username"
            onChange={this.onChangeUsername}
          />
          <Label htmlFor="password">PASSWORD</Label>
          <Input
            type={passwordFieldType}
            id="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={this.onChangePassword}
          />
          <div>
            <input
              type="checkbox"
              id="checkbox"
              name="checkbox"
              onChange={this.onChangeCheckbox}
            />
            <label htmlFor="checkbox">Show Password</label>
          </div>
          {showError && <Para>{error}</Para>}
          <LoginBtn type="submit">Login</LoginBtn>
        </Form>
      </LoginDiv>
    )
  }
}

export default Login
