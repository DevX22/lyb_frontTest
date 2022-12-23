// Chcek out Damian Denis on Dribbble
// https://dribbble.com/shots/5587903-ECHO-Voice-chat-for-gamers

var socket = io.connect("http://localhost:3200/");
socket.on("res", function (data) {
  console.log(data);
});

var elInput = document.querySelector('.chat__conversation-panel__input');
elInput.addEventListener('keyup', function(e) {
  var keycode = e.keyCode || e.which;
  if (keycode == 13) {
    sedMenssage();
  }
});

const sedMenssage = function () {
  let messageText = document.querySelector('.chat__conversation-panel__input').value;
  messageText=messageText.trim();
  if (messageText.length === 0) {
    return false;
  }
  socket.emit("ask", {
    "msg": messageText
  });
  addHtmlMessage(messageText);
  document.querySelector('.chat__conversation-panel__input').value = '';
  document.querySelector('.chat__conversation-panel__input').focus();
}

function addHtmlMessage(msg) {
  let doc = document.querySelector('.chat__conversation-board');
  doc.insertAdjacentHTML("beforeend",htmlReturn(msg));
}

function htmlReturn(msg) {
  var htmlR = `<div class="chat__conversation-board__message-container reversed"><div class="chat__conversation-board__message__person"><div class="chat__conversation-board__message__person__avatar"><img src="https://randomuser.me/api/portraits/men/9.jpg" alt="Dennis Mikle"/></div><span class="chat__conversation-board__message__person__nickname">Dennis Mikle</span></div><div class="chat__conversation-board__message__context"><div class="chat__conversation-board__message__bubble"> <span>${msg}</span></div></div><div class="chat__conversation-board__message__options"><button class="btn-icon chat__conversation-board__message__option-button option-item emoji-button"><svg class="feather feather-smile sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg></button><button class="btn-icon chat__conversation-board__message__option-button option-item more-button"><svg class="feather feather-more-horizontal sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg></button></div></div>`;
  return htmlR;
}

