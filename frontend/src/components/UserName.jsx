import React from 'react'

export const UserName = ({ createUser, name, setName }) => {
    return (
        <div>
            <form
                onSubmit={createUser}
                className="bg-zinc-900 p-10 flex">
                <input
                    value={name}
                    placeholder='Ingresa tu nombre'
                    onChange={(e) => setName(e.target.value)}
                    className="border-2 border-zinc-500 p-2 w-full text-black"
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" disabled={name == ""} type="submit"> Ingresar </button>
            </form>
        </div>
    )
}
