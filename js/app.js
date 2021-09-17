/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

/*  During coding, www.w3schools.com, developer.mozilla.org, www.codegrepper.com, www.youtube.com,
    www.javascripttutorial.net, www.codepen.io have been used as a reference.
*/

// Here five global variables and one array declared to store values for reusability in methods
let navList, links, anchorLink, sectionId, mainSections, target;
let targetNo = 1;
const navSections = [];

//const navSections1 = ["Section1", "Section2", "Section3","Section4"];
//const navSections = document.getElementsByTagName('section');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/* Here helper functions build to construct the navigation and append them to the actual HTML document */

// getParent method help to get the unordered list under the header tag
function getParent(){
    return document.querySelector("#navbar__list");
}

// getMenuParent method help to return the nav element with a class of navbar__menu
function getMenuParent(){
    return document.querySelector(".navbar__menu");
}

// insertMenu method take in the navigation menu build below and append it to the parent element
function insertMenu(menu){
    const parent = getMenuParent();
    scrollToAnchor();
    return parent.appendChild(menu);
}

// extractSections method help to get the sections from the page and push it to the array declared globally
function extractSections(){
    mainSections = document.getElementsByTagName('section');

    for(let index in mainSections){
        if(index < mainSections.length){
            navSections.push(mainSections[index].id);
        }
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

/*  build the nav: this method builds the dynamic navigation menu and actually insert the menu by calling the
    insertMenu method
*/
function buildNavigation(navGrid){
    for(let navSection in navSections){
        navList = document.createElement("li");
        links = document.createElement("a");
        
        //links.href = navSections[navSection].toLowerCase();
        links.innerHTML = navSections[navSection];
        links.classList.add("menu__link");
        //links.id = navSections[navSection];

        navList.appendChild(links);
        navGrid.appendChild(navList);
        document.body.append(navGrid);
    }

    insertMenu(navGrid);
}

// Add class 'active' to section when near top of viewport

/*  this method help to track the application by taking the active indicated index passed from the calling method
    and put or append 'active' string in the class of the given links and sections
*/
function trackApp(index) {
    const current = document.getElementsByClassName("menu__link");

    for(let i in current){
        if(i != index){
            links[i].classList.add("menu__link");
            mainSections[i].classList.remove("active");
        }
        else{
            links[index].classList.add("active");
            mainSections[index].classList.add("active");
        }
    }
}

// Scroll to anchor ID using scrollTO event

/*  This method build the detail parts of the links, indicate the anchorLink, get the target element and
    tell the browser to scroll to a particular section in the page when the click event fired.
*/
function scrollToAnchor(){
    for(let navSection in navSections){
        sectionId = "#" + navSections[navSection].toLowerCase();
        anchorLink = document.getElementById(navSections[navSection]);
        links = document.getElementsByClassName("menu__link");
        links[navSection].href = sectionId;
        target = document.getElementById("section" + targetNo);

        links[navSection].addEventListener("click", (event) => {
            trackApp(navSection);
            target.scrollIntoView({behavior: "smooth"});
        }, false);

        targetNo++;
    }
}

/*
    This function helps to track visitor's scroll position (up or down) of the window and the page sections, and
    indicate which section has focus in the navigation by hightlighting the associated link. For this specific
    smooth scrolling method, I adapted the code from (https://codepen.io/dbilanoski/pen/LabpzG) and slightly
    modified to save time.
*/

function trackOnScroll(){
    let pageScrollPositionY = window.pageYOffset; // get current scroll position

    for(let mainSection in mainSections){
        const secHeight = mainSections[mainSection].offsetHeight; // get the offsetheight position of the section
        const secTop = mainSections[mainSection].offsetTop - 60; // get the offsettop position of the section
        sectionId = mainSections[mainSection].id; // get ID values of each sections while scrolling

        // check if current scroll position enters the area under focus and add active state to the link
        if(pageScrollPositionY <= 0 || (pageScrollPositionY >= 0 && pageScrollPositionY <= 300)) {
            // whenever scrolling until second section, section-1 link is indicated
            links[0].classList.add("active");
        } else if(pageScrollPositionY > secTop && pageScrollPositionY <= secTop + secHeight) {
            links[mainSection].classList.add("active");
        } else {
            // or remove the active state from the section when the user scrolls up or down
            links[mainSection].classList.remove("active");
        }
    }  
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// This is where the program starts to excute the moment the page completed loading its contents
document.addEventListener("DOMContentLoaded", (event) => {
    extractSections();
    buildNavigation(getParent());
    trackOnScroll();
});

// This event will detect when the user starts scrolling
window.addEventListener("scroll",trackOnScroll);

// Build menu 

// Scroll to section on link click

// Set sections as active