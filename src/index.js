import {JSXComponent} from 'metal-jsx';
import App from './App';

let root = document.createElement('div');

root.id = 'root';
document.body.appendChild(root);

JSXComponent.render(<App />, document.getElementById('root'));