import React from 'react';
import MediumEditor from 'medium-editor';

import 'medium-editor/dist/css/medium-editor.min.css';
import 'medium-editor/dist/css/themes/beagle.min.css';
import './texteditor.scss';

export default class TextEditor extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      wysiwygContent: null,
      htmlContent: null,
      mode: 'visual' // or 'html'
    }
  }

  componentDidMount() {
    var self = this;

    this.wysiwygEditor = new MediumEditor(this.wysiwygInput, {
        placeholder: false
    });
    this.wysiwygEditor.subscribe('editableInput', this.handleWysiwygInput.bind(this));
    this.htmlInput.addEventListener('input', this.handleHtmlInput.bind(this));

    this.updateWysiwygElementContent();
    this.updateHtmlElementContent();
  }

  handleHtmlInput(input) {
    if (this.props.onChange)
      this.props.onChange(this.htmlInput.innerText)
  }

  handleWysiwygInput(input) {
    if (this.props.onChange)
      this.props.onChange(this.wysiwygInput.innerHTML)
  }

  updateWysiwygElementContent() {
    this.setState({
      wysiwygContent: this.props.value
    }, function(){
      this.wysiwygEditor.setContent(this.state.wysiwygContent);
    });
  }

  updateHtmlElementContent() {
    this.setState({
      htmlContent: this.props.value
    });
  }

  selectVisualMode(e) {
    this.setState({
      mode: 'visual'
    });
    this.updateWysiwygElementContent();
    e.preventDefault();
  }

  selectHtmlMode(e) {
    this.setState({
      mode: 'html'
    });
    this.updateHtmlElementContent();
    e.preventDefault();
  }

  render () {
    return (
      <div className='texteditor'>
        <div className='button-row'>
          <button
            className={ this.state.mode === 'visual'? 'selected' : ''}
            onClick={ this.selectVisualMode.bind(this) }>
              Visual
          </button>
          <button
            className={ this.state.mode === 'html'? 'selected' : ''}
            onClick={ this.selectHtmlMode.bind(this) }>
              HTML
          </button>
        </div>
        <div
          className={ this.state.mode === 'visual'? '' : 'hide'}
          ref={(wysiwygInput) => { this.wysiwygInput = wysiwygInput; }}>
        </div>
        <div
          className={ this.state.mode === 'html'? '' : 'hide'} >
            <pre
              ref={(htmlInput) => { this.htmlInput = htmlInput; }}
              suppressContentEditableWarning={true}
              contentEditable>
                { this.state.htmlContent }
            </pre>
        </div>
      </div>
    );
  }
}