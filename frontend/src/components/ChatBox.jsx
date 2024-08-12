

import React, { useState } from 'react'

export const ChatBox = ({ chat, name, message, setMessage, handleSubmit, deleteMessage, editMessage }) => {

  const [showOptions, setshowOptions] = useState(false)

  const handleMessageOptions = (id) => {
    setshowOptions(showOptions === id ? null : id)
  }

  return (
    <div className='bg-zinc-900 rounded'>
      <ul className='p-2 h-80 overflow-y-auto'>

        {
          chat.map((message, i) => (
            <li
              key={i}
              className={`my-2 p-2 table text-sm rounded-md flex justify-between items-center ${message.from === name ? 'bg-sky-700 ml-auto' : 'bg-black'}`}
              onClick={() => handleMessageOptions(message.id)}
            >
              <div>
                {message.from !== name && <span className="text-xs text-slate-500 block">{message.from}</span>}
                <span className='text-md'>{message.body}</span>
              </div>
              {message.from === name && showOptions === message.id && (
                <span
                  onClick={() => deleteMessage(message.id)}
                >

                </span>
              )}
              {message.from === name && showOptions === message.id && (
                <span
                  onClick={() => editMessage(message.id)}
                >
                  holaa
                </span>
              )}
            </li>

          ))
        }

      </ul>

      <form
        onSubmit={handleSubmit}
      >
        <div className='flex border-t p-4'>
          <input
            type="textarea"
            placeholder="Write you message.."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border-1 border-zinc-500 px-2 w-full text-black rounded-full"

          />
          <button className='bg-green-500 rounded-full text-xs p-2 m-2' type="submit" disabled={message == ""}>✓</button>
        </div>

      </form>
    </div >
  )
}
