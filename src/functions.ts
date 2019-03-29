import {
  about,
  autor,
  input,
  list,
  search,
  addArea,
  editTaskTextArea,
  areasInTable,
  button,
  items,
  deleteItem,
  check, visibleAdd, editButton, saveButton, submit, userNameInput, userPasswordInput, searchBtn, currentUser
} from './variables';
import { toDoList, users, allUsersToDo, actualId } from './index';
import { fromEvent, of, empty } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { User, userIdCounter } from './classes and interfaces';
import { makeAllStreams } from './streams$';

let done: Array<number> = [];
let addAreaCloseOpen: boolean = false;
let searchCloseOpen: boolean = false;
let emptyArr: Array<any> = [];
let unCheckedArray: Array<object> = [];
let checkedArray: Array<object> = [];
let user: string = '';



function makeOut(arr: any) {
  let out: string = ''
  let counter: number = 0;
  user = localStorage.getItem('actualUser');
  for (let key in arr) {

    if (arr[key].done === true) {
      out += `<div class="item done"><input title="done?" class= "check" type= "checkbox" checked data-counter = ${counter}>`;
    } else {
      out += `<div class="item"><input title="done?" class= "check" type= "checkbox" data-counter = ${counter}>`;
    }
    out += `<span class = "unchecked todoName" title="click fo more info">` + arr[key].task + ` </span>
       <button data-counter = ${counter} class="delete" title="Delete this task"><i data-counter = ${counter} class="fas fa-trash-alt"></i></button>` +
      `<div class="moreInfo"><button class="edit" title="edit description"><i class="fas fa-pencil-alt"></i></button>
       <button class="save" title="save changes"><i class="far fa-save"></i></button>
      <textarea data-counter = ${counter} id="description" class="descriptonArea editArea" readonly>${arr[key].about}</textarea><div class = "date">${arr[key].date}</div>
      </div></div>`;
    list.innerHTML = out;

    counter++;
  }
  currentUser.innerHTML = user;
  makeAllStreams();
}

function makeSearchVisible() {
  let actualId = localStorage.getItem('actualId');
  let toDoList = JSON.parse(localStorage.getItem(`todo${actualId}`));
  if (searchCloseOpen == false) {
    $('#hidenSearch').show(300);
    searchCloseOpen = true;
  } else {
    if (unCheckedArray !== [] || checkedArray !== []) {
      $('#hidenSearch').hide(300);
      searchCloseOpen = false;
      makeOut(toDoList);
    } else {
      $('#hidenSearch').hide(300);
      searchCloseOpen = false;
    }
  }
}

function createNewUser(event: Event) {
  event.preventDefault();
  $('.lds-ring').show(100);
  $('#autorization').css('opacity', '0.5');
  setTimeout(() => {
    let user = new User(Math.round(Math.random() * 1000), `${userNameInput.value}`, `${userPasswordInput.value}`);
    users.push(user); localStorage.setItem('allUsersToDo', JSON.stringify(allUsersToDo));
    localStorage.setItem('Users', JSON.stringify(users));
    localStorage.setItem('actualId', `${user.id}`);
    localStorage.setItem(`todo${user.id}`, '[]');
    localStorage.setItem('logIn', 'true');
    $('.lds-ring').hide(100);
    $('#autorization').hide(300);
    $('#main').show(300);
    // setTimeout(() => {
    //   // makeOut(emptyArr)
    // }, 310);
  }, 1000);

}

function makeSubmit(event: Event) {
  event.preventDefault();
  $('.lds-ring').show(100);
  $('#autorization').css('opacity', '0.5');
  setTimeout(() => {
    $('.lds-ring').hide(100);
    for (let i = 0; i < users.length; i++) {
      if (users[i].userName === userNameInput.value && users[i].userPassword === userPasswordInput.value) {
        localStorage.setItem('logIn', 'true');
        localStorage.setItem('actualId', `${users[i].id}`);
        localStorage.setItem('actualUser', `${users[i].userName}`);
        let toDoList = JSON.parse(localStorage.getItem(`todo${users[i].id}`));

        makeOut(toDoList);
        setTimeout(() => {
          $('#autorization').hide(300);
          $('#main').slideDown(300);
          return
        });


      }
    }
  }, 2000);


  if (userNameInput.value === '' || userPasswordInput.value === '') {
    alert('empty input')
  }

}

function makeLogOut() {
  $('#autorization').css('opacity', '1');
  $('#autorization').show(300);
  $('#main').hide(300);
  $('#hidenSearch').hide(300);
  $('#hidenAdd').slideUp(300);
  localStorage.setItem('logIn', 'false');
  localStorage.setItem('actualId', '');
  localStorage.setItem('actualUser', '');
  user = '';
  list.innerHTML = '';
}

function saveChanges(event: any) {
  let textarea = event.target.parentNode.parentNode.childNodes[4];
  let currentTask: string = event.target.parentNode.parentNode.parentNode.childNodes[1].innerText;
  textarea.innerHTML = textarea.value;
  textarea.classList.remove('editableArea');
  textarea.setAttribute('readonly', '');
  let actualId = localStorage.getItem('actualId');
  let toDoList = JSON.parse(localStorage.getItem(`todo${actualId}`));
  let index = toDoList.findIndex((todo: any) => todo.task === currentTask);
  toDoList[index]['about'] = textarea.value;
  localStorage.setItem(`todo${actualId}`, JSON.stringify(toDoList));
}

