// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  firebase: {
    apiKey: "AIzaSyDC9FE5Te4ZwsX4cgq7wFbvzBGSj4Pq6JE",
    authDomain: "iparty-5093b.firebaseapp.com",
    databaseURL: "https://iparty-5093b.firebaseio.com",
    projectId: "iparty-5093b",
    storageBucket: "iparty-5093b.appspot.com",
    messagingSenderId: "650639709519",
    appId: "1:650639709519:web:5d38c52b93b5677df2213a"
  },
  url: {
    //api: 'http://127.0.0.1:3333/api',
    //socket: 'http://127.0.0.1:3000',
    //root: 'http://127.0.0.1:3333/api/root',
    api: 'http://ec2-54-84-72-80.compute-1.amazonaws.com/api',
    root: 'http://ec2-54-84-72-80.compute-1.amazonaws.com/api/root',
    apiSocket: 'http://ec2-54-84-72-80.compute-1.amazonaws.com/socket/',
    socket: 'http://ec2-54-84-72-80.compute-1.amazonaws.com/'
    //socket: 'https://ac6bf24c020d.ngrok.io'
  },
  token: `bearer ${localStorage.getItem('token')}`
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
