import './App.css';
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, push, ref, set } from "firebase/database";

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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function sendMessage(roomId, userId, message) {
  const messagesRef = ref(database, 'messages/' + roomId);
  const newMessageRef = push(messagesRef);

  set(newMessageRef, {
    userId,
    message
  });
}

function App() {
  const [messages, setMessages] = useState([]);  
  const [roomId, setRoomId] = useState('HOME');
  const [userId, setUserId] = useState('');
  const [messageText, setMessageText] = useState('');  

  useEffect(() => {
    const messagesRef = ref(database, '/messages/' + roomId);

    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      setMessages(data);
    });
  }, [roomId]);

  return (
    <div className="App">
      <h1>Realtime Chat</h1>
      <div className="chatWindow">
        {(!messages || messages.length == 0) ? (
          <p>
            Any messages available in the room <div className="roomId">{roomId}</div>, send one.
          </p>
        ) : (
          <div>
            { Object.values(messages).map(({message, userId}) => (
              <div>
                <div className="roomId">{roomId}</div> 
                <div className="userId">{userId}</div>
                <div className="message">{message}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <input type="text" className="textInput" placeholder="Room ID" value={roomId} onChange={(e) => { setRoomId(e.target.value) }}/>
        <input type="text" className="textInput" placeholder="User ID" value={userId} onChange={(e) => { setUserId(e.target.value) }}/>
        <input type="text" className="textInput" placeholder="Message" value={messageText} onChange={(e) => { setMessageText(e.target.value) }}/>
        <input type="button" className="buttonInput" value="Submit" onClick={() => {sendMessage(roomId, userId, messageText)}} />      
      </div>

    </div>
  );
}

export default App;
