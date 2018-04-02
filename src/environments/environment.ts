// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyBXoOWTaWdtCTu9P9ME80jPGForplaqGTc",
    authDomain: "mini-dashboard-app.firebaseapp.com",
    databaseURL: "https://mini-dashboard-app.firebaseio.com",
    projectId: "mini-dashboard-app",
    storageBucket: "mini-dashboard-app.appspot.com",
    messagingSenderId: "558989801640"
  }
};
