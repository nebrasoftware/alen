import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

class UserProfilePage extends React.Component {
  componentDidMount() {
    this.props.dispatch(userActions.getById(6))
  }

  render() {
    return (
      <div>
        <h1>User Profile Page</h1>
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

const connectedUserProfilePage = connect(mapStateToProps)(UserProfilePage);
export { connectedUserProfilePage as UserProfilePage };