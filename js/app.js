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

//seleccionar el ul
const nav = document.querySelector('nav.navbar__menu');
const navUl = document.getElementById('navbar__list');
const menuSwitch = nav.querySelector('.switcher__menu');

const scrollTop = document.querySelector('.scroll__top')

/**
 * End Global Variables
 * Start Helper Functions
 *
*/


let scrollEnded = function (callback) {

	// Initialize Scrolling variable
	let  isScrolling;

	// Event
	window.addEventListener('scroll', function (event) {

		// Clear our timeout throughout the scroll
		window.clearTimeout(isScrolling);

		// Set a timeout to run after scrolling ends
		isScrolling = setTimeout(function() {

			// Run the callback
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

        let idSection = item.id;
        let numberSection = idSection.substr(7);
        let menuLabel = item.getAttribute('data-nav');

        //console.log(item);
        const htmlTextToAdd =
          `<li>
                <a href="#${idSection}">${menuLabel}</a>
            </li>`;
        navUl.insertAdjacentHTML('beforeend', htmlTextToAdd);
        nav.classList.add('show-menu');
    })

};

buildNav();

// Add class 'active' to section when near top of viewport

function changeClass(e) {
    nav.classList.add('show-menu');
    sections.forEach(function(item) {
        let title = item.querySelector('h2');

        let positionTitle = title.getBoundingClientRect();

        if (
                positionTitle.top >= 0 &&
                positionTitle.bottom <= (window.innerHeight || document.documentElement.clientHeight)
            ) {
                    sections.forEach(function(item) {
                        item.classList.remove('current-section');
                    });
                    item.classList.add('current-section');
                    let itemId = item.id;
                    //console.log(itemId);

                    for (let i = 0; i < menuLink.length; i++) {
                        menuLink[i].classList.remove('current-menu');
                    }
                    let currentMenu = navUl.getElementsByTagName('a');
                    let currentLink = navUl.querySelector(`[href='#${itemId}']`);

                    currentLink.classList.add('current-menu');

                   }
            }
        );

}

document.addEventListener('scroll', changeClass);


// Scroll to anchor ID using scrollTO event

const menuLink = navUl.querySelectorAll('a');
menuLink[0].classList.add('current-menu');

menuLink.forEach(function(item) {
    let idSection = item.getAttribute('href').substring(1);
    let idSectionObject = document.getElementById(idSection);
    let rectSection = idSectionObject.getBoundingClientRect();
    let sectionY = rectSection.top;

    item.addEventListener('click', function(event) {
        window.scrollTo({
          top: sectionY,
          left: 0,
          behavior: 'smooth'
        });

        event.preventDefault();
    })

});

/**
 * End Main Functions
 * Begin Events
 *
*/

menuSwitch.addEventListener('click', function(item){
    console.log(this.parentNode);
    this.parentNode.classList.add('show-menu');
});



scrollEnded(function () {
    if(!window.pageYOffset) {
        nav.classList.add('show-menu');
        scrollTop.classList.add('hide-top');
    } else {
        nav.classList.remove('show-menu');
        scrollTop.classList.remove('hide-top');
    }
});

scrollTop.addEventListener('click', function() {
    window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
    });
});

// Build menu

// Scroll to section on link click

// Set sections as active











