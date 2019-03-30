import { fromEvent } from 'rxjs';
import {
  button, check, deleteItem, items, search, visibleAdd,
  editButton, saveButton, ckeckedFilter, unckeckedFilter
} from './variables';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { getObj } from './functions';
import {
  makeCross, makeDel, makeMoreInfo, addToDo, onSuccess, makeAddAreaVisible, editTask, saveChanges,
  makeCkeckedFilter, makeUnCkeckedFilter
} from './functions';

const visibleAdd$ = fromEvent(visibleAdd, 'click');
visibleAdd$.subscribe(makeAddAreaVisible);

function makeAllStreams() {
  const todo$ = fromEvent(button, 'click');
  const moreInfo$ = fromEvent(items, 'click');
  const del$ = fromEvent(deleteItem, 'click');
  const checked$ = fromEvent(check, 'change');
  const search$ = fromEvent(search, 'input').pipe(
    debounceTime(500),
    distinctUntilChanged(),
    map((e: KeyboardEvent) => (<HTMLInputElement>e.target).value),
    switchMap(getObj)
  );
  const editButtonClicked$ = fromEvent(editButton, 'click');
  const saveButtonClicked$ = fromEvent(saveButton, 'click');
  const ckeckedFilter$ = fromEvent(ckeckedFilter, 'click');
  const unckeckedFilter$ = fromEvent(unckeckedFilter, 'click');

  todo$.subscribe(addToDo);
  moreInfo$.subscribe(makeMoreInfo);
  del$.subscribe(event => makeDel(event));
  checked$.subscribe(makeCross);
  search$.subscribe(onSuccess);
  editButtonClicked$.subscribe(editTask);
  saveButtonClicked$.subscribe(saveChanges);
  ckeckedFilter$.subscribe(makeCkeckedFilter);
  unckeckedFilter$.subscribe(makeUnCkeckedFilter);
}

export { makeAllStreams };