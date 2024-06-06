import React from 'react'
import pageNotFoundImg from "../../Assets/404-pageNotFound.jpg"
import styled from 'styled-components'
const PageNotFound = () => {
  return (
    <Wrapper>
      <Img src={pageNotFoundImg} alt="" />
    </Wrapper>
  )
}

export default PageNotFound

const Wrapper = styled.div`
width: 100%;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`

const Img = styled.img`
width: 100%;
height: 100%;
object-fit: contain;
`