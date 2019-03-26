import styled from 'styled-components';
import React from 'react';
import { Route } from 'react-router-dom';

const Container = styled.div`
    grid-column: content;
    background-color: #f1f1f1;
`

function Content({ items }) {
    return (
        <Container>
            {items.map((item, index) => (
                <Route
                key={index}
                path={item.path}
                exact={item.exact}
                component={item.component}
                />
            ))}
        </Container>
    )
}

export default Content;