import styled from 'styled-components'

export const LoginDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  height: 50%;
  width: 22%;
  padding: 30px;
  box-shadow: 3px 3px 10px 10px #cccccc;
  border-radius: 20px;
`

export const Logo = styled.img`
  width: 60%;
  display: flex;
  align-self: center;
  margin-bottom: 10px;
`

export const Label = styled.label`
  font-weight: 650;
  color: #909090;
  font-size: 12px;
  font-family: Roboto;
`

export const Input = styled.input`
  width: 100%;
  border-radius: 5px;
  border-color: #cccccc;
  color: #909090;
  height: 9%;
  border-style: solid;
  border-width: 2px;
  padding-left: 10px;
`

export const LoginBtn = styled.button`
  width: 30%;
  border-radius: 5px;
  color: #ffffff;
  height: 9%;
  border-style: none;
  padding-left: 10px;
  background-color: #ff0b37;
  align-self: center;
  cursor: pointer;
`

export const Para = styled.p`
  color: #ff0b37;
  height: 2%;
  font-size: 12px;
  font-weight: 550;
`
