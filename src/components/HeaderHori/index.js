import {FaMoon} from 'react-icons/fa'
import {FiSun} from 'react-icons/fi'
import {Component} from 'react'
import Context from '../../context/Context'
import {Nav, ProfileImg, MoonBtn, Logout} from './styledComponents'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'

class HeaderHori extends Component {
  state = {isDarkTheme: false}

  toggleTheme = () => {
    console.log('toggleTheme called')
    this.setState(prevState => ({isDarkTheme: !prevState.isDarkTheme}))
  }

  render() {
    const {isDarkTheme} = this.state
    const onClickLogout = () => {
      const {history} = this.props
      Cookies.remove('jwt_token')
      history.replace('/login')
    }

    return (
      <Context.Provider value={{isDarkTheme, toggleTheme: this.toggleTheme}}>
        <Nav>
          <MoonBtn type="button" data-testid="theme" onClick={this.toggleTheme}>
            {isDarkTheme ? <FiSun /> : <FaMoon />}
          </MoonBtn>
          <ProfileImg
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
            alt="profile"
          />
          <Popup trigger={<Logout> Logout</Logout>} modal nested>
            {close => (
              <div>
                <p> Are you sure, you want to logout?</p>
                <div>
                  <button
                    onClick={() => {
                      console.log('modal closed ')
                      close()
                    }}
                  >
                    Cancel
                  </button>
                  <button onClick={onClickLogout}> Confirm </button>
                </div>
              </div>
            )}
          </Popup>
        </Nav>
      </Context.Provider>
    )
  }
}

export default withRouter(HeaderHori)
