import React from 'react';
import RichTextEditor from 'react-rte';

export default class TextEditor extends React.Component {

  constructor(props) {
    super(props);
    var propTypes = {
      onChange: React.PropTypes.func
    };

    this.state = {
      value: RichTextEditor.createEmptyValue()
    }
  }

  onChange(value) {
    this.setState({value});
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  };

  render () {
    return (
      <RichTextEditor
        {...this.props}
        value={this.state.value}
        onChange={this.onChange.bind(this)}
      />
    );
  }
}