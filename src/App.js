import logo from './logo.svg';
import './App.css';

import { useState } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, onValue, ref, set } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKTjwPVAmuN-Q66vNMDe-HKoOHb-hJ5bQ",
  authDomain: "fir-example-d8699.firebaseapp.com",
  projectId: "fir-example-d8699",
  storageBucket: "fir-example-d8699.appspot.com",
  messagingSenderId: "999996824985",
  appId: "1:999996824985:web:7773800f92aff28cbac708",
  measurementId: "G-V9YLRL3XFN",
  databaseURL: "https://fir-example-d8699-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);


function sendMessage(userId, message) {
  set(ref(database, 'messages'), {
    userId,
    message
  });
}

function App() {
  const [messages, setMessages] = useState([]);  
  const [userId, setUserId] = useState('');
  const [messageText, setMessageText] = useState('');  
  const messagesRef = ref(database, '/messages');

  onValue(messagesRef, (snapshot) => {
    const data = snapshot.val();
    setMessages(data);
  });

  return (
    <div className="App">
      Realtime
      {JSON.stringify(messages)}

      <div>
        Send a message
        <input type="text" placeholder="User ID" onChange={(e) => { setUserId(e.target.value) }}/>
        <input type="text" placeholder="Message" onChange={(e) => { setMessageText(e.target.value) }}/>
        <input type="button" value="Submit" onClick={() => {sendMessage(userId, messageText)}} />      
      </div>

    </div>
  );
}

export default App;
