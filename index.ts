// import { Observable } from 'rxjs';
//
// /* create a new observable, providing the observer. */
// const observable: Observable<string> = new Observable(observer => {
//     const interval = setInterval(() => {
//         observer.next('Hello from Observableland!');
//     }, 2000);
//
//     // teardown
//     return () => {
//         clearInterval(interval);
//     };
// });
//
// /* Subscribe to Notifications. */
// observable.subscribe(value => console.log(value));



// import { Observable } from "rxjs";
//
// /* create a new observable, providing the observer. */
// const observable: Observable<number> = new Observable((observer) => {
//     console.log('%cNew subscription created', 'background: #222; color: #bada55');
//     let i = 0;
//
//     const interval = setInterval(() => {
//         observer.next(i++);
//     }, 1000);
//
//     return () => {
//         clearInterval(interval);
//     };
// });
//
// /* Each subscription receives a copy of Observer. */
// const subscription = observable.subscribe((value) =>
//   console.log('First subscription', value)
// );
// setTimeout(
//   () =>
//     subscription.add(
//       observable.subscribe((value) => console.log('Second subscription', value))
//     ),
//   500
// );
//
// /* Unsubscribe after 5 seconds. */
// setTimeout(() => {
//     subscription.unsubscribe();
// }, 5000);

// import axios from 'axios';
// import { map } from 'rxjs/operators';
//
// interface UserResponse {
//     data: {
//         id: number;
//         email: string;
//         first_name: string;
//         last_name: string;
//         avatar: string;
//     };
// }
//
// const user = axios
//   .get<UserResponse>('https://reqres.in/api/users/2')
//   .then((response) => response.data)
//   .then((data) => {
//       console.log(data);
//       return data;
//   });
//
// const sub1 = user.subscribe(console.log);
// const sub2 = user.subscribe(console.log);


// import { ajax } from "rxjs/ajax";
// import { map } from "rxjs/operators";
// import {Subject} from "rxjs";
//
// interface UserResponse {
//     data: {
//         id: number;
//         email: string;
//         first_name: string;
//         last_name: string;
//         avatar: string;
//     };
// }
//
// const user = ajax
//   .getJSON<UserResponse>("https://reqres.in/api/users/2")
//   .pipe(map((response) => response.data));
//
// const userSubject = new Subject();
// const sub1 = userSubject.subscribe(console.log);
// const sub2 = userSubject.subscribe(console.log);

// user.subscribe(userSubject);

// import { ConnectableObservable, Observable, Subject } from 'rxjs';
// import { multicast, takeUntil, } from 'rxjs/operators';
//
// const completeSubject = new Subject<void>();
//
// /* Create a new observable, providing the observer. */
// const observable = new Observable<number>((observer) => {
//     console.log('%cNew subscription created', 'background: #222; color: #bada55');
//
//     let i = 0;
//     const interval = setInterval(() => {
//         observer.next(i++);
//     }, 1000);
//
//     return () => {
//         clearInterval(interval);
//     };
// }).pipe(takeUntil(completeSubject));
//
// const subject = new Subject<number>();
// const multicasted = observable.pipe(
//   multicast(subject)
// ) as ConnectableObservable<number>;
//
// /* Each subscription receives a copy of Observer. */
// multicasted.subscribe((value) => console.log('First subscription', value));
// multicasted.subscribe((value) => console.log('Second subscription', value));
//
// /* Connect the subject to the observabe. */
// multicasted.connect();
//
// /* Complete the observable after 5 seconds. */
// setTimeout(() => {
//     completeSubject.next();
//     completeSubject.complete();
// }, 5000);


// import { connectable, interval, Observable, Subject } from "rxjs";
//
// const subject = new Subject();
// const observable = interval(1000);
// observable.subscribe((v) => console.log(v));
//
// const conn = connectable(observable);
// conn.connect();
//
// conn.subscribe(subject);
// subject.subscribe({
//     next: (d) => {
//         console.log("q" + d)
//         if(d === 7) subject.complete()
//     }
// });

