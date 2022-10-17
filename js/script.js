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

		// ПОЯВЛЕНИЕ ФОРМЫ ПРИ КЛИКЕ НА ИКОНКУ НА ТАЧСКРИНАХ
		if (targetElement.classList.contains('search-form__icon')) {
			document.querySelector('.search-form').classList.toggle('_active');
		} else if (!targetElement.closest('.search-form') && document.querySelector('.search-form._active')) {
			document.querySelector('.search-form').classList.remove('_active');
		}

		// ПОДГРУЗКА JSON ПРИ КЛИКЕ НА products__more
		if (targetElement.classList.contains('products__more')) {
			getProducts(targetElement);
			e.preventDefault();
		}

		// ДОБАВЛЕНИЕ ТОВАРА В КОРЗИНУ
		if (targetElement.classList.contains('actions-product__button')) {
			const productId = targetElement.closest('.item-product').dataset.pid;
			addToCart(targetElement, productId);
			e.preventDefault();
		}

		// ПОКАЗЫВАЕМ СОДЕРЖИВОЕ КОРЗИНЫ ПО КЛИКУ
		if (targetElement.classList.contains('cart-header__icon') || targetElement.closest('.cart-header__icon')) {
			if (document.querySelector('.cart-list').children.length > 0) {
				document.querySelector('.cart-header').classList.toggle('_active');
			}
			e.preventDefault();
		} else if (!targetElement.closest('.cart-header') && !targetElement.classList.contains('actions-product__button')) {
			document.querySelector('.cart-header').classList.remove('_active');
		}

		if (targetElement.classList.contains('cart-list__delete')) {
			const productId = targetElement.closest('.cart-list__item').dataset.cartPid;
			updateCart(targetElement, productId, false);
			e.preventDefault();
		}

		// СЧЕТЧИК ПОНРАВИВШИХСЯ ТОВАРОВ
		if (targetElement.closest('.actions-product__link_heart')) {
			const productId = targetElement.closest('.products__item').dataset.pid;
			updateFavorite(targetElement, productId, addProduct = true);
			e.preventDefault();
		}

		// ПОКАЗ ПОНРАВИВШИХСЯ ТОВАРОВ
		if (targetElement.closest('.heart-header__icon')) {
			if (document.querySelector('.heart-list').children.length > 0) {
				document.querySelector('.heart-header').classList.toggle('_active');
			}
			e.preventDefault();
		} else if (!targetElement.closest('.heart-header') && !targetElement.closest('.actions-product__link_heart')) {
			document.querySelector('.heart-header').classList.remove('_active');
		}

		// УДАЛЕНИЕ ПОНРАВИВШИХСЯ ТОВАРОВ
		if (targetElement.classList.contains('heart-list__unlike')) {
			const productId = targetElement.closest('.heart-list__item').dataset.heartPid;
			updateFavorite(targetElement, productId, false);
			e.preventDefault();
		}
	}
}

// СПОЙЛЕР HEADER
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

// СПОЙЛЕР FOOTER
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

// СЛАЙДЕР MAIN
if (document.querySelector('.slider-main__body')) {
	new Swiper('.slider-main__body', {
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 32,
		watchOverflow: true,
		speed: 800,
		loop: true,
		loopAdditionalSlides: 5,
		preloadImages: false,
		parallax: true,
		pagination: {
			el: '.controls-slider-main__dotts',
			clickable: true,
		},
		navigation: {
			nextEl: '.slider-main .slider-arrow_next',
			prevEl: '.slider-main .slider-arrow_prev',
		}
	});
}

// ПЕРЕМЕЩЕНИЕ КНОПКИ content-main__button
if (document.documentElement.clientWidth < 992) {
	let buttonElem = document.querySelector('.content-main__button');
	let parentWrapper = document.querySelector('.main-slider__body');

	parentWrapper.append(buttonElem);
}

// ДОБАВЛЕНИЕ HEADER ФОНА ПРИ СКРОЛЛЕ
window.onscroll = function () {
	const headerElement = document.querySelector('header');

	const headerCoords = headerElement.offsetHeight;

	if (window.pageYOffset > headerCoords) {
		headerElement.classList.add('_scroll');
	} else {
		headerElement.classList.remove('_scroll');
	}
}

