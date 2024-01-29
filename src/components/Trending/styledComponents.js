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

export const TrendingListUl = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  overflow-y: auto;
  align-self: flex-end;
  width: 100%;
  height: 100%;
  padding: 10px;
`
export const TrendingListLi = styled.li`
  height: 30%;
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  cursor: pointer;
  border-color: red;
  border-width: 10px;
`
export const VideoImg = styled.img`
  width: 100%;
  height: 30%;
  margin: 0;
  padding: 0;
`

export const ChannelImg = styled.img`
  height: 30%;
  width: 20%;
`
