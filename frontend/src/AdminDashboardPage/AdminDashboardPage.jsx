import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

class AdminDashboardPage extends React.Component {
  componentDidMount() {
    // this.props.dispatch(userActions.userStatus());
  }

  render() {
    return (
      <div>
        <h1>Admin Dashboard Page</h1>
      </div>
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