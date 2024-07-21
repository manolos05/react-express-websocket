import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { UserName } from './components/UserName.jsx'
import { ChatBox } from './components/ChatBox.jsx'
import { v4 as uuidv4 } from 'uuid';

const socket = io('/')

function App() {

  const [message, setMessage] = useState("")
  const [chat, setChat] = useState([])
  const [name, setName] = useState("")
  const [activeChat, setActiveChat] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const newMessage = {
      id: uuidv4(),
      body: message,
      from: name
    }
    setChat([...chat, newMessage])
    socket.emit('message', newMessage)
    setMessage("")
  }

  const createUser = (e) => {
    e.preventDefault()
    setActiveChat(true)
  }

  const reciveMessage = (message) => {
    setChat((state) => [...state, message])
  }

  const deleteMessage = (id) => {
    const messageToDelete = chat.find((msg) => msg.id === id);
    if (messageToDelete && messageToDelete.from === name) {
      socket.emit('deletemessage', id);
    } else {
      console.log("You can only delete your own messages");
    }
  };

  const handleDeletedMessage = (id) => {
    setChat((prevChat) => prevChat.filter((message) => message.id !== id));
  };

  useEffect(() => {
    socket.on('message', reciveMessage)
    socket.on('deleted', handleDeletedMessage)
    return () => {
      socket.off("message", reciveMessage)
      socket.off('deleted', handleDeletedMessage);
    }
  }, [])


  return (
    <div className="h-screen bg-zinc-800 text-white flex justify-center items-center  ">

      {!activeChat ?

        <UserName createUser={createUser} name={name} setName={setName} />
        :
        <ChatBox chat={chat} name={name} message={message} setMessage={setMessage} handleSubmit={handleSubmit} deleteMessage={deleteMessage} />

      }
    </div>


  )
}

export default App
