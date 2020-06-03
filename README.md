# Pencil Test
By Steven Huang (sq2huang)

Used https://github.com/SinghDigamber/angularfirebase-authentication as starter code.

Create env variables in src/evironments/environment.ts as follows

```json
export const environment = {
    production: false,
    firebase: {
        apiKey: "",
        authDomain: "",
        databaseURL: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: ""
    }
};
```


## Installation Process
Run `npm install` to install all the required dependencies

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.