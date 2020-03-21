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

// main parent
const parent = document.querySelector('main');
// all sections
const sections = parent.querySelectorAll('section');

//set variables for building navigation
const nav = document.querySelector('nav.navbar__menu');
const navUl = document.getElementById('navbar__list');
const menuSwitch = nav.querySelector('.switcher__menu');

//scroll top div
const scrollTop = document.querySelector('.scroll__top')

/**
 * End Global Variables
 * Start Helper Functions
 *
*/

// Helper function to know when scrolling ends
let scrollEnded = function (callback) {

	// Initialize Scrolling variable
	let  isScrolling;

	// Event
	window.addEventListener('scroll', function (event) {

		// Clear timeout while scrolling
		window.clearTimeout(isScrolling);

		// Set a timeout after scrolling ends
		isScrolling = setTimeout(function() {

			callback();

		}, 50);

	}, false);

};


/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
const buildNav = function() {
    sections.forEach(function(item) {
        // Section id for menu link anchors
        let idSection = item.id;
        // data-nav attribute for menu titles
        let menuLabel = item.getAttribute('data-nav');

        // add as items as sections
        const htmlTextToAdd =
          `<li>
                <a href="#${idSection}">${menuLabel}</a>
            </li>`;
        navUl.insertAdjacentHTML('beforeend', htmlTextToAdd);


    })

    // By default menu is visible
    nav.classList.add('show-menu');
};

buildNav();

// Add class 'active' to section and menu when near top of viewport

function changeClass(e) {
    // menu is visible when scrolling
    nav.classList.add('show-menu');

    sections.forEach(function(item) {

        // when h2 is visible, the section is active
        // I think this method is better that when section is on top.
        let title = item.querySelector('h2');

        //with getBoundingClientRect() we can get left, right, top and bottom position
        let positionTitle = title.getBoundingClientRect();

        if (
                // h2 is on screen
                positionTitle.top >= 0 &&
                positionTitle.bottom <= (document.documentElement.clientHeight)
            ) {
                    // Clear previous active sections
                    sections.forEach(function(item) {
                        item.classList.remove('current-section');
                    });
                    //Set active section
                    item.classList.add('current-section');
                    let itemId = item.id;

                    let currentMenu = navUl.getElementsByTagName('a');
                    //Matching current menu and current section using anchor.
                    let currentLink = navUl.querySelector(`[href='#${itemId}']`);

                    // Clear previous active menus
                    for (let i = 0; i < menuLink.length; i++) {
                        menuLink[i].classList.remove('current-menu');
                    }

                    //Set active menu
                    currentLink.classList.add('current-menu');

                   }
            }
        );

}

document.addEventListener('scroll', changeClass);


// Scroll to anchor ID using scrollTO event

//not declared before because is created with javascript
const menuLink = navUl.querySelectorAll('a');
//by default first element of navigation is current menu.
menuLink[0].classList.add('current-menu');

menuLink.forEach(function(item) {
    //Get section id from anchor
    let idSection = item.getAttribute('href').substring(1);
    let idSectionObject = document.getElementById(idSection);
    //Get section y position:
    let rectSection = idSectionObject.getBoundingClientRect();
    let sectionY = rectSection.top;

    //Scrolling to section position
    item.addEventListener('click', function(event) {
        window.scrollTo({
          top: sectionY,
          left: 0,
          behavior: 'smooth'
        });
        // Disable anchor
        event.preventDefault();
    })

});

/**
 * End Main Functions
 * Begin Events
 *
*/

//Switcher for showing main navigation
menuSwitch.addEventListener('click', function(item){
    console.log(this.parentNode);
    this.parentNode.classList.add('show-menu');
});


// Showing menu if scrolls ends and page is not on top.
// Hiding 'scroll to top' if scrolls ends and page is on top.
scrollEnded(function () {
    if(!window.pageYOffset) {
        nav.classList.add('show-menu');
        scrollTop.classList.add('hide-top');
    } else {
        nav.classList.remove('show-menu');
        scrollTop.classList.remove('hide-top');
    }
});

//Scroll top top
scrollTop.addEventListener('click', function() {
    window.scrollTo({
          top: 0,
          behavior: 'smooth'
    });
});

