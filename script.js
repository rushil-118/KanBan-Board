// functionality of add button
let Btns = document.querySelector('.toolbox-container');
let addBtn = document.querySelector('.add-btn');
let modal = document.querySelector('.modal-container');
let rem_btn = document.querySelector('.remove-btn');
let priority = document.querySelectorAll('.color');
let addModal = true;
let remModal = true;
let clicked = '';
let btn_color = 0;
let remm;
var num;

Btns.addEventListener('click', function (e) {
    let target = e.target;
    let parent = target.parentElement;
    if (parent.classList.contains('add-btn')) {
        if (addModal) {
            modal.style.display = 'flex'
        }
        else {
            modal.style.display = 'none'
        }
        addModal = !addModal;
    }
    if (parent.classList.contains('remove-btn')) {
        remm = target;
        if (remModal) {
            e.target.style.color = 'red';
        }
        else {
            e.target.style.color = 'black';
        }
        btn_color = e.target.style.color;
        remModal = !remModal;
    }
    if (parent.classList.contains('priority-container')) {
        let tickets = document.querySelectorAll('.ticket-container');
        if (e.detail == 1) {
            if (clicked != '') {
                clicked.classList.remove('selected');
            }
            target.classList.add('selected');
            clicked = target;

            let color = target.classList[1];

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
        if (e.detail == 2) {
            clicked.classList.remove('selected');
            clicked = '';
            for (let i = 0; i < tickets.length; i++) {
                tickets[i].style.display = 'block';

            }
        }
    }
})



// let priority = document.querySelector('.priority-container');
// priority.addEventListener('click', function (e) {
//     if (e.target.classList[0] != 'priority-container') {
//         let color = e.target.classList[1];

//         let tickets = document.querySelectorAll('.ticket-container');
//         for (let i = 0; i < tickets.length; i++) {
//             tickets[i].style.display = 'block'
//         }
//         for (let i = 0; i < tickets.length; i++) {
//             let ticket = tickets[i].querySelector('.ticket-color');
//             if (ticket.style.background != color) {
//                 tickets[i].style.display = 'none';
//             }
//         }
//     }
// })


let main = document.querySelector('.main-content');
main.addEventListener('click', function (e) {
    let target = e.target;
    let parent = e.target.parentElement;

    if (btn_color == 'red') {
        if (target.classList[0] == 'main-content') {

        }
        else if (target.classList[0] == 'ticket-container') {
            target.remove();
        }
        else {
            parent.remove();
        }
        btn_color = 'black';
        remm.style.color = 'black';
        remModal = true;
    }
    if (target.classList.contains('ticket-color')) {
        let color = target.classList[1];
        if (num == undefined) {
            for (var i = 0; i < priority.length; i++) {
                if (color == priority[i].classList[1]) {
                    num = i;
                }
            }
        }
        if (num == priority.length - 1) {
            num = 0;
        }
        else {
            num = num + 1;
        }
        let prev_col = e.target.classList[1];
        let new_col = priority[num].classList[1];
        target.classList.remove(prev_col);
        target.classList.add(new_col);
    }

    if (parent.parentElement.classList.contains('icon')) {
        let current_ticket = parent.parentElement.parentElement;
        let unlock = current_ticket.querySelector('.unlock-icon');
        let lock = current_ticket.querySelector('.lock-icon');
        if (parent.classList.contains('lock-icon')) {
            parent.style.display = 'none';
            unlock.style.display = 'block';
            let task = current_ticket.querySelector('.task-area');
            task.setAttribute('contentEditable','True');
        }
        if (parent.classList.contains('unlock-icon')) {
            parent.style.display = 'none';
            lock.style.display = 'block';
            let task = current_ticket.querySelector('.task-area');
            task.setAttribute('contentEditable','False');
        }
    }
    
    // let current_ticket = parent.parentElement.parentElement;
    // let unlock = current_ticket.querySelector('.unlock-icon');
    // if(unlock.style.display == 'block'){
    //     let task = current_ticket.querySelector('.task-area');
    //     task.setAttribute('contentEditable','True');
    // }
    // let lock = current_ticket.querySelector('.lock-icon');
    // if(lock.style.display == 'block'){
    //     let task = current_ticket.querySelector('.task-area');
    //     task.setAttribute('contentEditable','False');
    // }
})

let btn = document.querySelector('.color-container');
let lastclicked = ``;
btn.addEventListener('click', function (e) {
    if (e.detail == 1) {
        if (e.target.classList != 'color-container') {
            if (lastclicked != '') {
                lastclicked.classList.remove('selected');
            }
            e.target.classList.add('selected');
            lastclicked = e.target;
        }
    }

    if (e.detail == 2) {
        lastclicked.classList.remove('selected');
        lastclicked = '';
    }
})

let input = document.querySelector('.text-area');
input.addEventListener('keydown', function (e) {
    let text = input.value;
    if (e.key === 'Enter') {
        if (text == '') {
            text = '';
            alert("Enter Some Task");
        }

        let content = document.createElement('div');
        content.classList.add('ticket-container');
        content.innerHTML = '<div class="ticket-color"></div><div class="ticket-id">id 1</div><div class="task-area"></div><div class="icon"><div class="lock-icon"><i class="fa-solid fa-lock"></i></div><div class="unlock-icon"><i class="fa-solid fa-lock-open"></i></div></div>'
        let id = randomID();
        let ticket_id = content.querySelector('.ticket-id');
        ticket_id.innerText = id;
        let task = content.querySelector('.task-area');
        task.setAttribute("contentEditable","False");
        task.innerText = text;
        let color = lastclicked.classList[1];
        let tic_color = content.querySelector('.ticket-color');
        tic_color.classList.add(color);

        main.appendChild(content);
        modal.style.display = 'none';
        addModal = true;
        input.value = '';
        lastclicked.classList.remove('selected');
        lastclicked = ``;

    }
})

//random id generator

function randomID() {
    let ans = '#';
    arr = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 6; i > 0; i--) {
        ans +=
            arr[(Math.floor(Math.random() * arr.length))];
    }
    return ans;
}




