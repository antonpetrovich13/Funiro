//Функция IBG
function ibg() {

	let ibg = document.querySelectorAll(".ibg");
	for (var i = 0; i < ibg.length; i++) {
		if (ibg[i].querySelector('img')) {
			ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
		}
	}
}

ibg();

// Проверяем на тачскрин
let isMobile = {
	Android: function () { return navigator.userAgent.match(/Android/i); },
	BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
	iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
	Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
	Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
	any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};

// Работа с контентом формы
const formsArray = Array.from(document.forms);

if (formsArray.length > 0) {
	formsArray.forEach(item => {
		item.input.value = item.input.dataset.value;

		item.addEventListener('focusin', function () {
			if (item.input.value == item.input.dataset.value)
				item.input.value = '';
		});

		item.addEventListener('focusout', function () {
			if (item.input.value == '')
				item.input.value = item.input.dataset.value;
		})
	})
}

// Обработчики событий клика
window.onload = function () {
	document.addEventListener('click', documentActions);

	//Actions
	function documentActions(e) {
		const targetElement = e.target;
		if (window.innerWidth > 768 && isMobile.any()) {
			if (targetElement.classList.contains('menu__arrow')) {
				targetElement.closest('.menu__item').classList.toggle('_hover');
			}
			if (!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').length > 0) {
				document.querySelectorAll('.menu__item._hover').forEach(item => {
					item.classList.remove('_hover');
				})
			}
		}

		//Форма
		if (targetElement.classList.contains('search-form__icon')) {
			document.querySelector('.search-form').classList.toggle('_active');
		} else if (!targetElement.closest('.search-form') && document.querySelector('.search-form._active')) {
			document.querySelector('.search-form').classList.remove('_active');
		}
	}
}

// СПОЙЛЕР
if (document.documentElement.clientWidth < 768) {
	let spoilers = document.querySelectorAll('.menu__item');

	spoilers.forEach(item => {
		let itemBody = item.querySelector('.menu__item-wrapper');

		if (!itemBody) return;

		let itemHeight = itemBody.clientHeight;

		itemBody.style.height = '0px';

		// Активация спойлера
		item.querySelector('.menu__arrow').onclick = function (event) {

			//Работа с кнопкой
			let arrowCollection = document.querySelectorAll('.menu__arrow');
			let currentItem = event.target;

			// Добавление класса нажатой стрелке, удаление класса всем остальным активным стрелкам
			if (currentItem.classList.contains('_active')) {
				currentItem.classList.remove('_active');
			} else {
				arrowCollection.forEach((elem) => {
					if (elem.classList.contains('_active')) {
						elem.classList.remove('_active');
					}
				})

				item.querySelector('.menu__arrow').classList.add('_active');
			}

			// Работа с контентым блоком
			if (!itemBody.classList.contains('_active')) {
				// Закрывает все открытые элементы
				let itemBodyCollection = document.querySelectorAll('.menu__item-wrapper');
				itemBodyCollection.forEach(elem => {
					if (elem.classList.contains('_active')) {
						elem.style.height = '0px';
						elem.classList.remove('_active');
					}
				})

				itemBody.style.height = itemHeight + 'px';
				itemBody.classList.add('_active');
			} else {
				itemBody.style.height = '0px';
				itemBody.classList.remove('_active');
			}
		}
	})
}

// МЕНЮ БУРГЕР
const burger = document.querySelector('.icon-menu');
const menuBurger = document.querySelector('.menu__body')

if (burger) {
	burger.onclick = function () {
		burger.classList.toggle('_active');
		menuBurger.classList.toggle('_active');
		document.body.classList.toggle('_lock');
	}
}

// СПОЙЛЕР №2
if (document.documentElement.clientWidth < 768) {
	let spoilers = document.querySelectorAll('.menu-footer__column');

	spoilers.forEach(item => {
		let itemBody = item.querySelector('.menu-footer__wrapper');

		if (!itemBody) return;

		let itemHeight = itemBody.clientHeight;

		itemBody.style.height = '0px';

		// Активация спойлера
		item.querySelector('.menu-footer__arrow ').onclick = function (event) {

			//Работа с кнопкой
			let arrowCollection = document.querySelectorAll('.menu-footer__arrow ');
			let currentItem = event.target;

			// Добавление класса нажатой стрелке, удаление класса всем остальным активным стрелкам
			if (currentItem.classList.contains('_active')) {
				currentItem.classList.remove('_active');
			} else {
				arrowCollection.forEach((elem) => {
					if (elem.classList.contains('_active')) {
						elem.classList.remove('_active');
					}
				})

				item.querySelector('.menu-footer__arrow ').classList.add('_active');
			}

			// Работа с контентым блоком
			if (!itemBody.classList.contains('_active')) {
				// Закрывает все открытые элементы
				let itemBodyCollection = document.querySelectorAll('.menu-footer__wrapper');
				itemBodyCollection.forEach(elem => {
					if (elem.classList.contains('_active')) {
						elem.style.height = '0px';
						elem.classList.remove('_active');
					}
				})

				itemBody.style.height = itemHeight + 'px';
				itemBody.classList.add('_active');
			} else {
				itemBody.style.height = '0px';
				itemBody.classList.remove('_active');
			}
		}
	})
}


