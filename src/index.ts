import { makeCross, makeDel, makeMoreInfo, addToDo, makeOut, onSuccess, makeAddAreaVisible, editTask, saveChanges } from './functions';
// import { todo$, moreInfo$, del$, checked$, search$, visibleAdd$, editButtonClicked$, saveButtonClicked$ } from './streams$';
import { makeAllStreams } from './streams$'

if (localStorage.getItem('Users') == undefined) {
  localStorage.setItem('Users', '[]');
}

let users: any = [{}];
const allUsersToDo = JSON.parse(localStorage.getItem('allUsersToDo'));
users = JSON.parse(localStorage.getItem('Users'));
let actualId = localStorage.getItem('actualId');
let toDoList: any = [];




localStorage.getItem('logIn') == 'true' ?
  ($('#autorization').css('display', 'none'), $('#main').css('display', 'block')) : (console.log('not logIn'))

if (localStorage.getItem(`todo${actualId}`) != undefined) {
  toDoList = JSON.parse(localStorage.getItem(`todo${actualId}`));
  makeOut(toDoList);
}



export { toDoList, users, allUsersToDo, actualId };