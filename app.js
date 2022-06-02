// elementleri seçme 

const githupForm = document.getElementById("github-form")
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");

const githup = new Github()

const ui = new UI()


evenetListeners()

function evenetListeners() {

    githupForm.addEventListener("submit", getData);
    clearLastUsers.addEventListener("click", clearAllSearched);
    document.addEventListener("DOMContentLoaded", getAllSearched);

}

function getData(e) {

    let username = nameInput.value.trim();
    if (username === "") {
        alert("lütfen geçerli bir kullanıcı adı giriniz")
    } else {
        githup.getGithubData(username)
            .then(response => {
                if (response.user.message === "Not Found") {
                    //hata mesajı
                    ui.showError("KULLANICI BULUNAMADI")
                } else {
                    ui.addSearchedUserToUI(username)

                    
                    Storage.addSearchedUserToStorage(username)
                    ui.showUserInfo(response.user)
                    ui.showRepoInfo(response.repo)
                }
            })
            .catch(err => ui.showError(err))
    }

    ui.clearInput()
    e.preventDefault()
}

function clearAllSearched() {

    //tüm arananları temizle 

    if(confirm("emin misiniz?")){
        //silme işlemi gerçekleştirme 
        Storage.clearAllSearchedUsersFromStorage();// storageden temizleme
        ui.clearAllSearchedFromUI()
    }

}

function getAllSearched() {

    //arananları storagedan al ve ui ekle 
    let users=Storage.getSearchedUsersFromStorage();

    let result="";

    users.forEach(user => {

        result +=`<li class="list-group-item">${user}</li>`
        
    });

    lastUsers.innerHTML=result
}