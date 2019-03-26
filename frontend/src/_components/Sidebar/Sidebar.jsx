import styled from 'styled-components';
import React from 'react';
import rem from '../../_utils/rem';
import Logo from '../Logo';
import { Link } from 'react-router-dom';

const SidebarContainer = styled.div`
    grid-column: sidebar;
    background-color: #fff;
`

const CircleBackground = styled.div`
    position: relative;
    width: 30vw;
    height: 50vh;
    border-radius: 60% 70%;
    transform: translate(-15%, -30%);
    background-image: linear-gradient(106deg, #bc121d, #5e080e);
`

const LogoWrapper = styled.div`
    position: absolute;
    top: 55%;
    left: 55%;
    transform: translate(-50%, -50%);
    width: ${rem(220)};
`

function Sidebar({ items }) {
    return (
        <SidebarContainer>
            <CircleBackground>
                <LogoWrapper>
                    <Logo />
                </LogoWrapper>
            </CircleBackground>
            <nav>
                {items.map((item) => (
                    <li>
                        <Link to={item.path}>{item.title}</Link>
                    </li>
                ))}
            </nav>
        </SidebarContainer>
    )
}

export default Sidebar;
