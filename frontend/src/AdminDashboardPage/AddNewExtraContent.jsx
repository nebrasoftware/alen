import React from 'react';
import { connect } from 'react-redux';

import { extraActions } from '../_actions';

class AddNewExtraContent extends React.Component {
  componentDidMount() {
    this.props.dispatch(extraActions.getAll());
  }

  render() {
    const { extras } = this.props;
    return (
      <div>
        <h1>New extra</h1>
        {extras.loading && <em>Loading extras...</em>}
        {extras.items &&
          <ul>
            {extras.items.data.map((extra, index) =>
              <li key={extra.id}>
                  {extra.name + ' ' + extra.last_name}
              </li>
            )}
          </ul>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { extras } = state;
  return {
      extras
  };
}

const connectedAddNewExtraContent = connect(mapStateToProps)(AddNewExtraContent);
export { connectedAddNewExtraContent as AddNewExtraContent };