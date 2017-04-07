import React from 'react';
import { connect } from 'react-redux';
import { createPost } from 'actions/posts';
import { getCategories } from 'actions/categories';
import Message from 'components/message/message';
import TextEditor from 'components/texteditor/texteditor';
import './createpostform.scss';

class CreatePostForm  extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      formState: null,
      bodyHtml: '<p><br></p>',
      file: null,
      categoriesSelection: {}
    }
    this.props.dispatch(getCategories());
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

  getCheckboxHandler(slug) {
    return (e) => this.onCheckboxChange(e, slug)
  }

  onCheckboxChange(e, slug) {
    this.setState({
      categoriesSelection: {
        ...this.state.categoriesSelection,
        [slug]: e.target.checked
      }
    });
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
    self.props.dispatch(createPost(this.getFormData()))
      .then(() => {
        self.setFormState('success');
      })
      .catch(() => {
        self.setFormState('fail');
      })
  }

  getFormData() {
    let formData = new FormData();
    formData.append('title', this.formTitleInput.value);
    formData.append('body', this.state.bodyHtml);
    this.props.categories.map((c) => {
      if (this.state.categoriesSelection[c.slug])
        formData.append('categories_ids', c.slug)
    });
    if (this.formFileInput.files.length)
      formData.append('image', this.formFileInput.files[0]);
    return formData;
  }

  handleBodyEditorChange(value) {
    this.setState({
      bodyHtml: value
    });
  }

  makeCategoryId(slug) {
    return 'input-category-' + slug;
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
          <div className='form-row inputs-categories'>
            <h4> Categories </h4>
            { this.props.categories.map((c) => {
                let id = this.makeCategoryId(c.slug);
                return (
                  <div key={ c.slug }>
                    <input
                      value={ c.slug }
                      id={ id }
                      type='checkbox'
                      onChange={ this.getCheckboxHandler(c.slug) } />
                    <label htmlFor={ id }> { c.title } </label>
                  </div>
                )
              })
            }
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

CreatePostForm = connect(
  (state) => { return { categories: state.categories } }
)(CreatePostForm);

export default CreatePostForm;