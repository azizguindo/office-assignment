import * as React from 'react';
import * as ReactDOM from 'react-dom';
import InstructorApp from './component/InstructorApp';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
  <InstructorApp />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
