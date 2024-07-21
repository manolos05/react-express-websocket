import React from 'react'

export const UserName = ({ createUser, name, setName }) => {
    return (
        <form
            onSubmit={createUser}
            className="bg-zinc-900 p-10 ">
            <input
                value={name}
                placeholder='Ingresa tu nombre'
                onChange={(e) => setName(e.target.value)}
                className="border-2 border-zinc-500 p-2 w-full text-black"
            />
        </form>
    )
}