// import { ConnectableObservable, Observable, Subject } from 'rxjs';
// import { multicast, refCount } from 'rxjs/operators';
//
// /* Create a new observable, providing the observer. */
// const observable = new Observable<number>((observer) => {
//   console.log('%cNew subscription created', 'background: #222; color: #bada55');
//
//   let i = 0;
//   const interval = setInterval(() => {
//     observer.next(i++);
//   }, 1000);
//
//   return () => {
//     clearInterval(interval);
//   };
// });
// observable.subscribe(value => console.log('ssss'+value))
// /** Create the ConnectableObservable. */
// const subject = new Subject<number>();
// const multicasted = observable.pipe(
//   multicast(subject),
//   refCount()
// );
//
// /* Each subscription receives a copy of Observer. */
// const subscription = multicasted.subscribe((value) =>
//   console.log('First subscription', value)
// );
// subscription.add(
//   multicasted.subscribe((value) => console.log('Second subscription', value))
// );
//
// /* Complete the observable after 5 seconds. */
// setTimeout(() => subscription.unsubscribe(), 5000);


// import { ConnectableObservable, interval, Subject } from "rxjs";
// import { multicast, refCount } from "rxjs/operators";
//
// const subject = new Subject();
// const observable = interval(1000);
//
// observable.subscribe((v) => console.log("v" + v));
//
// const multicasted = observable.pipe(multicast(subject), refCount());
// const subscr = multicasted.subscribe((v) => console.log("c" + v));
// subscr.add(multicasted.subscribe(console.log))
//
// setTimeout(() => subscr.unsubscribe(), 5000);

// import { ConnectableObservable, Observable } from 'rxjs';
// import { publish, refCount } from 'rxjs/operators';
//
// /* Create a new observable, providing the observer. */
// const observable = new Observable<number>((observer) => {
//   console.log('%cNew subscription created', 'background: #222; color: #bada55');
//
//   let i = 0;
//   const interval = setInterval(() => {
//     observer.next(i++);
//   }, 1000);
//
//   return () => {
//     clearInterval(interval);
//   };
// });
//
// /** Create the ConnectableObservable. */
// const multicasted = observable.pipe(
//   publish(),
//   refCount()
// ) as ConnectableObservable<number>;
//
// /* Each subscription receives a copy of Observer. */
// const subscription = multicasted.subscribe((value) =>
//   console.log('First subscription', value)
// );
// subscription.add(
//   multicasted.subscribe((value) => console.log('Second subscription', value))
// );
//
// /* Complete the observable after 5 seconds. */
// setTimeout(() => subscription.unsubscribe(), 5000);

// import { interval, Subject } from "rxjs";
// import { publish, refCount } from "rxjs/operators";
//
// const subject = new Subject();
// const observable = interval(1000);
// observable.subscribe((v) => console.log("v" + v));
//
// const multiple = observable.pipe(
//   publish(),
//   refCount()
// );
//
// const multiSub = multiple.subscribe(subject)
//
// subject.subscribe({
//   next:(v)=> console.log('qq', v)
// })
//
// setTimeout(()=> multiSub.unsubscribe(),5000)

// import { AsyncSubject } from 'rxjs';
//
// /* create an instance of AsyncSubject. */
// const asyncSubject = new AsyncSubject<number>();
//
// /* Subscribe to subject. */
// asyncSubject.subscribe({
//   next: (value) => console.log('before:', value),
//   error: console.error,
//   complete: () => console.log('complete before')
// });
//
// /* Emit some values. */
// asyncSubject.next(1);
// asyncSubject.next(2);
// asyncSubject.next(3);
//
// /* Subscribe late to subject. */
// asyncSubject.subscribe({
//   next: (value) => console.log('after:', value),
//   error: console.error,
//   complete: () => console.log('complete after')
// });
//
// /*
//  * Complete the observable stream.
//  * If we do not complete, the AsyncSubject will never emit a next notification.
//  */
// asyncSubject.complete();


// import { AsyncSubject, fromEvent } from 'rxjs';
// import { first, tap } from 'rxjs/operators';
//
// const body = document.querySelector('body')!;
// const clicks = fromEvent(body, 'mousedown').pipe(
//   tap((event: MouseEvent) => console.log(event.pageX, event.pageY))
// );
//
// /**
//  * 1. Create a new AsyncSubject and specify the generic type
//  *    `MouseEvent` for the next notification..
//  */
// const asyncSubject = new AsyncSubject<MouseEvent>();
//
// /**
//  * 2. Subscribe to the `AsyncSubject` and set the `x` and `y`
//  *    input values to the `pageX` and `pageY` values from the
//  *    `MouseEvent` object.
//  */
// const x = document.querySelector('#x') as HTMLInputElement;
// const y = document.querySelector('#y') as HTMLInputElement;
// asyncSubject.subscribe((event) => {
//   x.value = event.pageX.toString();
//   y.value = event.pageY.toString();
// });
//
// /**
//  * 3. Subscribee to the `clicks` observable using the `AsyncSubject`
//  *    instance as the Observer.
//  */
// clicks.subscribe(asyncSubject);
//
// /**
//  * 4. Complete the `AsyncSubject` when the button is clicked.
//  */
// const btn = document.querySelector('#btn') as HTMLButtonElement;
// fromEvent(btn, 'click')
//   .pipe(
//     first(),
//     tap(() => {
//       // complete AsyncSubject
//       asyncSubject.complete();
//     })
//   )
//   .subscribe();

