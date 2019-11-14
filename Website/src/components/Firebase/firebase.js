import app from 'firebase/app';
import 'firebase/auth';
const config = {
    /*apiKey: "AIzaSyBTX_HAeLBvZnZgKsLN42qJVhVrt9oJUrk",
    authDomain: "myturnonthexbox.firebaseapp.com",
    databaseURL: "https://myturnonthexbox.firebaseio.com",
    projectId: "myturnonthexbox",
    storageBucket: "myturnonthexbox.appspot.com",
    messagingSenderId: "822770441943",
    appId: "1:822770441943:web:e43cbdf0be3e33db665a92"*/
    apiKey: "AIzaSyBUpVtjr3muUw0SZiAnCZw6GiOymNYtXTE",
    authDomain: "self-careapp.firebaseapp.com",
    databaseURL: "https://self-careapp.firebaseio.com",
    projectId: "self-careapp",
    storageBucket: "self-careapp.appspot.com",
    messagingSenderId: "282929307014",
    appId: "1:282929307014:web:748b6579f4e73131606007",
    measurementId: "G-ZVYY0X1M7Q"
  };

  class Firebase {
    constructor() {
      app.initializeApp(config);

      this.auth = app.auth();
    }
    // *** Auth API ***
    doCreateUserWithEmailAndPassword = (email, password) =>
     this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
     this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
    doPasswordUpdate = password =>
     this.auth.currentUser.updatePassword(password);
    
  }
  export default Firebase;