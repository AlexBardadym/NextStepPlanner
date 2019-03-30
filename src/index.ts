import { makeOut } from './functions';

let users: any = [{}];
users = JSON.parse(localStorage.getItem('Users'));
let actualId = localStorage.getItem('actualId');
let toDoList: any = [];

if (localStorage.getItem('Users') == undefined) {
  localStorage.setItem('Users', '[]');
}

if (localStorage.getItem('logIn') == 'true') {
  $('#autorization').css('display', 'none'), $('#main').css('display', 'block');
}

if (localStorage.getItem(`todo${actualId}`) != undefined) {
  toDoList = JSON.parse(localStorage.getItem(`todo${actualId}`));
  makeOut(toDoList);
}

export { toDoList, users, actualId };