// import { BehaviorSubject } from 'rxjs';
//
// try {
//   /* Create an instance of BehaviorSubject. */
//   const behaviorSubject = new BehaviorSubject<number>(0);
//
//   /* Subscribe to subject. */
//   behaviorSubject.subscribe({
//     next: (value) => console.log('before:', value),
//     error: (error) => console.error('before', error),
//     complete: () => console.log('complete before')
//   });
//
//   /* Emit some values. */
//   behaviorSubject.next(1);
//   behaviorSubject.next(2);
//   behaviorSubject.next(3);
//   behaviorSubject.error(new Error());
//   behaviorSubject.complete();
//
//   /* Subscribe late to subject. */
//   behaviorSubject.subscribe({
//     next: (value) => console.log('after:', value),
//     error: (error) => console.error('after:', error),
//     complete: () => console.log('complete after')
//   });
//
//
//
// }catch (e) {
//   console.log(e)
// }

// import { BehaviorSubject, fromEvent } from 'rxjs';
// import { map, scan } from 'rxjs/operators';
//
// /**
//  * 1. Create a new BehaviorSubject, specify the generic type
//  *    `number`, and set the seed value to `0`.
//  */
// const behaviorSubject = new BehaviorSubject<number>(0);
//
// /**
//  * 2. Use the `scan()` operator to sum the values emitted
//  *    by the BehaviorSubject.
//  *
//  * 3. Subscribe to the BehaviorSubject and set the value
//  *    property for the `sum` input.
//  */
// const sum = document.getElementById('sum') as HTMLInputElement;
// behaviorSubject
//   .pipe(scan<number, number>((prev, value) => prev + value, 0))
//   .subscribe((value) => (sum.value = value.toString()));
//
// /**
//  * 4. Use the `fromEvent()` operator to add an event listener to
//  *    both the `add` and `sub` button elements.
//  *
//  * 5. Use the `map()` operator to map the MouseEvent to either a
//  *    positive 1 or a negative 1 for the add and subtract buttons
//  *    respectively.
//  *
//  * 6. Subscribe to the event stream for both buttons  and set the
//  *    Observer to the `BehaviorSubject` instance.
//  */
// const add = document.getElementById('add') as HTMLButtonElement;
// const sub = document.getElementById('sub') as HTMLButtonElement;
// fromEvent(add, 'click')
//   .pipe(map(() => 1))
//   .subscribe(behaviorSubject);
// fromEvent(sub, 'click')
//   .pipe(map(() => -1))
//   .subscribe(behaviorSubject);



// import { ReplaySubject } from 'rxjs';
//
// /* Create an instance of ReplaySubject. */
// const replaySubject = new ReplaySubject<number>();
//
// /* Subscribe to subject. */
// replaySubject.subscribe({
//   next: (value) => console.log('before:', value),
//   error: (error) => console.error('before', error),
//   complete: () => console.log('complete before')
// });
//
// /* Emit some values. */
// replaySubject.next(1);
// replaySubject.next(2);
// replaySubject.next(3);
//
// /* Subscribe late to subject. */
// replaySubject.subscribe({
//   next: (value) => console.log('after:', value),
//   error: (error) => console.error('after:', error),
//   complete: () => console.log('complete after')
// });
//
// /* Complete the observable stream. */
// replaySubject.complete();

// import { ReplaySubject } from 'rxjs';
//
// /* Create an instance of ReplaySubject. */
// const replaySubject = new ReplaySubject<number>(2);
//
// /* Subscribe to subject. */
// replaySubject.subscribe({
//   next: (value) => console.log('before:', value),
//   error: (error) => console.error('before', error),
//   complete: () => console.log('complete before')
// });
//
// /* Emit some values. */
// replaySubject.next(1);
// replaySubject.next(2);
// replaySubject.next(3);
//
// /* Subscribe late to subject. */
// replaySubject.subscribe({
//   next: (value) => console.log('after:', value),
//   error: (error) => console.error('after:', error),
//   complete: () => console.log('complete after')
// });
//
// replaySubject.next(4);
// replaySubject.next(5);
// replaySubject.next(6);
// /* Complete the observable stream. */
// replaySubject.complete();


