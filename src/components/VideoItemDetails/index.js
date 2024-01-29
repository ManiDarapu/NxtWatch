import {Component} from 'react'
import ReactPlayer from 'react-player'
import Cookies from 'js-cookie'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {BiListPlus} from 'react-icons/bi'
import Context from '../../context/Context'
import {
  HomeDiv1,
  HomeDiv2,
  HomeDiv3,
  VideoDiv1,
  ViewsDiv,
  ViewsSubDiv1,
  ViewsSubDiv2,
  LikeBtn,
  DislikeBtn,
  SaveBtn,
  ProfileDiv1,
  ProfileDiv2,
  ProfileImg,
} from './styledComponents'
import HeaderHori from '../HeaderHori'
import HeaderVertical from '../HeaderVertical'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}

class VideoItemDetails extends Component {
  state = {
    details: {},
    apiStatus: apiStatusConstants.initial,
    isPlaying: false,
    savedVideos: [],
    saved: false,
    liked: false,
    disliked: false,
  }

  componentDidMount() {
    this.getItemDetails()
  }

  getItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    try {
      const {match} = this.props
      const {params} = match
      const {id} = params
      console.log(id)
      const jwtToken = Cookies.get('jwt_token')
      const url = `https://apis.ccbp.in/videos/${id}`
      const options = {
        headers: {
          Authorization: `Bearers ${jwtToken}`,
        },
        method: 'GET',
      }
      const response = await fetch(url, options)
      console.log(response)
      if (!response.ok) {
        throw new Error('Failed to fetch video details')
      }
      const data = await response.json()
      const detailsData = data.video_details
      const updatedData = {
        id: detailsData.id,
        title: detailsData.title,
        videoUrl: detailsData.video_url,
        thumbnailUrl: detailsData.thumbnail_url,
        name: detailsData.channel.name,
        profileImageUrl: detailsData.channel.profile_image_url,
        subscriberCount: detailsData.channel.subscriber_count,
        viewCount: detailsData.view_count,
        publishedAt: detailsData.published_at,
        description: detailsData.description,
      }

      this.setState({
        details: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } catch (error) {
      console.error('Error fetching video details:', error)
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderOnLoading = () => (
    <img data-testid="loader" src="image.png" alt="loading" />
  )

  onRetry = () => {
    this.getItemDetails()
  }

  renderOnFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>
        We are having some trouble to complete your request. Please try again.
      </p>
      <button type="button" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  onClickPlay = () => {
    this.setState(prevState => ({isPlaying: !prevState.isPlaying}))
  }

  addSavedVideos = () => {
    const {details, savedVideos} = this.state
    this.setState(prevState => ({
      savedVideos: [...prevState.savedVideos, details],
      saved: !prevState.saved,
    }))
  }

  onClickLike = () => {
    this.setState({liked: true, disliked: false})
  }

  onClickDislike = () => {
    this.setState({liked: false, disliked: true})
  }

  renderOnSuccess = () => {
    const {details, isPlaying, savedVideos, saved, liked, disliked} = this.state
    const {
      title,
      videoUrl,
      viewCount,
      publishedAt,
      profileImageUrl,
      subscriberCount,
      name,
      description,
    } = details
    const likeBtnColor = {color: liked ? '#2563eb' : '#64748b'}
    console.log(likeBtnColor.color)
    const dislikeBtnColor = {color: disliked ? '#2563eb' : '#64748b'}
    const savedBtnColor = {color: saved ? '#2563eb' : '#64748b'}
    return (
      <Context.Provider
        value={{savedVideos, addSavedVideos: this.addSavedVideos}}
      >
        <VideoDiv1>
          <ReactPlayer url={videoUrl} playing={isPlaying} />
          <p>{title}</p>
          <ViewsDiv>
            <ViewsSubDiv1>
              <p>{viewCount} views</p>
              <p>{publishedAt}</p>
            </ViewsSubDiv1>
            <ViewsSubDiv2>
              <LikeBtn color={likeBtnColor.color} onClick={this.onClickLike}>
                <AiOutlineLike /> Like
              </LikeBtn>
              <DislikeBtn
                color={dislikeBtnColor.color}
                onClick={this.onClickDislike}
              >
                <AiOutlineDislike /> Dislike
              </DislikeBtn>
              <SaveBtn
                color={savedBtnColor.color}
                onClick={this.addSavedVideos}
              >
                <BiListPlus /> {saved ? 'Saved' : 'Save'}
              </SaveBtn>
            </ViewsSubDiv2>
          </ViewsDiv>
          <hr />
          <ProfileDiv1>
            <ProfileDiv2>
              <ProfileImg src={profileImageUrl} alt="channel logo" />
              <div>
                <p>{name}</p>
                <p>{subscriberCount}</p>
              </div>
            </ProfileDiv2>
            <p>{description}</p>
          </ProfileDiv1>
        </VideoDiv1>
      </Context.Provider>
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

export default VideoItemDetails
