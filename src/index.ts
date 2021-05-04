import { Post } from './Post';
import './styles/styles.css';
import * as json from './assets/json.json';
import './babel';


let post = new Post("A new Title");


console.log("Post to string: ", post.toString());
console.log("JSON: ", json);