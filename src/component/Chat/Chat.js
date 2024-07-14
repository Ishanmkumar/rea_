import React, { useState, useEffect } from 'react'
import socketIO from 'socket.io-client'
import './Chat.css'
import sendLogo from '../../images/send.png'
import { user } from '../Join/Join';
import Message from '../Message/Message';
import ReactScrollToBottom from 'react-scroll-to-bottom'
import closeIcon from '../../images/closeIcon.png'

const ENDPOINT = "http://localhost:4500/";

let socket;

const Chat = () => {

  const [id, setid] = useState("");
  const [messages, setMessages] = useState([])

  const send = () => {
      const message = document.getElementById('chatInput').value;
      socket.emit('message', { message, id });
      document.getElementById('chatInput').value = "";
  }

  console.log(messages);
  useEffect(() => {
      socket = socketIO(ENDPOINT, { transports: ['websocket'] });

      socket.on('connect', () => {
          setid(socket.id);

      })
      console.log(socket);
      socket.emit('joined', { user })

      socket.on('welcome ', (data) => {
          setMessages([...messages, data]);
          console.log(data.user, data.message);
      })

      socket.on('userJoined', (data) => {
          setMessages([...messages, data]);
          console.log(data.user, data.message);
      })

      socket.on('leave', (data) => {
          setMessages([...messages, data]);
          console.log(data.user, data.message)
      })

      return () => {
          socket.disconnect();
          socket.off();
      }
  }, [messages])

  useEffect(() => {
      socket.on('sendMessage', (data) => {
          setMessages([...messages, data]);
          console.log(data.user, data.message, data.id);
      })
      return () => {
          socket.off();
      }
  }, [messages])

    
  return (
    <div className="chatPage">
    <div className="chatContainer">
        <div className="header">
            <h2>Chitchat</h2>
            <a href="/"> <img src={closeIcon} alt="Close" /></a>
        </div>
        <ReactScrollToBottom className="chatBox">
            {messages.map((item, i) => <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />)}
        </ReactScrollToBottom>
        <div className="inputBox">
            <input onKeyPress={(event) => event.key === 'Enter' ? send() : null} type="text" id="chatInput" />
            <button onClick={send} className="sendBtn"><img src={sendLogo} alt="Send" /></button>
        </div>
    </div>

</div>

  )
}

export default Chat