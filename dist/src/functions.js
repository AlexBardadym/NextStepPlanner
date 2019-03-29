import { about, autor, input, list, addArea } from './variables';
import { toDoList } from './index';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
let done = [];
let addAreaCloseOpen = false;
//test
function saveChanges(event) {
    let description = document.getElementById('description');
    console.log(description.value);
}
function editTask(event) {
    // let targetRow = event.target.parentNode.lastChild.lastChild.lastChild;
    let description = document.getElementById('description');
    description.removeAttribute('readonly');
    console.log(description);
}
function makeAddAreaVisible() {
    if (addAreaCloseOpen == false) {
        addArea.style.display = 'flex';
        addAreaCloseOpen = true;
    }
    else {
        addArea.style.display = 'none';
        addAreaCloseOpen = false;
    }
}
function checkIndex(event) {
    let child = event.target;
    let index = child.getAttribute('data-counter');
    return index;
}
export function makeCross(event) {
    let target = event.target;
    // let nextElem = target.nextSibling;
    let parent = target.parentNode;
    let value = +checkIndex(event);
    if (parent.classList.contains('done')) {
        parent.classList.remove('done');
        done.splice(done.indexOf(value), 1);
        localStorage.setItem('done', JSON.stringify(done));
        toDoList[value].done = false;
        localStorage.setItem(`todo${actualId}`, JSON.stringify(toDoList));
    }
    else {
        parent.classList.add('done');
        done.push(+checkIndex(event));
        localStorage.setItem('done', JSON.stringify(done));
        toDoList[value].done = true;
        localStorage.setItem(`todo${actualId}`, JSON.stringify(toDoList));
    }
}
function makeDel(event) {
    let delBtn = event.target;
    let par = delBtn.parentNode.parentNode;
    par.removeChild(delBtn.parentNode); //need to find index of object and change array toDoList
    let delIndex = checkIndex(event);
    toDoList.splice(delIndex, 1);
    localStorage.setItem(`todo${actualId}`, JSON.stringify(toDoList));
}
function addToDo() {
    let now = new Date();
    if (input.value == '' || autor.value == '' || about.value == '') {
        return;
    }
    else {
        const todo = {
            // id:0,
            task: input.value,
            done: false,
            date: `${now.getFullYear()}.${now.getMonth() + 1}.${now.getDate()} time : ${now.getHours()}:${now.getMinutes()}`,
            autor: `${autor.value} `,
            about: `${about.value} `,
        };
        toDoList.push(todo);
        localStorage.setItem(`todo${actualId}`, JSON.stringify(toDoList));
        console.log(toDoList);
        makeOut(toDoList);
    }
}
function makeOut(arr) {
    let out = '';
    let counter = 0;
    for (let key in toDoList) {
        if (arr[key].done === true) {
            out += `<div class="item done"><input title="done?" class= "check" type= "checkbox" checked data-counter = ${counter}>`;
        }
        else {
            out += `<div class="item"><input title="done?" class= "check" type= "checkbox" data-counter = ${counter}>`;
        }
        out += '<span class = "unchecked todoName" title="click fo more info">' + arr[key].task + ` </span></td><td><span class = "autorName">` + arr[key].autor + `</span>
        <div class="descripton">` + arr[key].about + `</div>
       <button data-counter = ${counter} class="delete" title="Delete this task">del</button>` +
            `<div class="moreInfo"><button class="edit" title="edit description"><i class="fas fa-pencil-alt"></i></button>
       <button class="save" title="save changes"><i class="far fa-save"></i></button><table class="tg">\n` +
            `  <tr>\n` +
            `    <td class="tg-hmp3">Task name</td>\n` +
            `    <td class="tg-hmp3">Author</td>\n` +
            `    <td class="tg-hmp3">Description</td>\n` +
            `    <td class="tg-hmp3">Date</td>\n` +
            `  </tr>\n` +
            `  <tr>\n` +
            `    <td class="tg-0lax"><textarea class="taskNameArrea editArea" readonly>${arr[key].task}</textarea></td>\n` +
            `    <td class="tg-0lax"><textarea class="authorNameArrea editArea" readonly>${arr[key].autor}</textarea></td>\n` +
            `    <td class="tg-lqy61"><textarea id="description" class="descriptonArea editArea" readonly>${arr[key].about}</textarea></td>\n` +
            `    <td class="tg-lqy6"><textarea class="dateArrea" readonly>${arr[key].date}</textarea></td>\n` +
            `  </tr></table></div></div>`;
        list.innerHTML = out;
        counter++;
        // arr[key].id = counter;    //add id/ check it
    }
}
const getTaskValue = ({ task }) => task.toLowerCase();
const isValueMatching = (text, query) => getTaskValue(text).startsWith(query.toLowerCase());
const getObj = (query) => of(toDoList.filter((text) => isValueMatching(text, query))).pipe(delay(100));
const onSuccess = (matchingTasks) => {
    console.log(matchingTasks);
    makeOut(matchingTasks);
};
function makeMoreInfo(event) {
    let target = event.target;
    let changeIt = target.parentNode.lastElementChild;
    if (changeIt.hasAttribute('visible')) {
        changeIt.removeAttribute('visible');
    }
    else {
        changeIt.setAttribute('visible', '');
    }
}
export { checkIndex, makeDel, makeMoreInfo, addToDo, makeOut, getObj, onSuccess, makeAddAreaVisible, editTask, saveChanges };
//# sourceMappingURL=functions.js.map