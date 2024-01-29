import styled from 'styled-components'

export const HomeDiv1 = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  overflow-y: none;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`

export const HomeDiv2 = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`

export const HomeDiv3 = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`

export const VideoDiv1 = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding: 10px;
`

export const ViewsDiv = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
  align-items: center;
`

export const ViewsSubDiv1 = styled.div`
  display: flex;
  width: 20%;
  justify-content: space-between;
  align-items: flex-start;
`
export const ViewsSubDiv2 = styled.div`
  display: flex;
  width: 25%;
  justify-content: space-evenly;
  align-items: center;
`

export const LikeBtn = styled.button`
  background-color: transparent;
  borde-style-type: none;
  border-color: transparent;
  cursor: pointer;
  color: ${props => props.color};
`

export const DislikeBtn = styled.button`
  background-color: transparent;
  borde-style-type: none;
  border-color: transparent;
  cursor: pointer;
  color: ${props => props.color};
`

export const SaveBtn = styled.button`
  background-color: transparent;
  borde-style-type: none;
  border-color: transparent;
  cursor: pointer;
  color: ${props => props.color};
`

export const ProfileDiv1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`

export const ProfileDiv2 = styled.div`
  display: flex;
`

export const ProfileImg = styled.img`
  height: 50px;
  width: 50px;
  margin-top: 20px;
  margin-right: 20px;
`
