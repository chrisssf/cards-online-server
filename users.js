const users = []

const addUser = ( { id, name, room }) => {
    // if room = "   Best Room Ever   " we want to convert to "best room ever"
    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()

    const existingUser = users.find((user) => user.room === room && user.name === name)

    // if there is already a user with given name this if statement will trigger and return out of function here!
    if(existingUser) {
        return { error : 'Username is taken' }
    }

    const user = { id, name, room }
    users.push(user)

    return { user }
}


const removeUser = (id) => {
    const index = users.findIndex(user => user.id === id)

    if (index !== -1 ) {
        return users.splice(index, 1)[0]
    }
}


const getUser = (id) => {
    return users.find(user => user.id === id)
}


const getUsersInRoom = (room) => {
    return users.filter((user) => user.room === room)
}


module.exports = { addUser, removeUser, getUser, getUsersInRoom }