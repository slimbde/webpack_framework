import { Post } from './Post';
import './styles/styles.css';
import * as json from './assets/json.json';
import * as $ from 'jquery';
import './babel';


let post = new Post("A new Title");

$('pre').html(post.toString());
$('pre').css({ color: "red" });

console.log("Post to string: ", post.toString());
console.log("JSON: ", json);