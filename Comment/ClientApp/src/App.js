import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { CommentBox } from './components/CommentBox';
import {CommentList} from './components/CommentList'

import './custom.css'
import { EditCommentRow } from './components/EditCommentRow';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/commentBox' component={CommentBox} />
        <Route path='/commentlist' component={CommentList} />
        <Route exact path='/editComment/:id' component={EditCommentRow}></Route>
            


      </Layout>
    );
  }
}
