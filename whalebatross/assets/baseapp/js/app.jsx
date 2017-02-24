import React from 'react';
import { apiGet } from './utils';
import TextEditor from './text-editor';
import MainMenu from './components/mainmenu/mainmenu';

export default class App  extends React.Component {

  constructor(props) {
    super(props);

    var self = this;

    this.state = {
      'posts': null
    };
    apiGet('api/posts/').then(function(data){
      self.setState({
        posts: data.results
      });
    });
  }

  textEditorChange(value) {
    // console.log(value.toString('html'));
  }

  render() {
    if (this.state.posts) {
        var posts = this.state.posts.map(function(post){
            return (
              <div className='post' key={ post.slug }>
                <h2> { post.title } </h2>
                <div><i> { post.author? post.author.username : '' } </i></div>
                <p className='post-content' dangerouslySetInnerHTML={{__html: post.body}}></p>
              </div>
            )
        });
    }
    return (
      <div>
        <MainMenu />
        <h1>Whalebatross</h1>
        <div className='posts'> { posts } </div>
        <TextEditor onChange={ this.textEditorChange }/>
      </div>
    );
  }
}