// ФУНКЦИЯ getProducts
async function getProducts(button) {
	if (!button.classList.contains('_hold')) {
		button.classList.add('_hold');
		const file = "json/products.json";
		let response = await fetch(file, {
			method: "GET"
		});
		if (response.ok) {
			let result = await response.json();
			loadProducts(result);
			button.classList.remove('_hold');
			button.remove();
		} else {
			alert('Ошибка');
		}
	}

	function loadProducts(data) {
		const productsItems = document.querySelector('.products__items');

		data.products.forEach(item => {
			const productId = item.id;
			const productUrl = item.url;
			const productImage = item.image;
			const productTitle = item.title;
			const productText = item.text;
			const productPrice = item.price;
			const productOldPrice = item.priceOld;
			const productShareUrl = item.shareUrl;
			const productLikeUrl = item.likeUrl;
			const productFavoriteUrl = item.favoriteUrl;
			const productLabels = item.labels;



			let productTemplateStart = `<article data-pid="${productId}" class="products__item item-product">`;
			let productTemplateEnd = `</article>`;

			let productTemplateLabels = '';
			if (productLabels) {
				let productTemplateLabelsStart = `<div class="item-product__labels">`;
				let productTemplateLabelsEnd = `</div>`;
				let productTemplateLabelsContent = '';

				productLabels.forEach(labelItem => {
					productTemplateLabelsContent += `<div class="item-product__label item-product__label_${labelItem.type}">${labelItem.value}</div>`;
				});

				productTemplateLabels += productTemplateLabelsStart;
				productTemplateLabels += productTemplateLabelsContent;
				productTemplateLabels += productTemplateLabelsEnd;
			}

			let productTemplateImage = `
		<a href="${productUrl}" class="item-product__image _ibg">
			<img src="img/products/${productImage}" alt="${productTitle}">
		</a>
	`;

			let productTemplateBodyStart = `<div class="item-product__body">`;
			let productTemplateBodyEnd = `</div>`;

			let productTemplateContent = `
		<div class="item-product__content">
			<h3 class="item-product__title">${productTitle}</h3>
			<div class="item-product__text">${productText}</div>
		</div>
	`;

			let productTemplatePrices = '';
			let productTemplatePricesStart = `<div class="item-product__prices">`;
			let productTemplatePricesCurrent = `<div class="item-product__price">Rp ${productPrice}</div>`;
			let productTemplatePricesOld = `<div class="item-product__price item-product__price_old">Rp ${productOldPrice}</div>`;
			let productTemplatePricesEnd = `</div>`;

			productTemplatePrices = productTemplatePricesStart;
			productTemplatePrices += productTemplatePricesCurrent;
			if (productOldPrice) {
				productTemplatePrices += productTemplatePricesOld;
			}
			productTemplatePrices += productTemplatePricesEnd;

			let productTemplateActions = `
		<div class="item-product__actions actions-product">
			<div class="actions-product__body">
				<a href="" class="actions-product__button btn btn_white">Add to cart</a>
				<a href="${productShareUrl}" class="actions-product__link _icon-share">Share</a>
				<a href="${productLikeUrl}" class="actions-product__link actions-product__link_heart _icon-heart">
				<img class="actions-product__image" src="img/products/${productFavoriteUrl}" alt="" />
				<p>Like</p></a>
			</div>
		</div>
	`;

			let productTemplateBody = '';
			productTemplateBody += productTemplateBodyStart;
			productTemplateBody += productTemplateContent;
			productTemplateBody += productTemplatePrices;
			productTemplateBody += productTemplateActions;
			productTemplateBody += productTemplateBodyEnd;

			let productTemplate = '';
			productTemplate += productTemplateStart;
			productTemplate += productTemplateLabels;
			productTemplate += productTemplateImage;
			productTemplate += productTemplateBody;
			productTemplate += productTemplateEnd;


			productsItems.insertAdjacentHTML('beforeend', productTemplate);
		})
	}
}

