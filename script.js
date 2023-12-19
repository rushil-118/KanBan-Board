// functionality of add button
let addBtn = document.querySelector('.add-btn');
let modal = document.querySelector('.modal-container');
let addModal = true;
addBtn.addEventListener('click', function () {
    if (addModal) {
        modal.style.display = 'flex'
    }
    else {
        modal.style.display = 'none'
    }
    addModal = !addModal;
})

//functionality of remove button
let rem_btn = document.querySelector('.remove-btn');
let remModal = true;
let btn_color = 0;
rem_btn.addEventListener('click', function (e) {
    if (remModal) {
        e.target.style.color = 'red';
    }
    else {
        e.target.style.color = 'black';
    }
    btn_color = e.target.style.color;
    remModal = !remModal;
})

let main = document.querySelector('.main-content');
main.addEventListener('click', function (e) {
    if (btn_color == 'red') {
        if (e.target.classList[0] == 'main-content') {

        }
        else if (e.target.classList[0] == 'ticket-container') {
            e.target.remove();
        }
        else {
            e.target.parentElement.remove();
        }
    }
})



// Functionality of adding the tickets


let btn = document.querySelector('.color-container');
let lastclicked = ``;
btn.addEventListener('click', function (e) {
    if (e.target.classList != 'color-container') {
        if (lastclicked != '') {
            lastclicked.classList.remove('selected');
        }
        e.target.classList.add('selected');
        lastclicked = e.target;
    }
})

let input = document.querySelector('.text-area');
input.addEventListener('keyup', function (e) {
    let text = input.value;
    if (e.key === 'Enter') {
        if (text != ``) {
            let content = document.createElement('div');
            content.classList.add('ticket-container');
            content.innerHTML = '<div class="ticket-color"></div><div class="ticket-id">id 1</div><div class="task-area"></div>'
            let task = content.querySelector('.task-area');
            task.innerText = text;
            let color = lastclicked.classList[1];
            let tic_color = content.querySelector('.ticket-color');
            tic_color.style.background = color;

            main.appendChild(content);
            modal.style.display = 'none';
            input.value = '';
            lastclicked.classList.remove('selected');
            lastclicked = ``
        }
    }
})

// let input = document.querySelector('.text-area');
// btn.addEventListener('click', function (e) {
//     let text = input.value;
//     if (e.target.classList[0] != 'color-container' && text != ``) {
//         let color = e.target.classList[1];
//         // let content = document.createElement('div');
//         // content.classList.add('ticket-container');
//         // content.innerHTML = '<div class="ticket-color"></div><div class="ticket-id">id 1</div><div class="task-area"></div>'
//         // let task = content.querySelector('.task-area');
//         // task.innerText = text;
//         // let tic_color = content.querySelector('.ticket-color');
//         // tic_color.style.background = color;
//         // main.appendChild(content);

//         generateTicket(text,color);

//         modal.style.display = 'none';
//         input.value = ``;
//         addModal = !addModal;
//     }
// })

// function generateTicket(text,color){
//     let content = document.createElement('div');
//     content.classList.add('ticket-container');
//     content.innerHTML = '<div class="ticket-color"></div><div class="ticket-id">id 1</div><div class="task-area"></div>'
//     let task = content.querySelector('.task-area');
//     task.innerText = text;
//     let tic_color = content.querySelector('.ticket-color');
//     tic_color.style.background = color;
//     main.appendChild(content);
// }

// Functionality of sorting the tickets based on the color
let priority = document.querySelector('.priority-container');
priority.addEventListener('click', function (e) {
    if (e.target.classList[0] != 'priority-container') {
        let color = e.target.classList[1];

        let tickets = document.querySelectorAll('.ticket-container');
        for (let i = 0; i < tickets.length; i++) {
            tickets[i].style.display = 'block'
        }
        for (let i = 0; i < tickets.length; i++) {
            let ticket = tickets[i].querySelector('.ticket-color');
            if (ticket.style.background != color) {
                tickets[i].style.display = 'none';
            }
        }
    }
})
















