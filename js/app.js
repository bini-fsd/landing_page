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

/* During coding, www.w3schools.com, developer.mozilla.org, www.codegrepper.com, www.youtube.com
   have been used as a reference
*/

let navList, links, anchorLink, sectionId;
const navSections = ["Section1", "Section2", "Section3","Section4"];

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function getParent(){
    return document.querySelector("#navbar__list");
}

function getMenuParent(){
    return document.querySelector(".navbar__menu");
}

function insertMenu(menu){
    const parent = getMenuParent();
    scrollToAnchor();
    return parent.appendChild(menu);
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNavigation(navGrid){
    for(let navSection in navSections){
        navList = document.createElement("li");
        links = document.createElement("a");

        //links.href = navSections[navSection].toLowerCase();
        links.innerHTML = navSections[navSection];
        links.classList.add("menu__link");
        links.id = navSections[navSection];

        navList.appendChild(links);
        navGrid.appendChild(navList);
        document.body.append(navGrid);
    }

    insertMenu(navGrid);
}

// Add class 'active' to section when near top of viewport
function trackApp(index) {
    const current = document.getElementsByClassName("menu__link");
    
    for(let i in current){
        if(i != index){
            links[i].classList = "menu__link";
        }
        else{
            links[index].className += " active";
        }
    }
}

// Scroll to anchor ID using scrollTO event
function scrollToAnchor(){
    for(let navSection in navSections){
        sectionId = "#" + navSections[navSection].toLowerCase();
        anchorLink = document.getElementById(navSections[navSection]);
        links = document.getElementsByClassName("menu__link");
        links[navSection].href = sectionId;

        anchorLink.addEventListener("click", (event) => {
            const pageX = window.pageXOffset;
            const pageY = window.pageYOffset;

            window.scrollTo({
                top: pageX,
                left: pageY,
                behavior: "smooth"
            });

            trackApp(navSection);

        }, false);
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/
document.addEventListener("DOMContentLoaded", (event) => {
    buildNavigation(getParent());
});

// Build menu 

// Scroll to section on link click

// Set sections as active