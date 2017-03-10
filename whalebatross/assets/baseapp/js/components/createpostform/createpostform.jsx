import React from 'react';
import { connect } from 'react-redux';
import { createPost } from 'actions/posts';
import Message from 'components/message/message';
import TextEditor from 'components/texteditor/texteditor';
import './createpostform.scss';

class CreatePostForm  extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      formState: null,
      bodyHtml: '<p><br></p>'
    }
  }

  onFieldChange() {
    this.resetFormState();
  }

  resetFormState() {
    this.setState({
      formState: null
    });
  }

  setFormState(state) {
    var self = this;
    self.setState({
      formState: state
    });
    setTimeout(function(){
      self.resetFormState();
    }, 2000);
  }

  handleFormSubmit(e) {
    var self = this;
    e.preventDefault();
    self.props.dispatch(createPost({
      title: this.formTitleInput.value,
      slug: this.formSlugInput.value,
      body: this.state.bodyHtml
    }))
      .then(() => {
        self.setFormState('success');
      })
      .catch(() => {
        self.setFormState('fail');
      })
  }

  handleBodyEditorChange(value) {
    this.setState({
      bodyHtml: value
    });
  }

  render() {
    return (
      <div className='createpostform'>
        <form onSubmit={this.handleFormSubmit.bind(this)}>
          <Message status='success' active={this.state.formState == 'success'}>Successful.</Message>
          <Message status='fail' active={this.state.formState == 'fail'}>Something went wrong.</Message>
          <div className='form-row'>
            <input
              name='title'
              type='text'
              placeholder='My New Post'
              ref={(input) => { this.formTitleInput = input; }}
              onChange={this.onFieldChange.bind(this)}/>
          </div>
          <div className='form-row'>
            <input
              name='slug'
              type='text'
              placeholder='slug'
              ref={(input) => { this.formSlugInput = input; }}
              onChange={this.onFieldChange.bind(this)}/>
          </div>
          <div className='form-row'>
            <TextEditor
              className='texteditor'
              onChange={ this.handleBodyEditorChange.bind(this) }
              value={ this.state.bodyHtml }/>
          </div>
          <div className='form-row'>
            <input name='submit' type='submit' value='submit' />
          </div>
        </form>
      </div>
    );
  }
}

CreatePostForm = connect()(CreatePostForm);

export default CreatePostForm;