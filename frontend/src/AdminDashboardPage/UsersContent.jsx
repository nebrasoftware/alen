import React from 'react';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class UsersContent extends React.Component {
  componentDidMount() {
    this.props.dispatch(userActions.getAll());
  }

  render() {
    const { users } = this.props;
    return (
      <div>
        <h1>Users Content</h1>
        {users.loading && <em>Loading users...</em>}
        {users.items &&
          <ul>
            {users.items.data.map((user, index) =>
              <li key={user.id}>
                  {user.email}
              </li>
            )}
          </ul>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { users } = state;
  return {
      users
  };
}

const connectedUsersContent = connect(mapStateToProps)(UsersContent);
export { connectedUsersContent as UsersContent };