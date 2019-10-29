const chatList = document.querySelector('.chat-list');
const chatForm = document.querySelector('.new-chat');
const nameForm = document.querySelector('.new-name');
const updateMessage = document.querySelector('.update-mssg')
const rooms = document.querySelector('.chat-rooms');
//adding chats event liseteners
chatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = chatForm.message.value.trim();
    chatroom.addChat(message).then(() => chatForm.reset()).catch(err => err);
});

//update username
nameForm.addEventListener('submit', e => {
    //prevent default action
    e.preventDefault();
    //get new inputed name and update
    const name = nameForm.name.value.trim();
    chatroom.username = name;
    //show then hide update message
    updateMessage.textContent = 'your username has been updated';
    setTimeout(() => {
        updateMessage.textContent = '';
    }, 3000)
    //save on local storage
    localStorage.setItem('username', name)
    nameForm.reset();
})

//change rooms
rooms.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(data => chatUI.render(data));
    }
})

//check if there is a username in the local storage
const username = localStorage.username ? localStorage.username : 'anon';

//class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);

//get chats and render
chatroom.getChats(data => chatUI.render(data));