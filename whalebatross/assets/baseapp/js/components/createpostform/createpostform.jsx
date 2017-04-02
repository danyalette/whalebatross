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
      bodyHtml: '<p><br></p>',
      file: null
    }
  }

  onFieldChange() {
    this.resetFormState();
  }

  onFileSelect(e) {
    let self = this;
    let file = e.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.onload = function (e) {
        self.setState({
          file: {
            name: file.name,
            src: e.target.result
          }
        });
      }
      reader.readAsDataURL(file);
    }
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
    var formData = new FormData();
    formData.append('title', this.formTitleInput.value);
    formData.append('body', this.state.bodyHtml);
    if (this.formFileInput.files.length) formData.append('image', this.formFileInput.files[0]);
    self.props.dispatch(createPost(formData))
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
          <div className='form-row'>
            <h4> Title </h4>
            <input
              name='title'
              type='text'
              placeholder='My New Post'
              ref={(input) => { this.formTitleInput = input; }}
              onChange={this.onFieldChange.bind(this)}/>
          </div>
          <div className='form-row'>
            <h4> Image </h4>
            { this.state.file?
                <div className='fileinput-preview'>
                  <img src={ this.state.file.src } />
                  <div> { this.state.file.name } </div>
                </div>
              : ''
            }
            <div className='fileinput-wrap'>
              <input
                id='fileinput'
                type='file'
                accept='image/*'
                ref={(input) => { this.formFileInput = input; }}
                onChange={this.onFileSelect.bind(this)}/>
                <label htmlFor='fileinput'>+ select featured image</label>
            </div>
          </div>
          <div className='form-row'>
            <h4> Content </h4>
            <TextEditor
              className='texteditor'
              onChange={ this.handleBodyEditorChange.bind(this) }
              value={ this.state.bodyHtml }/>
          </div>
          <Message status='success' active={this.state.formState == 'success'}>Successful.</Message>
          <Message status='fail' active={this.state.formState == 'fail'}>Something went wrong.</Message>
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