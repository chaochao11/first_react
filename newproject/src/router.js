import React from 'react';
import { Router, Route } from 'dva/router';
// import IndexPage from './routes/IndexPage';
import Demo from './routes/list-page/list.jsx';
import Add from './routes/add-page/add.jsx';
    function RouterConfig({ history }) {
    return (
    <Router history={history}>
      <Route path="/" component={Demo} />
      <Route path="/add/:id" component={Add} />
    </Router>
  );
}
export default RouterConfig;


