import React from 'react';
import './modal.scss';

export default class Modal  extends React.Component {

  constructor(props) {
    super(props);

    var self = this;
  }

  render() {

    var header = this.props.header? (<div className="modal-header">
                {this.props.header} <span className="close" onClick={this.props.onCloseClick}>&times;</span>
    </div>) : '';

    var content = this.props.content? (<div className="modal-body">
      {this.props.content}
    </div>) : '';

    var footer = this.props.footer? (<div className="modal-footer">
      {this.props.footer}
    </div>) : '';

    return (
      <div className={"modal" + (this.props.open? " open" : "") + (this.props.size == 'large'? " large" : "")}>
        <div className="modal-background" onClick={this.props.onCloseClick}></div>
        <div className="modal-content">
          { header }
          { content }
          { footer }
        </div>
      </div>
    );
  }
}