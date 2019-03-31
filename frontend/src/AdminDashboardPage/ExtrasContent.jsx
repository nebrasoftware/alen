import React from 'react';
import { connect } from 'react-redux';

import { extraActions } from '../_actions';

class ExtrasContent extends React.Component {
  componentDidMount() {
    this.props.dispatch(extraActions.getAllExtras());
  }

  render() {
    const { extras } = this.props;
    console.log(extras.items);
    return (
      <div>
        <h1>Extras Content</h1>
        <ul>
          {/* {extras.items.data.map((extra, index) =>
            <li key={extra.id}>
                {extra.firstName + ' ' + extra.lastName}
            </li>
          )} */}
        </ul>
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