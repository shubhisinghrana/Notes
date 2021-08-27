console.log("Welcome to newton app.This is practiceApp.js file");

showNotes();

// let addBtn = document.getElementById("addBtn");
// addBtn.addEventListener("click", function () {
//     let addTitle = document.getElementById("addTitle");
//     let addTxt = document.getElementById("addTxt");

//     if (addTitle.value.length < 1) {
//         showAlertMessage("danger", "Please provide a valid title");
//         return;
//     } else if (addTxt.value.length < 1) {
//         showAlertMessage("danger", "Please provide a valid note ");
//         return;
//     }
//     let notes = localStorage.getItem("notes");

//     let notesArr = [];
//     if (notes == null) {
//         notesArr = [];
//     } else {
//         notesArr = JSON.parse(notes);
//     }
//     let myObj = {
//         title: addTitle.value,
//         text: addTxt.value,
//     }

//     notesArr.push(myObj);
//     localStorage.setItem("notes", JSON.stringify(notesArr));
//     addTxt.value = "";
//     addTitle.value = "";
//     // console.log("addTitle.value : "+addTitle.value);
//     // console.log("addTxt.value : "+addTxt.value);
//     showAlertMessage("success", "Note Added Successfully");
//     showNotes();
// });


function addAndUpdateNote(id) {

    let addTitle = document.getElementById("addTitle");
    let addTxt = document.getElementById("addTxt");

    if (addTitle.value.length < 1) {
        showAlertMessage("danger", "Please provide a valid title");
        return;
    } else if (addTxt.value.length < 1) {
        showAlertMessage("danger", "Please provide a valid note ");
        return;
    }
    let notes = localStorage.getItem("notes");

    let notesArr = [];
    if (notes == null) {
        notesArr = [];
    } else {
        notesArr = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addTxt.value,
    }

    if (id === "addBtn") {
       
        notesArr.push(myObj);
       
    } else if (id === "editBtn") {
        let editIndex = document.getElementById("editIndex");
        notesArr[editIndex.value]=myObj
        console.log("edit box ");
        document.getElementById('editBtn').innerText = 'Add Note'
        document.getElementById('editBtn').id = 'addBtn'
    }

    localStorage.setItem("notes", JSON.stringify(notesArr));
    addTxt.value = "";
    addTitle.value = "";
    // console.log("addTitle.value : "+addTitle.value);
    // console.log("addTxt.value : "+addTxt.value);
    showAlertMessage("success", "Note Added Successfully");
    showNotes();
}

function showAlertMessage(type, displayMessage) {
    let alertMessage = document.getElementById("alertMessage");
    console.log("alertMessage" + alertMessage)
    let boldText;
    if (type === "success") {
        boldText = "success";
    } else {
        boldText = "Error!";
    }
    alertMessage.innerHTML = ` <div class="alert alert-${type} alert-dismissible fade show" role="alert">
    <strong>${boldText}:</strong> ${displayMessage}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
    </button>
</div>    `;

    setTimeout(function () {
        alertMessage.innerHTML = "";
    }, 3000);
}

function showNotes() {
    let notes = localStorage.getItem("notes");

    let notesObj = [];
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach((element, index) => {
        html = html + `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.text}</p>
                <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                <button id="${index}" onclick="editNote(this.id)" class="btn btn-primary">Edit Note</button>
            </div>
        </div>
        `;
    });

    let notesElement = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElement.innerHTML = html;
    } else {
        notesElement.innerHTML = `Nothing to show! User "Add a Note" section above to add notes.`;
    }
}

function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    let notesObj = [];
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
    let inputValue = search.value;
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        let cardTitle = element.getElementsByTagName("h5")[0].innerText;
        if (cardTxt.includes(inputValue) || cardTitle.includes(inputValue)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });

});

function editNote(index) {
    let notes = localStorage.getItem("notes");
    console.log(notes);
    let notesObj = [];
    if (notes == null) {
        notesObj = [];
        return;
    } else {
        notesObj = JSON.parse(notes);
    }

    let currNote = notesObj[index];
    console.log(currNote)
    let addTitle = document.getElementById("addTitle");
    let addTxt = document.getElementById("addTxt");
    let editIndex = document.getElementById("editIndex");

    addTitle.value = currNote.title;
    addTxt.value = currNote.text;
    editIndex.value = index;

    document.getElementById('addBtn').innerText = 'Update Note'
    document.getElementById('addBtn').id = 'editBtn'
}

