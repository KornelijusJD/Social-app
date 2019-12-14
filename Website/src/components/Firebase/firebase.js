import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
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
      this.db = app.database();
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
    
    test = () => {return this.auth.currentUser;}

    // *** Merge Auth and DB User API *** //
    onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();
            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = {};
            }
            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser,
            };
            next(authUser);
          });
      } else {
        fallback();
      }
    });


    // *** User API ***
    
    user = uid => this.db.ref(`users/`+uid);
  
    users = () => this.db.ref('users');

    // *** Article API ***

    article = aid => this.db.ref('articles/'+aid);

    articles = () => this.db.ref('articles/');

    // *** Event API ***

    event = eid => this.db.ref('events/'+eid);
    events = () => this.db.ref('events/');
  }
  
  export default Firebase;