import React, {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import HeaderVertical from '../HeaderVertical'
import HeaderHori from '../HeaderHori'
import {
  HomeDiv1,
  HomeDiv2,
  HomeDiv3,
  TrendingListUl,
  TrendingListLi,
  VideoImg,
  ChannelImg,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}

class Trending extends Component {
  state = {list: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
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
          name: each.channel.name,
          profileImageUrl: each.channel.profile_image_url,
          viewCount: each.view_count,
          publishedAt: each.published_at,
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
    this.getTrendingVideos()
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
      <TrendingListUl>
        {list.map(each => (
          <TrendingListLi key={each.id}>
            <Link to={`/videos/${each.id}`}>
              <VideoImg src={each.thumbnailUrl} alt="video thumbnail" />
              <div>
                <ChannelImg src={each.profileImageUrl} alt="channel logo" />
                <p>{each.title}</p>
              </div>
              <p>{each.name}</p>
              <div>
                <p>{each.viewCount} views</p>
                <p>{each.publishedAt} </p>
              </div>
            </Link>
          </TrendingListLi>
        ))}
      </TrendingListUl>
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
          <HomeDiv3>{this.renderOtpt()}</HomeDiv3>
        </HomeDiv2>
      </HomeDiv1>
    )
  }
}

export default Trending
