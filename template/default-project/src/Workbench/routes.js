
import React from 'react';
import { Router, hashHistory } from 'react-router';

const rootRoute = {
  component: 'div',
  childRoutes: [
    {
      path: '/',
      component: require('./App.jsx'),

      getChildRoutes(location, cb) {
        require.ensure([], (require) => {
          cb(null, [
            require('./routes/Foo.jsx'),
            require('./routes/Bar.jsx')
          ]);
        });
      }
    }
  ]
};

export default function Routes() {
  return <Router history={hashHistory} routes={rootRoute} />;
