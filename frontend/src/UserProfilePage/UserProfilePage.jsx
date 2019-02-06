import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

class UserProfilePage extends React.Component {
  componentDidMount() {
    console.log('hola')
    this.props.dispatch(userActions.userStatus());
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