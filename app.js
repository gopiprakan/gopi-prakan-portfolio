const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header.container');

hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('active');
	mobile_menu.classList.toggle('active');
});

document.addEventListener('scroll', () => {
	var scroll_position = window.scrollY;
	if (scroll_position > 250) {
		header.style.backgroundColor = '#29323c';
	} else {
		header.style.backgroundColor = 'transparent';
	}
});

menu_item.forEach((item) => {
	item.addEventListener('click', () => {
		hamburger.classList.toggle('active');
		mobile_menu.classList.toggle('active');
	});
});

// ==========================================
// Scroll Reveal Animations (Intersection Observer)
// ==========================================
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

const revealObserver = new IntersectionObserver((entries, observer) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('active');
			// Stop observing once animation has triggered
			observer.unobserve(entry.target);
		}
	});
}, {
	threshold: 0.15,
	rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(element => {
	revealObserver.observe(element);
});

// ==========================================
// Scroll-Spy (Active Navigation Link Highlighting)
// ==========================================
const sections = document.querySelectorAll('section[id]:not(#header)');
const navLinks = document.querySelectorAll('.header .nav-bar .nav-list ul li a');

const scrollSpyObserver = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			const id = entry.target.getAttribute('id');
			
			// Highlight the active section's nav link
			navLinks.forEach(link => {
				if (link.getAttribute('href') === `#${id}`) {
					link.classList.add('active-link');
				} else {
					link.classList.remove('active-link');
				}
			});
		}
	});
}, {
	// A section is considered active when it takes up the main view area
	rootMargin: "-25% 0px -55% 0px",
	threshold: 0.1
});

sections.forEach(section => {
	scrollSpyObserver.observe(section);
});

// Fallback logic to highlight top and bottom sections perfectly
window.addEventListener('scroll', () => {
	const scrollPos = window.scrollY;
	const windowHeight = window.innerHeight;
	const bodyHeight = document.body.offsetHeight;

	// Force Home active at the very top of the page
	if (scrollPos < 120) {
		navLinks.forEach(link => {
			if (link.getAttribute('href') === '#hero') {
				link.classList.add('active-link');
			} else {
				link.classList.remove('active-link');
			}
		});
	}
	// Force Contact active at the very bottom of the page
	else if (windowHeight + scrollPos >= bodyHeight - 100) {
		navLinks.forEach(link => {
			if (link.getAttribute('href') === '#contact') {
				link.classList.add('active-link');
			} else {
				link.classList.remove('active-link');
			}
		});
	}
});