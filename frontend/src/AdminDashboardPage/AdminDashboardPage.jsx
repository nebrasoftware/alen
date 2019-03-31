import React from 'react';
import { connect } from 'react-redux';

import Container from '../_components/Container';
import Content from '../_components/Content';
import Sidebar from '../_components/Sidebar';
import { ExtrasContent } from './ExtrasContent';

const routes = [
  {
    path: "/panel/extras",
    title: 'extras',
    exact: true,
    component: () => <ExtrasContent></ExtrasContent>
  },
  {
    path: "/panel/usuarios",
    title: 'usuarios',
    component: () => <h2>Usuarios</h2>
  }
];

class AdminDashboardPage extends React.Component {

  render() {
    return (
      <Container>
        <Sidebar items={routes} />
        <Content items={routes} />
      </Container>
    )
  }
}


function mapStateToProps(state) {
    const { authentication, extras } = state;
    const { user } = authentication;
    return {
        user,
        extras
    };
}

const connectedAdminDashboardPage = connect(mapStateToProps)(AdminDashboardPage);
export { connectedAdminDashboardPage as AdminDashboardPage };