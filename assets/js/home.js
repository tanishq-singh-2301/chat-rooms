document.getElementById('share-room-btn').addEventListener('click', e => {
    e.preventDefault();
    const text = `${window.location.href}room/${document.getElementById('roomID').value}`;
    navigator.clipboard.writeText(text);
    alert('URL Copied');
    console.log(text);
});