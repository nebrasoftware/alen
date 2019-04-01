import React from 'react';
import { connect } from 'react-redux';

import Container from '../_components/Container';
import Content from '../_components/Content';
import Sidebar from '../_components/Sidebar';
import { ExtrasContent } from './ExtrasContent';
import { UsersContent } from './UsersContent';
import { AddNewExtraContent } from './AddNewExtraContent';

const routes = [
  {
    path: "/panel/extras",
    title: 'extras',
    component: () => <ExtrasContent></ExtrasContent>
  },
  {
    path: "/panel/nuevo-extra",
    title: 'nuevo extra',
    component: () => <AddNewExtraContent></AddNewExtraContent>
  },
  {
    path: "/panel/usuarios",
    title: 'usuarios',
    component: () => <UsersContent></UsersContent>
  }
];

class AdminDashboardPage extends React.Component {

  render() {
    console.log(this.props)
    return (
      <Container>
        <Sidebar items={routes} />
        <Content items={routes} />
      </Container>
    )
  }
}


function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

const connectedAdminDashboardPage = connect(mapStateToProps)(AdminDashboardPage);
export { connectedAdminDashboardPage as AdminDashboardPage };