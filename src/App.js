import React, { useState, useEffect } from "react";
import { FormControl, Input, IconButton } from "@material-ui/core";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    setUsername(prompt("Entrez votre nom"));
  }, []);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="App container">
      <img
        src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100"
        alt="messenger"
      />
      <h1>Messenger</h1>
      <h2>Bienvenue {username || "Anonyme"}</h2>

      <div id="message_border" className="message_border">
        <FlipMove>
          {messages.map(({ message, id }) => (
            <Message username={username} key={id} message={message} />
          ))}
        </FlipMove>
      </div>

      <form className="app_form">
        <FormControl className="app_formControl">
          <Input
            className="app_input"
            placeholder="Entrez un message"
            onChange={handleInput}
            value={input}
            type="text"
          />
          <IconButton
            className="app_iconButton"
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
    </div>
  );
}

export default App;
