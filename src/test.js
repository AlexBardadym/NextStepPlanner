// import { map, delay, tap, filter, debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';
// import {fromEvent, of} from 'rxjs';
//
// let carSearch = document.getElementById('carSearch');
//
// const cars = [
//     {
//         id: 1,
//         brand: 'Ferrari',
//         model: 'F40'
//     },
//     {
//         id: 2,
//         brand: 'Ferrari',
//         model: 'F50'
//     },
//     {
//         id: 3,
//         brand: 'Ferrari',
//         model: 'California'
//     },
//     {
//         id: 4,
//         brand: 'Porsche',
//         model: '911'
//     },
//     {
//         id: 5,
//         brand: 'Porsche',
//         model: 'Panamera'
//     }
// ];
//
// const getCarFullName = ({ brand, model }) =>
//     brand.toLowerCase() + ' ' + model.toLowerCase();
//
// const isCarMatching = (car, query) =>
//     getCarFullName(car).startsWith(query.toLowerCase());
//
// const getCars = query =>
//     of(cars.filter(car => isCarMatching(car, query))).pipe(delay(3000));
//
// const onCarsLoadSuccess = matchingCars => console.log(matchingCars);
//
// const carSearch$ = fromEvent(carSearch, 'input').pipe(
//     debounceTime(1000),
//     distinctUntilChanged(),
//     map(event => event.target.value),
//     filter(query => query),
//     tap(query => console.log('About to make an API call with query: ' + query)),
//     switchMap(getCars)
// );
//
// carSearch$.subscribe(onCarsLoadSuccess);