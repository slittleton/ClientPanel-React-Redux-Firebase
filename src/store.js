import { createStore, combineReducers, compose } from 'redux';

import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer} from 'redux-firestore';

// reducers
import notifyReducer from './reducers/notifyReducer';
import settingsReducer from './reducers/settingsReducer';

const firebaseConfig = {

    apiKey: "AIzaSyDeJAktsEeAV72L4vsYi-t4CvRqQwC8OLM",
    authDomain: "reactclientpanel-dcdfc.firebaseapp.com",
    databaseURL: "https://reactclientpanel-dcdfc.firebaseio.com",
    projectId: "reactclientpanel-dcdfc",
    storageBucket: "reactclientpanel-dcdfc.appspot.com",
    messagingSenderId: "719933040182"

}

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true //firestore for profile instead of realtime DB
}

//Init firebase instance
firebase.initializeApp(firebaseConfig);
// Init firestore
// const firestore = firebase.firestore();
// const settings = { timestampsInSnapshots: true };
// firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase),
)(createStore)

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  settings: settingsReducer

})

// Check for settings in localStorage
if(localStorage.getItem('settings') == null){
  //Default Settings
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  }

  //Set to LocalStorage
  localStorage.setItem('settings', JSON.stringify(defaultSettings));


}

// Create initial State
const initialState = {settings: JSON.parse(localStorage.getItem('settings'))};

// Create Store

const store = createStoreWithFirebase(rootReducer, initialState, compose(
  window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()
))
;
export default store;