import React from 'react';
import Modal from '../modal/modal';
import CreatePostForm from '../createpostform/createpostform';
import './createpostmodal.scss';

export default class CreatePostModal  extends React.Component {

  constructor(props) {
    super(props);

    var self = this;
  }

  closeModal() {
    if (this.props.onCloseClick) this.props.onCloseClick();
  }

  render() {
    return (
      <div className="createpostmodal">
        <Modal
          open={this.props.open}
          onCloseClick={this.closeModal.bind(this)}
          header="Create Post"
          size="large"
          content={<CreatePostForm />}/>
      </div>
    );
  }
}