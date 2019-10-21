import { environment } from "./environments/environment";

const firebaseConfig = {
  apiKey: environment.apiKey,
  authDomain: "contact-list-b7f2e.firebaseapp.com",
  databaseURL: "https://contact-list-b7f2e.firebaseio.com",
  projectId: "contact-list-b7f2e",
  storageBucket: "contact-list-b7f2e.appspot.com",
  messagingSenderId: "792076325885",
  appId: "1:792076325885:web:e3c53e1d113312c6a7ff94",
  measurementId: "G-082VLZ2EZB"
};

console.log(firebaseConfig.apiKey)
export default firebaseConfig;