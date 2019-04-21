import React from 'react';
import { connect } from 'react-redux';

import { extraActions } from '../_actions';

class ExtrasContent extends React.Component {
  componentDidMount() {
    this.props.dispatch(extraActions.getAll());
  }

  render() {
    const { extras } = this.props;
    return (
      <div>
        <h1>Extras Content</h1>
        {extras.loading && <em>Loading extras...</em>}
        {extras.items &&
          <ul>
            {extras.items.data.map((extra, index) =>
              <li key={extra.id}>
                  {extra.name + ' ' + extra.lastName}
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

const connectedExtrasContent = connect(mapStateToProps)(ExtrasContent);
export { connectedExtrasContent as ExtrasContent };