import { makeCross, makeDel, makeMoreInfo, addToDo, makeOut, onSuccess, makeAddAreaVisible, editTask, saveChanges } from './functions';
import { todo$, moreInfo$, del$, checked$, search$, refresh$, visibleAdd$, editButtonClicked$, saveButtonClicked$ } from './streams$';
let toDoList = [];
if (localStorage.getItem(`todo${actualId}`) != undefined) {
    toDoList = JSON.parse(localStorage.getItem(`todo${actualId}`));
    makeOut(toDoList);
}
todo$.subscribe(addToDo);
moreInfo$.subscribe(makeMoreInfo);
del$.subscribe(event => {
    makeDel(event);
});
checked$.subscribe(makeCross);
search$.subscribe(onSuccess);
refresh$.subscribe(() => {
    if (localStorage.getItem(`todo${actualId}`) != undefined) {
        toDoList = JSON.parse(localStorage.getItem(`todo${actualId}`));
        makeOut(toDoList);
    }
});
visibleAdd$.subscribe(makeAddAreaVisible);
editButtonClicked$.subscribe(editTask);
saveButtonClicked$.subscribe(saveChanges);
export { toDoList };
//# sourceMappingURL=index.js.map