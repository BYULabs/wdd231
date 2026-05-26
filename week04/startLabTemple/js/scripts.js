import {temples} from '../data/temples.js'
console.log(temples)

import {url} from '../data/temples.js'
console.log(url)

// Grab a reference to the division where we display the items
const showHere = document.querySelector("#showHere");
// Get a reference to the HTML dialog element
const mydialog = document.querySelector("#mydialog");
const mytitle = document.querySelector("#mydialog h2");
const myinfo = document.querySelector("#mydialog p");
const myclose = document.querySelector("#mydialog button");
myclose.addEventListener("click", () => mydialog.close());

// Loop thought the array of JSON items
function displayItems(data) {
    console.log(data)
    data.forEach(x => {
        console.log(x)
        const photo = document.createElement('img')
        photo.src=`${url}${x.path}`
        photo.alt=x.name
        // Add an event listener to each division of the page
        photo.addEventListener('click', () => showStuff(x));

        showHere.appendChild(photo)
    });
};

// Start displaying all items in the JSON file
displayItems(temples);

// Populate the dialog with information when image is clicked
function showStuff(x) {
    mytitle.innerHTML = x.name
    myinfo.innerHTML = `Dedicated ${x.dedicated} by ${x.person} as temple number ${x.number}`
    mydialog.showModal();
}