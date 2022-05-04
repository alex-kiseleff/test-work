/**
 * @function clearValueInput - очищает поле [input].
 * @param {HTMLInputElement} element
 * @returns {string}
 */
const clearValueInput = (element: HTMLInputElement): string => element.value = '';

/**
 * @function focusOnElement - устанавливает поле инпут, как фокусированное.
 * @param {HTMLInputElement} element
 * @returns {void}
 */
const focusOnElement = (element: HTMLInputElement): void => {
	element.focus();
};

/**
 * @function hideElement - получает элемент по селектору класса и скрывает его 
 * путем добавления модификатора класса [--hide-element] определенного в файле css как [display: none].
 * @param {string} classNameElement - название класса получаемого элемента.
 * @returns {void}
 */
const hideElement = (classNameElement: string): void => {
	const element = document.querySelector(`.${classNameElement}`);
	element.classList.add(`${classNameElement}--hide-element`);
};

/**
 * @function showElement - получает элемент по селектору класса и показывает его 
 * путем удаления модификатора класса [--hide-element] определенного в файле css как [display: none].
 * @param {string} classNameElement - название класса получаемого элемента.
 * @returns {void}
 */
const showElement = (classNameElement: string) => {
	const element = document.querySelector(`.${classNameElement}`);
	element.classList.remove(`${classNameElement}--hide-element`);
};

/**
 * @function getElement - получает элемент по селектору класса и 
 * возвращает его.
 * @param {string} classNameButtonComeBack - название класса.
 * @returns {HTMLElement}
 */
const getElement = (classNameButtonComeBack: string): HTMLElement => {
	return document.querySelector(`.${classNameButtonComeBack}`) as HTMLElement;
};

/**
 * @function changeElementContent - получает элемент по селектору класса и заменяет его 
 * содержимое на значение [newContent].
 * @param {string} classNameElement - название класса.
 * @param {string} newContent - новое содержимое контента.
 */
const changeElementContent = (element: HTMLElement, newContent: string) => {
	element.innerHTML = newContent;
};

/**
 * @function handlerButtonComeBack - показывает элементы на странице после 
 * нажатия кнопки 'НАЗАД' и записывает пустую строку в [popup] заменяя контент.
 * @param {string} key
 * @returns {void}
 */
const handlerButtonComeBack = (key: string): void => {
	showElement('header');
	showElement('nav');
	showElement(key === 'new-movies' ? 'content' : 'channel-list');
	changeElementContent(getElement('js-popup-card'), '');
};

const addClassActive = (element: Element, className: string) => {
	element.classList.add(className);
};

const removeClassActive = (element: Element, className: string) => {
	element.classList.remove(className);
};

const elementIsDisabled = (element: HTMLButtonElement | HTMLInputElement) => {
	element.disabled = true;
};

const elementIsEnabled = (element: HTMLButtonElement | HTMLInputElement) => {
	element.disabled = false;
};

/**
 * @function debounce - если [debounce] вызывается раньше [delay], таймер не начинается,
 * как только вызов произойдет позже [delay], таймер сработает.
 * @param {function} callback - функция которую вызовет [setTimeout].
 * @param {number} delay - время задержки.
 * @returns {void}
 */
const debounce = (callback: () => {}, delay: number) => {
	let timeout: any = null;
	return function () {
		clearTimeout(timeout);
		timeout = setTimeout(callback, delay)
	}
};

export {
	clearValueInput,
	focusOnElement,
	hideElement,
	showElement,
	getElement,
	handlerButtonComeBack,
	changeElementContent,
	addClassActive,
	removeClassActive,
	elementIsDisabled,
	elementIsEnabled,
	debounce
};