import React, {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import HeaderVertical from '../HeaderVertical'
import HeaderHori from '../HeaderHori'
import {SiYoutubegaming} from 'react-icons/si'
import {
  HomeDiv1,
  HomeDiv2,
  HomeDiv3,
  GamingNav,
  GamingListUl,
  GamingListLi,
  VideoImg,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}

class Gaming extends Component {
  state = {list: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        const videosData = data.videos
        const updatedData = videosData.map(each => ({
          id: each.id,
          title: each.title,
          thumbnailUrl: each.thumbnail_url,
          viewCount: each.view_count,
        }))
        this.setState({
          apiStatus: apiStatusConstants.success,
          list: updatedData,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (error) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderOnLoading = () => (
    <img data-testid="loader" src="image.png" alt="loading" />
  )

  renderOnFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We are having some trouble</p>
      <button type="button" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  onRetry = () => {
    this.getGamingVideos()
  }

  renderOnSuccess = () => {
    const {list} = this.state
    if (list.length === 0) {
      return (
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png "
            alt="no videos"
          />
          <p>No Search results found</p>
          <p>Try different key words or remove search filter</p>
          <button type="button" onClick={this.onRetry}>
            Retry
          </button>
        </div>
      )
    }
    return (
      <GamingListUl>
        {list.map(each => (
          <GamingListLi key={each.id}>
            <Link to={`/videos/${each.id}`}>
              <VideoImg src={each.thumbnailUrl} alt="video thumbnail" />
              <p>{each.title}</p>
              <p>{each.viewCount}</p>
            </Link>
          </GamingListLi>
        ))}
      </GamingListUl>
    )
  }

  renderOtpt = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.failure:
        return this.renderOnFailure()
      case apiStatusConstants.success:
        return this.renderOnSuccess()
      case apiStatusConstants.inProgress:
        return this.renderOnLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <HomeDiv1>
        <HeaderVertical />
        <HomeDiv2>
          <HeaderHori />
          <HomeDiv3>
            <GamingNav>
              <SiYoutubegaming color="red" />
              <h1>Gaming</h1>
            </GamingNav>
            {this.renderOtpt()}
          </HomeDiv3>
        </HomeDiv2>
      </HomeDiv1>
    )
  }
}

export default Gaming
