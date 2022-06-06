const lista = document.querySelector(".list");
const btn = document.querySelector(".btn__add");

const notes = document.querySelector(".notes");
const title = document.querySelector(".title");
const all = document.querySelector(".fipt");

let filtro = "all";

/* ==== LOAD EVENT ===================== */

window.addEventListener("DOMContentLoaded", function () {
    const loadTasks = JSON.parse(localStorage.getItem("savedTasks"))

    if (!loadTasks) {
        return
    }

    for (task of loadTasks) {
        lista.innerHTML += templateTask(task.title, task.notes, task.classe);

    }

});

/* ==== CLICK EVENT ===================== */

window.addEventListener("click", function (e) {
    const el = e.target;

    // ALERT PRIORITY
    if (el.classList.contains("alert")) {
        el.parentNode.classList.toggle("priority");

        switchAlert(el);
        save()
    }

    // BTN ADD
    if (el === btn) {
        e.preventDefault();
        lista.innerHTML += templateTask(title.value, notes.value);

        notes.value = "";
        title.value = "";
        btnDisable('yes')

        if (filtro !== "all") {
            all.click();
        }

        save()
    }

    // BTN DELETE
    if (el.classList.contains("delete")) {
        titulo = el.parentNode;
        titulo.parentNode.remove();

        save()
    }

    // FILTRO
    if (el.classList.contains("fipt")) {
        if (el.value !== filtro) {
            filtro = el.value;
            filtraTasks(filtro);
        }
    }
});

/* ==== KEY EVENT ===================== */

// BTN ADD ENBALE | DISABLE
window.addEventListener("keyup", function () {
    if (title.value.length > 0 && notes.value.length > 0) {
        btnDisable()
    } else {
        btnDisable('yes')
    }
});

/* ==== FUNCTIONS ===================== */

window.addEventListener('change', function(e) {
    const el = e.target

    console.log(el)

    if (el.classList.contains('task__notes')) {
        console.log('Funciono')
        save()
    }
})


/* ==== FUNCTIONS ===================== */

// ICON SWITCH
function switchAlert(alert) {
    const remov = alert.parentNode.querySelector('.delete')

    if (alert.parentNode.classList.contains("priority")) {
        alert.setAttribute("src", "./assets/images/alert-active.svg")
        remov.setAttribute('src', "./assets/images/delete-active.svg")
    }
    else {
        alert.setAttribute("src", "./assets/images/alert.svg");
        remov.setAttribute('src', "./assets/images/delete.svg") 
    }

}

// TASK TEMPLATE
const templateTask = function (title, notes, classe="task") {

    let alerto = ''
    let remov = ''

    if (classe === 'task priority') {
        alerto = './assets/images/alert-active.svg'
        remov = './assets/images/delete-active.svg'
    }

    else {
        alerto = './assets/images/alert.svg'
        remov = './assets/images/delete.svg'
    }


    return `<li class="${classe}">
            <div class="div__title">
                <strong class="task__title">${title}</strong>
                <img src="${remov}" alt="delete" class="delete">  
            </div>
            <textarea
                cols="30"
                rows="10"
                class="notes task__notes"
            >${notes}</textarea>
            <img
                class="alert"
                src="${alerto}"
                alt="alert"
            />
        </li>`;
};

function filtraTasks(filtro) {
    const lista = extraiTasks();

    if (filtro === "normal") {
        for (task of lista) {
            task.classList.contains("priority")
                ? (task.style.display = "none")
                : (task.style.display = "flex");
        }
    } else if (filtro === "priority") {
        for (task of lista) {
            task.classList.contains("priority")
                ? (task.style.display = "flex")
                : (task.style.display = "none");
        }
    } else if (filtro === "all") {
        for (task of lista) {
            task.style.display = "flex";
        }
    }
}

function btnDisable(x) {
    x ? btn.setAttribute("disabled", "") : btn.removeAttribute("disabled");
}

function extraiTasks() {
    return document.querySelectorAll(".task");
}

function save() {
    const lista = extraiTasks();
    const array = [];

    for (task of lista) {
        const title = task.querySelector(".task__title").textContent;
        const notes = task.querySelector(".task__notes");
        const classe = task.classList

        array.push({
            title,
            notes: notes.value,
            classe: String(classe.value)
        });
    }

    localStorage.setItem('savedTasks', JSON.stringify(array))

    console.log(localStorage.getItem('savedTasks'))

}
