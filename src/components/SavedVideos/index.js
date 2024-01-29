import {HiFire} from 'react-icons/hi'
import {Link} from 'react-router-dom'
import Context from '../../context/Context'
import {HomeDiv1, HomeDiv2, HomeDiv3, SavedVideosNav} from './styledComponents'
import HeaderHori from '../HeaderHori'
import HeaderVertical from '../HeaderVertical'

const SavedVideos = () => (
  <Context.Consumer>
    {value => {
      const {savedVideos} = value
      console.log(savedVideos)
      return (
        <HomeDiv1>
          <HeaderVertical />
          <HomeDiv2>
            <HeaderHori />
            <HomeDiv3>
              <SavedVideosNav>
                <HiFire color="red" />
                <h1>Saved Videos</h1>
              </SavedVideosNav>
              {savedVideos.length === 0 ? (
                <div>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                    alt="no saved videos"
                  />
                  <h1>No saved videos found</h1>
                  <p>Save your videos by clicking a button</p>
                </div>
              ) : (
                <ul>
                  {savedVideos.map(each => (
                    <Link to={`/videos/${each.id}`}>
                      <li key={each.id}>
                        <img src={each.thumbnailUrl} alt="video thumbnail" />
                        <div>
                          <p>{each.title}</p>
                          <p>{each.name}</p>
                          <div>
                            <p>{each.viewCount}</p>
                            <p>{each.publishedAt}</p>
                          </div>
                        </div>
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </HomeDiv3>
          </HomeDiv2>
        </HomeDiv1>
      )
    }}
  </Context.Consumer>
)

export default SavedVideos
