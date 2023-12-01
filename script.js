function navToggle() {
	document.getElementById("headerUl").classList.toggle("_active");
	document.getElementById("html").classList.toggle("_overflow");
}

document.getElementById("copyright").textContent = new Date().getFullYear();

function themeToggle() {
	document.getElementById("html").classList.toggle("_theme");
	const isDarkMode = localStorage.getItem("darkMode") === "enabled";
	if (isDarkMode) {
		localStorage.setItem("darkMode", null);
	} else {
		localStorage.setItem("darkMode", 'enabled');
	}
}

document.addEventListener("DOMContentLoaded", function () {
	const isDarkMode = localStorage.getItem("darkMode") === "enabled";
	if (isDarkMode) {
		document.getElementById("html").classList.add("_theme");
	}
});

function activateItem(clickedItem) {
	const allItemsServices = document.querySelectorAll('.services__item');
	allItemsServices.forEach(item => {
		item.classList.remove('item-active');
	});
	const allItemsDoctor = document.querySelectorAll('.doctor__item');
	allItemsDoctor.forEach(item => {
		item.classList.remove('item-active');
	});
	clickedItem.classList.add('item-active');
}

//changes the activity of header navigation elements when scrolling
document.addEventListener('DOMContentLoaded', function () {
	const sections = document.querySelectorAll('.anchor');
	const menuItems = document.querySelectorAll('.scroll-to');
	const headerHeight = document.querySelector('header').offsetHeight;
	const screenHeight = window.innerHeight || document.documentElement.clientHeight;
	let lastScrollTop = window.scrollY || document.documentElement.scrollTop;
	let activeMenuItemIndex = null;

	function isPartiallyInViewport(element, topOffset, bottomOffset) {
		const rect = element.getBoundingClientRect();
		return (
			(rect.top >= topOffset && rect.top <= bottomOffset)
			|| (rect.bottom >= screenHeight * 0.6 && rect.bottom <= screenHeight)
		);
	}

	function updateActiveMenuItem() {
		const scrollTop = window.scrollY || document.documentElement.scrollTop;
		let found = false;
		sections.forEach((section, index) => {
			const isSectionInViewport = isPartiallyInViewport(section, headerHeight, screenHeight * 0.40);
			if (!found && isSectionInViewport) {
				activeMenuItemIndex = index;
				found = true;
			}
		});
		if (found) {
			menuItems.forEach((menuItem, index) => {
				if (index === activeMenuItemIndex) {
					menuItem.classList.add('_active');
				} else {
					menuItem.classList.remove('_active');
				}
			});
		}
		const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
		const prevSection = sections[activeMenuItemIndex];
		if (scrollDirection === 'up') {
			const nextSection = sections[activeMenuItemIndex - 1];
			if (nextSection && nextSection.offsetTop > headerHeight && (nextSection.offsetTop <= (screenHeight * 0.4 - headerHeight))
				|| (prevSection && prevSection.offsetTop > screenHeight * 0.7)) {
				activeMenuItemIndex -= 1;
			}
		}
		if (scrollDirection === 'down') {
			const nextSection = sections[activeMenuItemIndex + 1];
			if (prevSection && prevSection.bottomOffset < (screenHeight * 0.7) && nextSection.offsetTop <= (screenHeight * 0.7)) {
				activeMenuItemIndex += 1;
			}
		}
		lastScrollTop = scrollTop;
	}
	window.addEventListener('scroll', updateActiveMenuItem);
	window.addEventListener('resize', updateActiveMenuItem);
	updateActiveMenuItem();
});

// JavaScript for smooth scrolling with header height in mind
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
	  e.preventDefault();
	  const targetId = this.getAttribute('href').substring(1);
	  const targetElement = document.getElementById(targetId);
	  if (targetElement) {
		const headerHeight = document.querySelector('header').offsetHeight;
		const targetPosition = targetElement.offsetTop - headerHeight;
		window.scrollTo({
		  top: targetPosition,
		//   behavior: 'smooth'
		});
	  }
	});
  });