// ВАЛИДАЦИЯ ФОРМЫ
/*document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('form');
	form.addEventListener('submit', formSend);
	async function formSend(e) {
		e.preventDefault();

		let error = formValidate(form);
		let formData = new FormData(form);

		if (error === 0) {
			form.classList.add('_sending');
			let response = await fetch('sendmail.php', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				alert(result.message);
				form.reset();
				form.classList.remove('_sending');
			} else {
				alert("Ошибка");
				form.classList.remove('_sending');
			}
		} else {
			alert('Заполните обязательные поля');
		}
	}

	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._req');

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);
			if (input.value === '') {
				formAddError(input);
				error++;
			}
		}
		return error;
	}
	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}

	//Функция теста телефона
	function phoneTest(input) {
		return !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(input.value);
	}
});*/




/*
const spollersArray = document.querySelectorAll('[data-spollers]');
if (spollersArray.length > 0) {

	// Получение обычных спойлеров
	const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
		return !item.dataset.spollers.split(',')[0];
	})

	// Инициализация обычных спойлеров
	if (spollersRegular.length > 0) {
		initSpollers(spollersRegular);
	}

	// Получение спойлеров с медиа запросами
	const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
		return item.dataset.spollers.split(',')[0];
	});

	// Инициализация спойлеров с медиа запросами
	if (spollersMedia.length > 0) {
		const breakpointsArray = [];
		spollersMedia.forEach(item => {
			const params = item.dataset.spollers;
			const breakpoint = {};
			const paramsArray = params.split(',');
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		});

		// Получаем уникальные брейкпоинты
		let mediaQueries = breakpointsArray.map(function (item) {
			return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
		});
		mediaQueries = mediaQueries.filter(function (item, index, self) {
			return self.indexOf(item) === index;
		})

		// Работаем с каждым брейкпоинтом
		mediaQueries.forEach(breakpoint => {
			const paramsArray = breakpoint.split(",");
			const mediaBreakpoint = paramsArray[1];
			const mediaType = paramsArray[2];
			const matchMedia = window.matchMedia(paramsArray[0]);

			// Объекты с нужными условиями
			const spollersArray = breakpointsArray.filter(function (item) {
				if (item.value === mediaBreakpoint && item.type === mediaType) {
					return true;
				}
			});

			// Событие
			matchMedia.addEventListener(function () {
				initSpollers(spollersArray, matchMedia);
			});
			initSpollers(spollersArray, matchMedia);
		});
	}

	// Инициализация
	function initSpollers(spollersArray, matchMedia = false) {
		spollersArray.forEach(spollersBlock => {
			spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
			if (matchMedia.matches || !matchMedia) {
				spollersBlock.classList.add('_init');
				inintSpollerBody(spollersBlock);
				spollersBlock.addEventListener('click', setSpollerAction);
			} else {
				spollersBlock.classList.remove('_init');
				inintSpollerBody(spollersBlock, false);
				spollersBlock.removeEventListener('click', setSpollerAction);
			}
		})
	}
	//Работа с контентом
	function inintSpollerBody(spollersBlock, hideSpollerBody = true) {
		const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
		if (spollerTitles.length > 0) {
			spollerTitles.forEach(spollerTitle => {
				if (hideSpollerBody) {
					spollerTitle.removeAttribute('tabindex');
					if (!spollerTitle.classList.contains('_active')) {
						spollerTitle.nextElementSibling.hidden = true;
					}
				} else {
					spollerTitle.setAttribute('tabindex', '-1');
					spollerTitle.nextElementSibling.hidden = false;
				}
			});
		}
	}
	function setSpollerAction(e) {
		const el = e.target;
		if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
			const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
			const spollersBlock = spollerTitle.closest('[data-spollers]');
			const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
			if (!spollersBlock.querySelectorAll('._slide').length) {
				if (oneSpoller && !spollerTitle.classList.contains('_active')) {
					hideSpollerBody(spollersBlock);
				}
				spollerTitle.classList.toggle('_active');
				_slideToggle(spollerTitle.nextElementSibling, 500);
			}
			e.preventDefault();
		}
	}

	function hideSpollerBody(spollersBlock) {
		const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
		if (spollerActiveTitle) {
			spollerActiveTitle.classList.remove('_active');
			_slideUp(spollerActiveTitle.nextElementSibling, 500);
		}
	}
}
// SlideToggle
let _slideUp = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.margingTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = true;
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration)
	}
}

let _slideDown = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (target.hidden) {
			target.hidden = false;
		}
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.margingTop = 0;
		target.style.paddingBottom = 0;
		target.style.paddingTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration)
	}
}

let _slideToggle = (target, duration = 500) => {
	if (target, hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
}
*/