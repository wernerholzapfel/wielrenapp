// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiBaseUrl: 'https://wielrenapi.herokuapp.com',
  // apiBaseUrl: 'https://hetwielerspel-api.herokuapp.com',
  // apiBaseUrl: 'https://het-wielerspel-api.onrender.com',
  apiBaseUrl: 'http://localhost:3000',
  firebase: {
    apiKey: 'AIzaSyDqZ6wBr5VZ2w3E0lt1fqaWdGeTLdsaHUM',
    authDomain: 'wielerspel-aec4b.firebaseapp.com',
    databaseURL: 'https://wielerspel-aec4b.firebaseio.com',
    projectId: 'wielerspel-aec4b',
    storageBucket: '',
    messagingSenderId: '121086252622'
  },
  hmr: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
