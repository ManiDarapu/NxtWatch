import React, {Component} from 'react'
import {IoMdSearch} from 'react-icons/io'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import HeaderVertical from '../HeaderVertical'
import HeaderHori from '../HeaderHori'
import {
  HomeDiv1,
  HomeDiv2,
  HomeDiv3,
  BannerDiv1,
  ListUl,
  ListLi,
  VideoImg,
  TitleDiv,
  ChannelImg,
  ViewsDiv,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {list: [], apiStatus: apiStatusConstants.initial, search: ''}

  componentDidMount() {
    this.getHomeVideos()
  }

  getHomeVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {search} = this.state
    const url = `https://apis.ccbp.in/videos/all?search=${search}`
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
    this.getHomeVideos()
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
          <h1>No Search results found</h1>
          <p>Try different key words or remove search filter</p>
          <button type="button" onClick={this.onRetry}>
            Retry
          </button>
        </div>
      )
    } else {
      return (
        <ListUl>
          {list.map(each => (
            <ListLi key={each.id}>
              <Link to={`/videos/${each.id}`}>
                <VideoImg src={each.thumbnailUrl} alt="video thumbnail" />

                <TitleDiv>
                  <ChannelImg src={each.profileImageUrl} alt="channel logo" />
                  <p>{each.title}</p>
                </TitleDiv>
                <p>{each.name}</p>
                <ViewsDiv>
                  <p>{each.viewCount} views</p>
                  <p>{each.publishedAt} </p>
                </ViewsDiv>
              </Link>
            </ListLi>
          ))}
        </ListUl>
      )
    }
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

  onChangeSearch = event => {
    this.setState({search: event.target.value})
  }

  onClickSearch = () => {
    this.getHomeVideos()
  }

  render() {
    return (
      <HomeDiv1>
        <HeaderVertical />
        <HomeDiv2>
          <HeaderHori />
          <HomeDiv3>
            <BannerDiv1 data-testid="banner">
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="nxt watch logo"
                />
                <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
                <button type="button">GET IT NOW</button>
              </div>
              <button type="button" data-testid="close">
                close
              </button>
            </BannerDiv1>
            <div>
              <input
                type="search"
                placeholder="search"
                onChange={this.onChangeSearch}
              />
              <button
                type="button"
                data-testid="searchButton"
                onClick={this.onClickSearch}
              >
                <IoMdSearch />
              </button>
            </div>
            {this.renderOtpt()}
          </HomeDiv3>
        </HomeDiv2>
      </HomeDiv1>
    )
  }
}

export default Home
