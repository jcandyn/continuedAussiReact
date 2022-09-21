import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyB0srIieo1ihFxwNY4uUtd0G4E3DrvJi80",
    authDomain: "aussi-react.firebaseapp.com",
    databaseURL: "https://aussi-react.firebaseio.com",
    projectId: "aussi-react",
    storageBucket: "aussi-react.appspot.com",
    messagingSenderId: "394999599174",
    appId: "1:394999599174:web:e252a32d426d82df4d3a47",
    measurementId: "G-3DMDP858FM"
}
const Firebase =
    firebase.initializeApp(config)
firebase.firestore().settings({
    timestampsInSnapshots: true
})

export const myFirebase = firebase
export const myFirestore = firebase.firestore()
export const myStorage = firebase.storage()
export default Firebase;
