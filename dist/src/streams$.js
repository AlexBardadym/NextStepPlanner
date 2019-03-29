import { fromEvent } from 'rxjs';
import { button, check, deleteItem, items, search, refreshButton, visibleAdd, editButton, saveButton } from './variables';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { getObj } from './functions';
const todo$ = fromEvent(button, 'click');
const moreInfo$ = fromEvent(items, 'click');
const del$ = fromEvent(deleteItem, 'click');
const checked$ = fromEvent(check, 'change');
const refresh$ = fromEvent(refreshButton, 'click');
const search$ = fromEvent(search, 'input').pipe(debounceTime(500), distinctUntilChanged(), map((e) => e.target.value), filter(text => text.length > 1), tap(query => console.log('Searching : ', query)), switchMap(getObj));
const visibleAdd$ = fromEvent(visibleAdd, 'click');
const editButtonClicked$ = fromEvent(editButton, 'click');
const saveButtonClicked$ = fromEvent(saveButton, 'click');
export { todo$, moreInfo$, del$, checked$, search$, refresh$, visibleAdd$, editButtonClicked$, saveButtonClicked$ };
//# sourceMappingURL=streams$.js.map