// Функция updateHeart
function updateFavorite(currentLike, productId, addProduct = true) {
	const parentElement = currentLike.closest('.actions-product__link_heart');
	const heartIcon = document.querySelector('.heart-header__icon');
	const heartQuantity = heartIcon.querySelector('span');
	// const productId = currentLike.closest('.products__item').dataset.pid;
	const heartProduct = document.querySelector(`[data-heart-pid="${productId}"]`);
	const heartList = document.querySelector('.heart-list');


	// ДОБАВЛЕНИЕ
	if (addProduct) {
		if (!parentElement.classList.contains('_hold')) {

			const product = document.querySelector(`[data-pid="${productId}"]`);
			const heartImage = product.querySelector('.item-product__image').innerHTML;
			const heartTitle = product.querySelector('.item-product__title').innerHTML;
			const heartPrice = product.querySelector('.item-product__price').innerHTML;
			const heartContent = `
			<a href="" class="heart-list__image _ibg">${heartImage}</a>
			<div class="heart-list__body">
				<a herf="" class="heart-list__title">${heartTitle}</a>
				<div class="heart-list__price">${heartPrice}</div>
				<a herf="" class="heart-list__unlike">Unlike</a>
			</div>
			`;


			heartList.insertAdjacentHTML('beforeend', `<li data-heart-pid="${productId}" class="heart-list__item">${heartContent}</li>`)

			if (!heartQuantity) {
				heartIcon.insertAdjacentHTML('beforeend', '<span>1</span>');
			} else {
				heartQuantity.innerHTML = ++heartQuantity.innerHTML;
			}
			parentElement.classList.add('_active');
			parentElement.classList.add('_hold');

		} else if (parentElement.classList.contains('_hold')) {

			parentElement.classList.remove('_active');

			heartProduct.remove();

			heartQuantity.innerHTML = --heartQuantity.innerHTML;


			if (heartQuantity.innerHTML == 0) {
				heartQuantity.remove();
			}
			parentElement.classList.remove('_hold');
		}
	} else {
		document.querySelector(`[data-heart-pid="${productId}"]`).remove();
		if (!heartList.children.length > 0) {
			document.querySelector('.heart-header').classList.remove('_active');
		}

		heartQuantity.innerHTML = --heartQuantity.innerHTML;
		if (heartQuantity.innerHTML == 0) {
			heartQuantity.remove();
		}

		const currentProduct = document.querySelector(`[data-pid="${productId}"]`);
		currentProduct.querySelector('.actions-product__link_heart').classList.remove('_active');
		currentProduct.querySelector('.actions-product__link_heart').classList.remove('_hold');
	}
}


// ФУНКЦИЯ addToCart
function addToCart(productButton, productId) {
	if (!productButton.classList.contains('_hold')) {
		productButton.classList.add('_hold');
		productButton.classList.add('_fly');

		const cart = document.querySelector('.cart-header__icon');
		const product = document.querySelector(`[data-pid="${productId}"]`);
		const productImage = product.querySelector('.item-product__image');

		const productImageFly = productImage.cloneNode(true);

		const productImageFlyWidth = productImage.offsetWidth;
		const productImageFlyHeight = productImage.offsetHeight;
		const productImageFlyTop = productImage.getBoundingClientRect().top;
		const productImageFlyLeft = productImage.getBoundingClientRect().left;

		productImageFly.setAttribute('class', '_flyImage _ibg');
		productImageFly.style.cssText = `
			left: ${productImageFlyLeft}px;
			top: ${productImageFlyTop}px;
			width: ${productImageFlyWidth}px;
			height: ${productImageFlyHeight}px;
		`;

		document.body.append(productImageFly);

		const cartFlyLeft = cart.getBoundingClientRect().left;
		const cartFlyTop = cart.getBoundingClientRect().top;

		productImageFly.style.cssText = `
			left: ${cartFlyLeft}px;
			top: ${cartFlyTop}px;
			width: 0px;
			height: 0px;
			opacity: 0;
		`;

		productImageFly.addEventListener('transitionend', function () {
			if (productButton.classList.contains('_fly')) {
				productImageFly.remove();
				updateCart(productButton, productId);
				productButton.classList.remove('_fly');
			}
		});
	}
}

// ФУНКЦИЯ updateCart
function updateCart(productButton, productId, productAdd = true) {
	const cart = document.querySelector('.cart-header');
	const cartIcon = cart.querySelector('.cart-header__icon');
	const cartQuantity = cartIcon.querySelector('span');
	const cartProduct = document.querySelector(`[data-cart-pid="${productId}"]`);
	const cartList = document.querySelector('.cart-list');

	// Добавляем
	if (productAdd) {
		if (cartQuantity) {
			cartQuantity.innerHTML = ++cartQuantity.innerHTML;

		} else {
			cartIcon.insertAdjacentHTML('beforeend', `<span>1</span>`);
		}


		if (!cartProduct) {
			const product = document.querySelector(`[data-pid="${productId}"]`);
			const cartProductImage = product.querySelector('.item-product__image').innerHTML;
			const cartProductTitle = product.querySelector('.item-product__title').innerHTML;
			const cartProductContent = `
			<a href="" class="cart-list__image _ibg">${cartProductImage}</a>
			<div class="cart-list__body">
				<a herf="" class="cart-list__title">${cartProductTitle}</a>
				<div class="cart-list__quantity">Quantity: <span>1</span></div>
				<a herf="" class="cart-list__delete">Delete</a>
			</div>
			`;

			cartList.insertAdjacentHTML('beforeend', `<li data-cart-pid="${productId}" class="cart-list__item">${cartProductContent}</li>`);
		} else {
			const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
			cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;
		}

		productButton.classList.remove('_hold');
	} else {
		const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
		cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;

		if (!parseInt(cartProductQuantity.innerHTML)) {
			cartProduct.remove();
		}

		const cartQuantityValue = --cartQuantity.innerHTML;

		if (cartQuantityValue) {
			cartQuantity.innerHTML = cartQuantityValue;
		} else {
			cartQuantity.remove();
			cart.classList.remove('_active');
		}
	}
}