// addBtn.addEventListener('click', function () {
//     if (addModal) {
//         modal.style.display = 'flex'
//     }
//     else {
//         modal.style.display = 'none'
//     }
//     addModal = !addModal;
// })

//functionality of remove button
// let rem_btn = document.querySelector('.remove-btn');
// let remModal = true;
// let btn_color = 0;
// rem_btn.addEventListener('click', function (e) {
//     if (remModal) {
//         e.target.style.color = 'red';
//     }
//     else {
//         e.target.style.color = 'black';
//     }
//     btn_color = e.target.style.color;
//     remModal = !remModal;
// })

// let main = document.querySelector('.main-content');
// main.addEventListener('click', function (e) {
//     if (btn_color == 'red') {
//         if (e.target.classList[0] == 'main-content') {

//         }
//         else if (e.target.classList[0] == 'ticket-container') {
//             e.target.remove();
//         }
//         else {
//             e.target.parentElement.remove();
//         }
//     }
// })

// Functionality of adding the tickets

// let btn = document.querySelector('.color-container');
// let lastclicked = ``;
// btn.addEventListener('click', function (e) {
//     if (e.target.classList != 'color-container') {
//         if (lastclicked != '') {
//             lastclicked.classList.remove('selected');
//         }
//         e.target.classList.add('selected');
//         lastclicked = e.target;
//     }
// })

// let input = document.querySelector('.text-area');
// input.addEventListener('keyup', function (e) {
//     let text = input.value;
//     if (e.key === 'Enter') {
//         if (text != ``) {
//             let content = document.createElement('div');
//             content.classList.add('ticket-container');
//             content.innerHTML = '<div class="ticket-color"></div><div class="ticket-id">id 1</div><div class="task-area"></div>'
//             let task = content.querySelector('.task-area');
//             task.innerText = text;
//             let color = lastclicked.classList[1];
//             let tic_color = content.querySelector('.ticket-color');
//             tic_color.style.background = color;

//             main.appendChild(content);
//             modal.style.display = 'none';
//             input.value = '';
//             lastclicked.classList.remove('selected');
//             lastclicked = ``
//         }
//     }
// })

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

// // Functionality of sorting the tickets based on the color
// let priority = document.querySelector('.priority-container');
// priority.addEventListener('click', function (e) {
//     if (e.target.classList[0] != 'priority-container') {
//         let color = e.target.classList[1];

//         let tickets = document.querySelectorAll('.ticket-container');
//         for (let i = 0; i < tickets.length; i++) {
//             tickets[i].style.display = 'block'
//         }
//         for (let i = 0; i < tickets.length; i++) {
//             let ticket = tickets[i].querySelector('.ticket-color');
//             if (ticket.style.background != color) {
//                 tickets[i].style.display = 'none';
//             }
//         }
//     }
// })
















