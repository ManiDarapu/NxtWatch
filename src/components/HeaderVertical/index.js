import {Link} from 'react-router-dom'
import {HiHome, HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'
import Context from '../../context/Context'
import {
  VertiDiv1,
  VertiDiv2,
  VertiUl,
  VertiLi,
  NxtLogoImg,
  ContactDiv,
  SocialDiv,
  SocialIcon,
} from './styledComponents'

const HeaderVertical = () => (
  <Context.Consumer>
    {value => {
      const {isDarkTheme} = value
      console.log(isDarkTheme)
      return (
        <VertiDiv1>
          <VertiDiv2>
            <Link to="/">
              {isDarkTheme ? (
                <NxtLogoImg
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                  alt="website logo"
                />
              ) : (
                <NxtLogoImg
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="website logo"
                />
              )}
            </Link>
            <VertiUl>
              <Link to="/">
                <VertiLi>
                  <HiHome />
                  <h1>Home</h1>
                </VertiLi>
              </Link>
              <Link to="/trending">
                <VertiLi>
                  <HiFire />
                  <h1>Trending</h1>
                </VertiLi>
              </Link>
              <Link to="/gaming">
                <VertiLi>
                  <SiYoutubegaming />
                  <h1>Gaming</h1>
                </VertiLi>
              </Link>
              <Link to="/saved-videos">
                <VertiLi>
                  <BiListPlus />
                  <h1>Saved Videos</h1>
                </VertiLi>
              </Link>
            </VertiUl>
          </VertiDiv2>
          <ContactDiv>
            <p>CONTACT US</p>
            <SocialDiv>
              <SocialIcon
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
              />
              <SocialIcon
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
              />
              <SocialIcon
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
              />
            </SocialDiv>
            <p>Enjoy! Now to see your channels and recommendations!</p>
          </ContactDiv>
        </VertiDiv1>
      )
    }}
  </Context.Consumer>
)
export default HeaderVertical