// import { ReplaySubject, fromEvent } from 'rxjs';
// import { map, scan } from 'rxjs/operators';
//
// /**
//  * Create a new ReplaySubject and specify the generic type
//  * `number`.
//  */
// const replaySubject = new ReplaySubject<number>();
//
// /**
//  * Using the `fromEvent()` creation operator we add an event
//  * listener to both the `add` and `sub` buttons.
//  * For each click we `map()` to either a positive 1 or a negative
//  * 1 appropriately.
//  * Finally, we subscribe to the click event Observable and set
//  * the `replaySubject` as the Observer.
//  */
// const add = document.getElementById('add') as HTMLButtonElement;
// const sub = document.getElementById('sub') as HTMLButtonElement;
// fromEvent(add, 'click')
//   .pipe(map(() => 1))
//   .subscribe(replaySubject);
// fromEvent(sub, 'click')
//   .pipe(map(() => -1))
//   .subscribe(replaySubject);
//
// /**
//  * Again, using the `fromEvent()` creation operator we add an event
//  * listener to the `calc` button.
//  * When the user clicks the calc button we want to begin calculating
//  * the sum of each click on the `add` or `sub` buttons.
//  * The `replaySubject` will replay all previous next notification values
//  * and we will continue to calculate the sum for future next notifications.
//  */
// const sum = document.getElementById('sum') as HTMLInputElement;
// const calc = document.getElementById('calc') as HTMLButtonElement;
// calc.addEventListener('click', () => {
//   replaySubject
//     .pipe(scan<number, number>((prev, value) => prev + value, 0))
//     .subscribe((total) => (sum.value = total.toString()));
// });



// import { webSocket } from 'rxjs/webSocket';
//
// /** Create a new WebSocketSubject using the webSocket operator. */
// const webSocketSubject = webSocket<string>('wss://echo.websocket.org');
//
// /** Send a message prior to opening the connection (subscribing). */
// webSocketSubject.next('first');
//
// /** Subscribe to the WebSocketSubject. */
// webSocketSubject.subscribe({
//   error: e => console.error(e),
//   next: console.log,
//   complete: () => console.log('complete')
// });
//
// /** Send additional messages after opening the connection. */
// webSocketSubject.next('second');
// webSocketSubject.next('third');
//
// /** After a few seconds close the WebSocket connection. */
// window.setTimeout(() => {
//   webSocketSubject.complete();
// }, 2000);
//
// import { webSocket } from 'rxjs/webSocket';
//
// /**
//  * 1. Create a new WebSocketSubject using the webSocket operator,
//  *    and set the url to `wss://ws.postman-echo.com/raw`
//  */
// const WebSocketSubject = webSocket<string>({
//   url: 'wss://ws.postman-echo.com/raw'
// });
// /**
//  * 2. Send a message prior to opening the connection (subscribing).
//  */
// WebSocketSubject.next('Hii');
// /**
//  * 3. Subscribe to the WebSocketSubject.
//  */
// WebSocketSubject.subscribe({
//   next: (d) => console.log('d' + d)
// });
// /**
//  * 4. Send additional messages after opening the connection.
//  */
// WebSocketSubject.next('else');
// WebSocketSubject.next('some else');


// import {Observable, Observer} from "rxjs";
//
// const observable = new Observable((observer: Observer<number>) => {
//   throw new Error('Oops!');
//   observer.next(1);
// });
//
// observable.subscribe({
//   next: (value) => console.log(value),
//   error: (e) => console.error(e),
//   complete: () => console.log('complete')
// });


// import { of, Subject, throwError } from 'rxjs';
// import { mergeMap, tap } from 'rxjs/operators';
//
// const subject = new Subject<number>();
//
// subject
//   .pipe(
//     mergeMap((value) =>
//       value > 1
//         ? throwError(new Error('Error emitted by throwError'))
//         : of(value)
//     ),
//     tap((value) => console.log('tap', value))
//   )
//   .subscribe({
//     error: (e) => console.error('observer', e),
//     next: (value) => console.log('next', value),
//     complete: () => console.log('complete')
//   });
//
// subject.next(1);
// subject.next(2);


