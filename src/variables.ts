import { makeSubmit, createNewUser, makeLogOut, makeSearchVisible } from './functions';


const button = <HTMLElement>document.getElementById('add');
const input = <HTMLInputElement>document.getElementById('in');
const list = <HTMLElement>document.getElementById('out');
const deleteItem = <HTMLCollection>document.getElementsByClassName('delete');
const autor = <HTMLInputElement>document.getElementById('autor');
const about = <HTMLInputElement>document.getElementById('about');
const items = document.getElementsByClassName('unchecked');
const check = document.getElementsByClassName('check');
const search = <HTMLInputElement>document.getElementById('search');
const visibleAdd = document.getElementById('visibleAdd');
const addArea = document.getElementById('inputs');
const editButton = document.getElementsByClassName('edit');
let editTaskTextArea = <HTMLTextAreaElement>document.getElementById('editTaskTextArea');
const saveButton = document.getElementsByClassName('save');
const areasInTable = document.getElementsByClassName('editArea');
const mainArea = document.getElementById('main');
const submit = document.getElementById('submit');
submit.addEventListener('click', makeSubmit);
let userNameInput = <HTMLInputElement>document.getElementById('userName');
let userPasswordInput = <HTMLInputElement>document.getElementById('userPassword');
const newUserButton = <HTMLButtonElement>document.getElementById('newUser');
newUserButton.addEventListener('click', createNewUser);
const logOutButton = <HTMLButtonElement>document.getElementById('logOutButton');
logOutButton.addEventListener('click', makeLogOut);
const searchBtn = <HTMLButtonElement>document.getElementById('searchBtn');
searchBtn.addEventListener('click', makeSearchVisible);
const currentUser = <HTMLElement>document.getElementById('currentUser');
const ckeckedFilter = document.querySelector('[data-checked]');
const unckeckedFilter = document.querySelector('[data-unchecked]');




export {
  button, input, list, deleteItem, autor, about, items, check, search, visibleAdd, addArea, editButton,
  editTaskTextArea, saveButton, areasInTable, mainArea, submit, userNameInput, userPasswordInput, logOutButton, searchBtn,
  currentUser, ckeckedFilter, unckeckedFilter
};