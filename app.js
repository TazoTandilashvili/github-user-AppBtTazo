'use strict'
// change text color function
const changetextColor = function () {
    const allText = document.querySelectorAll('.all--text');
    allText.forEach(function (allTexts) {
        allTexts.classList.toggle('darkTextColor');
    })
}
// 


// change logo color
function changeLogo() {
    let logo = document.querySelector('.logo');
    logo.classList.toggle('lightColor');
}
// change background color 
function changeBg() {
    const bgColor = document.body;
    bgColor.classList.toggle("dark-mode");
}
// them text color change
function themeBtns() {
    const themeBtn = document.querySelector('.theme')
    themeBtn.classList.toggle('darkTextColor')
}
// them icon/name image change
function themIconFnc() {
    const tmTit = document.querySelector('.theme ');
    const themIcon = document.getElementById('mode--icon');
    if (themIcon.src.endsWith("/assets/icon-moon.svg")) {
        themIcon.src = "/assets/icon-sun.svg";
        tmTit.innerText = 'light';
    } else {
        themIcon.src = "/assets/icon-moon.svg";
        tmTit.innerText = 'Dark'
    }
}
//section dark mode customize
function darkContainer() {
    const ligthContainer = document.querySelectorAll('.ligthContainer');
    const searchInput = document.querySelector('.search--input');
    ligthContainer.forEach(function (ligthContain) {
        ligthContain.classList.toggle('darkContainer')
    })

}
// Profile--Insights dark mode
function insights() {
    const prfInsg = document.querySelector('.Profile--Insights');
    prfInsg.classList.toggle('dark-mode');
}

// dark theme switch button
const them = document.querySelector('.theme--change');
them.addEventListener('click', function () {
    changetextColor();
    changeLogo();
    changeBg();
    themeBtns();
    themIconFnc();
    darkContainer();
    insights();
})
// fetch api 
// search addEventListener
const searchBtn = document.querySelector('.search--btn')
const searchInput = document.querySelector('.search--input');

// error display
const userNtFnd = document.querySelector('.error');
//  user info 
const avatar = document.querySelector('#logoimg');
const name = document.querySelector('.name ');
const nickname = document.querySelector('.nickname');
const joined = document.querySelector('.joined ');
const bio = document.querySelector('.bio ');
const repo = document.querySelector('.repoNum');
const followers = document.querySelector('.followeNum')
const following = document.querySelector('.followingNum ')
// check contact info
const locations = document.querySelector('.location')
const portfolio = document.querySelector('.github')
const twiter = document.querySelector('.twiter');
const company = document.querySelector('.company--name');
// change href
const link = document.querySelector('#link');
function contactCheck(data, contact) {
    if (data == null || data == "") {
        contact.innerText = 'Not Avaliable';
        contact.classList.add('notAvaliable')
    } else {
        contact.innerText = data
        contact.classList.remove('notAvaliable')

    }
}

searchBtn.addEventListener('click', function () {
    let userName = searchInput.value;
    fetch(`https://api.github.com/users/${userName}`)
        .then(response => response.json())
        .then(data => {
            // error if user is not defined
            if (data.message === "Not Found") {
                userNtFnd.classList.remove('displayNone');
            } else if (data.message !== "Not Found" || data == "") {
                userNtFnd.classList.add('displayNone');
                // avatar logo img
                avatar.src = data.avatar_url;
                // name
                name.innerText = data.name;
                // username
                nickname.innerText = `@${data.login}`;
                // join date
                let myDate = new Date(data.created_at);
                let getDate = myDate.getDate();
                let getYear = myDate.getFullYear();
                // get getMonth
                const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                let getMonth = month[myDate.getMonth()];
                joined.innerText = `joined ${getDate} ${getMonth} ${getYear}`;
                // bio  
                bio.innerText = data.bio;
                // repository
                repo.innerText = data.public_repos
                // followers
                followers.innerText = data.followers;
                // following
                following.innerText = data.following;
                // contact info if doesnot exist
                contactCheck(data.company, company);
                contactCheck(data.blog, portfolio);
                link.href = data.blog;
                contactCheck(data.twitter_username, twiter)
                contactCheck(data.location, locations)

            }
        })


})



