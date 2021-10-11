const socket = io();
window.onload = (name) => {
    var name = null;
    const chats = document.querySelector('#chats');

    while (name === null) {
        name = prompt("What's your name? ");
        if (name.length < 3) {
            alert('Too short');
            name = null;
        }
    }

    document.getElementById('name').innerText = name;

    const addMsg = (data) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <p class="jt-1">${data.name}</p>
            <p class="jt-2">&ensp;${data.text_msg}</p>
        `;
        div.setAttribute('class', 'just-text');
        document.getElementById('chats').appendChild(div);

        chats.scrollTo({ top: chats.scrollHeight, behavior: 'smooth' });
    }

    document.getElementById('form').addEventListener('submit', (e) => {
        e.preventDefault();

        const text_msg = document.getElementById('text-msg').value;
        var roomID = window.location.pathname.split('/room/')[1];

        socket.emit('msg', { roomID, data: { text_msg, name } });
        addMsg({ name, text_msg });

        document.getElementById('text-msg').value = ""
    });

    socket.on('msg', res => addMsg(res.data));

}