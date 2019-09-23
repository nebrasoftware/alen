import styled from 'styled-components'

const Container = styled.div`
    display: grid;
    grid-template-columns: [sidebar] minmax(10vw, 35vw) [content] 3fr;
    height: 100vh;
`

export default Container;