// import { Subject } from 'rxjs';
// import { tap } from 'rxjs/operators';
//
// const subject = new Subject<number>();
//
// subject
//   .pipe(
//     tap((value) => {
//       if (value > 1) {
//         throw new Error('Error emitted by throwError');
//       }
//     }),
//     tap((value) => console.log('tap', value))
//   )
//   .subscribe({
//     error: (e) => console.error('observer', e),
//     next: (value) => console.log('next', value),
//     complete: () => console.log('complete')
//   });
//
// subject.next(1);
// subject.next(2);


// import { fromEvent, throwError } from 'rxjs';
// import { ajax } from 'rxjs/ajax';
// import { mergeMap, tap } from 'rxjs/operators';
//
// /**
//  * DOM elements
//  */
// const login = document.getElementById('login') as HTMLFormElement;
// const email = document.getElementById('email') as HTMLInputElement;
// const password = document.getElementById('password') as HTMLInputElement;
//
// /**
//  * 1. Use the `fromEvent()` operator to add an event listener
//  *    to the `login` form element's `submit` event.
//  * 2. Use the `tap()` operator to invoke the `preventDefault()`
//  *    method on the SubmitEvent object.
//  * 3. Use the `mergeMap()` operator and if the value of the
//  *    `login` or `password` input elements is falsey then throw
//  *    an error using the `throwError()` operator.
//  *    If the values are truthy then use the `ajax.pos()` method
//  *    to post the email and password values to the API.
//  * 4. Subscribe to the Observable and provide an Observer.
//  */
// fromEvent(login, 'submit')
//   .pipe(
//     tap((event) => event.preventDefault()),
//     mergeMap(() =>
//       !email.value || !password.value
//         ? throwError(new Error('Invalid email or password'))
//         : ajax.post('https://reqres.in/api/login', {
//           email: email.value,
//           password: password.value
//         })
//     )
//   )
//   .subscribe({
//     error: (e) => console.error('observer', e),
//     next: (value) => console.log('next', value),
//     complete: () => console.log('complete')
//   });

// import { defer, Subject, throwError } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';
//
// const subject = new Subject<number>();
//
// defer(() => {
//   console.log('defer');
//   return subject;
// })
//   .pipe(
//     tap((value) => {
//       if (value > 1) {
//         throw new Error('Error emitted by throw');
//       }
//     }),
//     catchError((error, caught) => {
//       console.error('catchError', error);
//       return throwError(error);
//     })
//   )
//   .subscribe({
//     error: (e) => console.error('observer', e),
//     next: (value) => console.log('next', value),
//     complete: () => console.log('complete')
//   });
//
// subject.next(1);
// subject.next(2);

// import { fromEvent, throwError } from 'rxjs';
// import { ajax } from 'rxjs/ajax';
// import { catchError, mergeMap, tap } from 'rxjs/operators';
//
// const login = document.getElementById('login') as HTMLFormElement;
// const email = document.getElementById('email') as HTMLInputElement;
// const password = document.getElementById('password') as HTMLInputElement;
// fromEvent(login, 'submit')
//   .pipe(
//     tap((event) => event.preventDefault()),
//     mergeMap((event) =>
//       ajax
//         .post('https://reqres.in/api/login', {
//           email: email.value,
//           password: password.value
//         })
//         .pipe(
//           catchError((error) => {
//             debugger;
//             console.error(error);
//             return throwError(error);
//           })
//         )
//     )
//   )
//   .subscribe({
//     error: (e) => console.error('observer', e),
//     next: (value) => console.log('next', value),
//     complete: () => console.log('complete')
//   });

// import { Subject, throwError } from 'rxjs';
// import { catchError, finalize, tap } from 'rxjs/operators';
//
// const subject = new Subject<number>();
//
// subject
//   .pipe(
//     tap((value) => {
//       if (value > 1) {
//         throw new Error('Error emitted by throw');
//       }
//     }),
//     catchError(error => {
//       console.error('catchError', error);
//       return throwError(error).pipe(
//         tap(null, (error) => {
//           console.log('tap', error);
//         })
//       );
//     }),
//     finalize(() => console.log('finalize'))
//   )
//   .subscribe({
//     error: (e) => console.error('observer', e),
//     next: (value) => console.log('next', value),
//     complete: () => console.log('complete')
//   });
//
// subject.next(1);
// subject.next(2);


