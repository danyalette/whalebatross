import React from 'react';
import { apiGet } from './utils';
import TextEditor from './text-editor';
import MainMenu from './components/mainmenu/mainmenu';
import PostFeed from './components/postfeed/postfeed';

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
    return (
      <div>
        <MainMenu />
        <h1>Whalebatross</h1>
        <PostFeed posts={this.state.posts} />
        <TextEditor onChange={ this.textEditorChange }/>
      </div>
    );
  }
}