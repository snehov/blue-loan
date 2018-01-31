import styled from 'styled-components'
import Slider from 'react-rangeslider'

export const SliderCont = styled(Slider)`
  width: 320px;
  margin: 15px;
  display: inline-block;
  float: left;
`

export const CalcContainer = styled.div`
  width: 500px;
  height: 240px;
  background-color: #f8f8f8;
  border: 1px solid #8e8e8e;
  padding: 20px;
`
export const CalcName = styled.h2``

export const Color = styled.span`
  color: black;
  color: ${props => props.name === 'starsi' && '#79afc8'};
  color: ${props => props.name === 'mladej' && '#66c080'};
`
export const Button = styled.button`
  color: white;
  background-color: ${props => props.name === 'starsi' && '#79afc8'};
  background-color: ${props => props.name === 'mladej' && '#66c080'};
  padding: 10px 20px;
  font-size: 20px;
  border: 0px;
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.35);
  margin: 10px;
`
export const Value = styled.div`
  display: inline-block;
  margin: 10px;
`
export const Input = styled.input`
  width: 60px;
  text-align: right;
`
export const SliderDescr = styled.div`
  display: block;
  clear: both;
  margin-top: 10px;
`
export const ResolutionMsg = styled.div`
  clear: both;
  font-size: 20px;
  color: gray;
`
export const ResolutionAmount = styled.div`
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  height: 38px;
`
