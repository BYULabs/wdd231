const openBtn = document.querySelector('#openBtn');
const dialogBox = document.querySelector('#dialogBox');
const closeBtn = document.querySelector('#closeBtn');

// "Show the dialog" button opens the dialog modally
openBtn.addEventListener("click", () => {
    dialogBox.showModal();
});

// "Close" button closes the dialog
closeBtn.addEventListener("click", () => {
    dialogBox.close();
});