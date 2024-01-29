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
  height: 90%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`

export const GamingNav = styled.nav`
  display: flex;
  flex-direction: row;
  height: 2%;
  width: 100%;
  padding-left: 20px;
`

export const GamingListUl = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  overflow-y: auto;
  align-self: flex-end;
  width: 100%;
  height: 70%;
  padding: 10px;
`
export const GamingListLi = styled.li`
  height: 50%;
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  cursor: pointer;
`
export const VideoImg = styled.img`
  width: 55%;
  height: 55%;
  margin-bottom: 10px;
  padding: 0;
`