function editTask(event: any) {
  let textarea = event.target.parentNode.parentNode.childNodes[4];
  textarea.removeAttribute('readonly');
  textarea.classList.add('editableArea');
}



function makeAddAreaVisible() {
  if (addAreaCloseOpen) {
    addAreaCloseOpen = false
    $('#hidenAdd').slideUp(300);

  } else {
    addAreaCloseOpen = true;
    $('#hidenAdd').slideDown(300);
  }
}

function checkIndex(event: any) {
  let child = event.target;
  let index = child.getAttribute('data-counter');
  return index;
}

export function makeCross(event: any) {
  let target = event.target;
  let parent = target.parentNode;
  let value = +checkIndex(event);
  let actualId = localStorage.getItem('actualId');
  let toDoList = JSON.parse(localStorage.getItem(`todo${actualId}`));
  if (parent.classList.contains('done')) {

    parent.classList.remove('done');
    done.splice(done.indexOf(value), 1);
    localStorage.setItem('done', JSON.stringify(done));
    toDoList[value].done = false;
    localStorage.setItem(`todo${actualId}`, JSON.stringify(toDoList));
  } else {

    parent.classList.add('done');
    done.push(+checkIndex(event));
    localStorage.setItem('done', JSON.stringify(done));
    toDoList[value].done = true;
    localStorage.setItem(`todo${actualId}`, JSON.stringify(toDoList));
  }
}

function makeDel(event: any) {
  let actualId = localStorage.getItem('actualId');
  let toDoList = JSON.parse(localStorage.getItem(`todo${actualId}`));
  let currentTask: string = event.target.parentNode.parentNode.childNodes[1].innerText;
  let index = toDoList.findIndex((x: any) => x.task === currentTask);
  let delBtn = event.target;
  let par = delBtn.parentNode.parentNode;
  par.remove();
  toDoList.splice(index, 1);
  localStorage.setItem(`todo${actualId}`, JSON.stringify(toDoList));
}

function addToDo() {
  let now = new Date();
  if (input.value == '' || about.value == '') {
    return
  } else {
    const todo = {
      task: input.value,
      done: false,
      date: `${now.getFullYear()}.${now.getMonth() + 1}.${now.getDate()} time : ${now.getHours()}:${(now.getMinutes() < 10 ? '0' : '') + now.getMinutes()}`,
      about: `${about.value} `,
    };
    let actualId = localStorage.getItem('actualId');
    let toDoList = JSON.parse(localStorage.getItem(`todo${actualId}`));
    toDoList.push(todo);
    localStorage.setItem(`todo${actualId}`, JSON.stringify(toDoList));
    input.value = ''; about.value = '';
    $('#hidenAdd').hide(200);
    addAreaCloseOpen = false;
    makeOut(toDoList);
  }
}



const getTaskValue = ({ task }: any) =>
  task.toLowerCase();

const isValueMatching = (text: any, query: any) =>
  getTaskValue(text).startsWith(query.toLowerCase());

const getObj = (query: any) =>
  of(

    toDoList.filter((text: any) => isValueMatching(text, query))
  ).pipe(
    delay(100)
  );

const onSuccess = (matchingTasks: any) => makeOut(matchingTasks);


function makeMoreInfo(event: any) {
  let target = event.target;
  let changeIt = target.parentNode.lastElementChild;
  if (changeIt.hasAttribute('visible')) {
    changeIt.removeAttribute('visible');
  } else {
    changeIt.setAttribute('visible', '');
  }
}

function makeOutFiltered(arr: any) {
  let out: string = '';
  user = localStorage.getItem('actualUser');
  for (let key in arr) {

    if (arr[key].done === true) {
      out += `<div class="item done" style = "
    padding-left: 25px;"><input title="done?" class= "check" type= "checkbox" onclick="return false;" checked>`;
    } else {
      out += `<div class="item" style = "
    padding-left: 25px;"><input title="done?" class= "check" type= "checkbox" onclick="return false;">`;
    }
    out += `<span class = "unchecked todoName" title="click fo more info">` + arr[key].task + ` </span>` +
      `<div>
      <textarea id="description" class="descriptonArea editArea" readonly>${arr[key].about}</textarea><div class = "date">${arr[key].date}</div>
      </div></div>`;
    list.innerHTML = out;
  }
  currentUser.innerHTML = user;
}

function makeCkeckedFilter() {
  let actualId = localStorage.getItem('actualId');
  let toDoList = JSON.parse(localStorage.getItem(`todo${actualId}`));
  checkedArray = toDoList.filter((el: any) => el.done === true);
  makeOutFiltered(checkedArray);
}

function makeUnCkeckedFilter() {
  let actualId = localStorage.getItem('actualId');
  let toDoList = JSON.parse(localStorage.getItem(`todo${actualId}`));
  unCheckedArray = toDoList.filter((el: any) => el.done === false);
  makeOutFiltered(unCheckedArray);
}

export {
  checkIndex, makeDel, makeMoreInfo, addToDo, makeOut, getObj, onSuccess, makeAddAreaVisible, editTask, saveChanges,
  makeSubmit, createNewUser, makeLogOut, makeSearchVisible, makeCkeckedFilter, makeUnCkeckedFilter
};
