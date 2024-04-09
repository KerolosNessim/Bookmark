// variables 
var linkName = document.getElementById('linkName');
var linkUrl = document.getElementById('linkUrl');
var myTable = document.getElementById('myTable');
var validationAlert = document.getElementById('validationAlert');
var linkList ;
// check local storage
if (localStorage.getItem('linkList') === null) {
    linkList = [];
} else {
    linkList = JSON.parse(localStorage.getItem('linkList'));
    displayLinks(linkList);
}
// function to add link
function addLink() {
    if (nameValidation()===true&&urlValidation()===true) {
        var link = {
            name: linkName.value,
            url: linkUrl.value
        }
        linkList.push(link);
        validationAlert.classList.replace('d-block', 'd-none')
    }
    else {
        validationAlert.classList.replace('d-none', 'd-block')
        linkUrl.classList.add('is-invalid');
        linkName.classList.add('is-invalid');
    }
    addToLocalStorage();
    displayLinks(linkList);
    clearInputs();
}
//function to display links
function displayLinks(list) {
    var cartona = ``;
    for (var i = 0; i < list.length; i++){
        cartona += `
        <tr>
            <td>${i+1}</td>
            <td>${list[i].name}</td>
            <td><a href="${list[i].url}" target="_blank" class="btn btn-success"><i class="fa-regular fa-eye"></i> Visit</a></td>
            <td><button onclick="deleteLink(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
        </tr>
        `   
    }
    myTable.innerHTML = cartona;
    
}
// function to clear inputs
function clearInputs() {
    linkName.value = "";
    linkUrl.value = "";
    linkName.classList.remove('is-valid');
    linkUrl.classList.remove('is-valid');
}
// function to add to local storage
function addToLocalStorage() {
    localStorage.setItem('linkList', JSON.stringify(linkList));
}
// function to delete link
function deleteLink(index) {
    linkList.splice(index, 1);
    addToLocalStorage()
    displayLinks(linkList);
}
// function to valdiate name link
function nameValidation() {
    var regex = /^[A-Za-z0-9]{3,20}$/;
    if (regex.test(linkName.value)) {
        linkName.classList.add('is-valid');
        linkName.classList.remove('is-invalid');
        return true;
    } else {
        linkName.classList.add('is-invalid');
        linkName.classList.remove('is-valid');

        return false
    }
}
function urlValidation() {
    var regx=/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
    if (regx.test(linkUrl.value)) {
        linkUrl.classList.add('is-valid');
        linkUrl.classList.remove('is-invalid');
        return true;
    } else {
        linkUrl.classList.add('is-invalid');
        linkUrl.classList.remove('is-valid');
        return false
    }
}