// import { Subject, throwError, defer } from 'rxjs';
// import { catchError, finalize, retry, tap } from 'rxjs/operators';
//
// const subject = new Subject<void>();
//
// defer(() => {
//   console.log('defer');
//   return subject;
// })
//   .pipe(
//     tap(() => {
//       throw new Error('Error emitted by throw');
//     }),
//     catchError((error) => {
//       console.error('catchError', error);
//       return throwError(error);
//     }),
//     retry(2),
//     finalize(() => console.log('finalize'))
//   )
//   .subscribe({
//     error: (e) => console.error('observer', e),
//     next: (value) => console.log('next', value),
//     complete: () => console.log('complete')
//   });
//
// subject.next();
// subject.next();
// subject.next();



// import { fromEvent, throwError } from 'rxjs';
// import { ajax } from 'rxjs/ajax';
// import {
//   catchError,
//   finalize,
//   map,
//   mergeMap,
//   retry,
//   tap
// } from 'rxjs/operators';
//
// /** The UserResponse represents the shape of the response from the API. */
// interface UserResponse {
//   data: {
//     id: number;
//     email: string;
//     first_name: string;
//     last_name: string;
//     avatar: string;
//   };
// }
//
// /** The random function returns a random integer inclusively between `min` and `max`. */
// function random(max: number, min: number): number {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }
//
// const output = document.getElementById('output') as HTMLTextAreaElement;
// const btn = document.getElementById('btn') as HTMLButtonElement;
//
// /**
//  * 1. After the `map()` operator that returns a random integer between 10 and 15,
//  *    use the `mergeMap()` operator, which will receive the `id` of the user to
//  *    fetch.
//  * 2. Within the `mergeMap()` operator use the `ajax.getJSON()` method to make
//  *    an HTTP GET request to the API for the specified user id:
//  *      `https://reqres.in/api/users/${id}`
//  * 3. Use the `map()` operator to map the response to its `data` property.
//  * 4. Use the `catchError()` operator to catch an error, and update the `output`
//  *    textarea's `value` with the error's `message` property value.
//  *    Then, rethrow the error using the `throwError()` operator.
//  * 5. Use the `retry()` operator to retry errors from the API and to prevent
//  *    the Observable of the click events from completion via the error notification.
//  * 6. Use the `finalize()` operator to add the `cursor-not-allowed` and `opacity-50`
//  *    classes to the `btn` element when the retry count has extinguished.
//  */
//
// /**
//  * Hints:
//  * - Note the `next()` callback function in the Observer.
//  *   You can use similar code in the `catchError()` callback function
//  *   in order to update the textarea value and scroll the textarea
//  *   to the bottom.
//  * - Use the `Element.classList` property on the `btn` element to add
//  *   the necessary classes.
//  */
//
// fromEvent(btn, 'click')
//   .pipe(
//     map(() => random(10, 15)),
//     mergeMap((id) => {
//       return ajax.get<UserResponse>(`https://reqres.in/api/users/${id}`).pipe(
//         map(({ response }) => response.data),
//         catchError((error) => {
//           output.value = error;
//           output.scrollTop = output.scrollHeight;
//           console.log('err', error);
//           return throwError(error);
//         })
//       );
//     }),
//     retry(4),
//     finalize(() => {
//       btn.classList.add('cursor-not-allowed');
//       btn.classList.add('opacity-50');
//     })
//   )
//   .subscribe({
//     error: (e) => console.error('observer', e),
//     next: (value) => {
//       output.value += `\n\n${JSON.stringify(value, null, 2)}`;
//       output.scrollTop = output.scrollHeight;
//     },
//     complete: () => console.log('complete')
//   });

// import { of, throwError } from "rxjs";
// import { ajax } from "rxjs/ajax";
// import { catchError, mergeMap, retryWhen } from "rxjs/operators";
//
// const source = ajax.getJSON(`https://reqres.in/api/users/20`).pipe(
//   catchError((error) => {
//     console.error("catchError", error);
//     return throwError(error);
//   }),
//   retryWhen((notifier) =>
//     notifier.pipe(
//       mergeMap((error, index) => {
//         if (index < 2 && error.status === 404) {
//           return of(null);
//         }
//         return throwError(error);
//       })
//     )
//   )
// );
//
// window.setTimeout(() => {
//   source.subscribe({
//     error: (e) => console.error("observer", e),
//     next: console.log,
//     complete: () => console.log("complete")
//   });
// }, 2000);