// СЛАЙДЕР ROOMS
if (document.querySelector('.slider-rooms__body')) {
	new Swiper('.slider-rooms__body', {
		observer: true,
		observeParents: true,
		slidesPerView: 'auto',
		spaceBetween: 24,
		watchOverflow: true,
		speed: 800,
		loop: true,
		loopAdditionalSlides: 5,
		preloadImages: false,
		parallax: true,
		pagination: {
			el: '.slider-rooms__dotts',
			clickable: true,
		},
		navigation: {
			nextEl: '.slider-rooms .slider-arrow_next',
			prevEl: '.slider-rooms .slider-arrow_prev',
		}
	});
}

// СЛАЙДЕР TIPS
if (document.querySelector('.slider-tips__body')) {
	new Swiper('.slider-tips__body', {
		observer: true,
		observeParents: true,
		slidesPerView: 3,
		spaceBetween: 32,
		watchOverflow: true,
		speed: 800,
		loop: true,
		pagination: {
			el: '.slider-tips__dotts',
			clickable: true,
		},
		navigation: {
			nextEl: '.slider-tips .slider-arrow_next',
			prevEl: '.slider-tips .slider-arrow_prev',
		},
		breakpoints: {
			320: {
				slidesPerView: 1.1,
				spaceBetween: 15
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 20
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 32
			},
		}
	});
}

// ГАЛЕРЕЯ Furniture
const furniture = document.querySelector('.furniture__body');
if (furniture && !isMobile.any()) {
	const furnitureItems = document.querySelector('.furniture__items');
	const furnitureColumn = Array.from(document.querySelector('.furniture__column'));

	const speed = furniture.dataset.speed;

	let positionX = 0;
	let coordXprocent = 0;

	function setMouseGalleryStyle() {
		let furnitureItemsWidth = 0;
		furnitureColumn.forEach(element => {
			furnitureItemsWidth += element.offsetWidth;
		});

		const furnitureDifferent = furnitureItemsWidth - furniture.offsetWidth;
		const distX = Math.floor(coordXprocent - positionX);

		positionX = positionX + (distX * speed);
		let position = furnitureDifferent / 200 * positionX;

		furnitureItems.style.cssText = `transform: translate3d(${-position}px, 0, 0);`;

		if (Math.abs(distX) > 0) {
			requestAnimationFrame(setMouseGalleryStyle);
		} else {
			furniture.classList.remove('_init');
		}
	}

	furniture.addEventListener('mousemove', function (e) {
		const furnitureWidth = furniture.offsetWidth;

		const coordX = e.pageX - furnitureWidth / 2;

		coordXprocent = coordX / furnitureWidth * 27;

		if (!furniture.classList.contains('_init')) {
			requestAnimationFrame(setMouseGalleryStyle);
			furniture.classList.add('_init');
		}
	})
}

// ВАЛИДАЦИЯ ФОРМЫ
const footerForm = document.forms.footerForm;
if (footerForm) {
	footerForm.addEventListener('submit', function (e) {
		if (!footerForm.input.value.includes('.') || !footerForm.input.value.includes('@')) {
			footerForm.input.classList.add('_error');
			footerForm.input.focus();
			addErrorMessage(addMessage = true);
			e.preventDefault();
		} else {
			footerForm.input.classList.remove('_error');
			footerForm.input.blur();
			addErrorMessage(false);
			addSucsessMessage();
			e.preventDefault();
		}
	})

	function addErrorMessage(value) {
		if (value) {
			if (!footerForm.querySelector('.subscribe__message')) {
				const errorMessage = document.createElement('div');
				errorMessage.className = 'subscribe__message';
				errorMessage.innerHTML = 'Enter correct email';
				footerForm.append(errorMessage);
			};
		} else {
			if (footerForm.querySelector('.subscribe__message')) {
				footerForm.querySelector('.subscribe__message').remove();
			}
		}
	};

	function addSucsessMessage() {
		const sucsess = `
		<div class="page__sucsess sucsess">
			<div class="sucsess__body">
				<p class="sucsess__text"><span class="sucsess__cancel">X</span>Email sent successfully!</p>
			</div>
		</div>
		`;
		document.querySelector('.page').insertAdjacentHTML('beforeend', sucsess);
		document.body.classList.add('_lock');

		const cancelButton = document.querySelector('.sucsess__cancel');

		if (cancelButton) {
			cancelButton.onclick = function (event) {
				document.querySelector('.sucsess').remove();
				document.body.classList.remove('_lock');
				footerForm.submit();
			}
		}
	}
}






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