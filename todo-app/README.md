## FIREBASE 확장

### Initialize

#### 1. Module Setup
[Setup](https://firebase.google.com/docs/web/setup)

```shell
npm install --save firebase
```

#### 2. Module Import
[Import](https://firebase.google.com/docs/web/setup#add-sdks-initialize)

```javascript
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
  // ...
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
```

### Firestore

[ADD](https://firebase.google.com/docs/firestore/quickstart?authuser=0#add_data)

### front-back-DB연동

1. Frontend 경로
 ~/todo-ap/todo-app-front/todo-app (master)

2. Backend 경로
 ~/todo-app/todo-app-back/DIY_server (master)

