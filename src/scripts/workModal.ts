import { TPositionBody } from "./types";
import { addClassActive, focusOnElement, removeClassActive } from "./utils.ts/lib";

/**
 * @module workModal - работа модального окна авторизации.
 */
const workModal = () => {
	const modal = document.querySelector('.js-modal');
	const loginElement = document.querySelector('.js-login') as HTMLInputElement;
	const buttonEnter = document.querySelector('.js-button-enter');
	const buttonOpenModal = document.querySelector('.js-button-open-modal');

	/**
	 * @function clickOutZoneToClose - сравнивает класс таргетируемого элемента полученного при 
	 * событии с классом [modalClass], если они равны, вызывает функцию [removeClassActive]
	 * и [positionBody].
	 * @param {Event} e
	 * @returns {void}
	 */
	const clickOutZoneToClose = (e: Event) => {
		const target = e.target as HTMLElement;
		const modalClass = 'modal js-modal modal--active';
		if (target.className === modalClass) {
			removeClassActive(modal, 'modal--active');
			positionBody('static');
		}
	};

	/**
	 * @function positionBody - в зависимости от переданных параметров запрещает(fixed) или
	 * разрешает(static) скролл контента на странице.
	 * @param {string} pos - свойство [position], по умолчанию равно пустой строке.
	 * @param {string} top - свойство [top], по умолчанию равно нулю.
	 * @returns {void}
	 */
	const positionBody = (pos: TPositionBody, top: number = 0): void => {
		const styleBody = document.body.style;
		styleBody.position = pos;
		styleBody.top = top + 'px';
		styleBody.overflowY = 'scroll';
		window.scrollTo(0, parseInt(styleBody.top || '0') * -1);
	};

	const openModal = (e: Event) => {
		e.preventDefault();
		addClassActive(modal, 'modal--active');
		positionBody('fixed');
		focusOnElement(loginElement);
		modal.addEventListener('click', clickOutZoneToClose)
	};

	const closeModal = (e: Event) => {
		e.preventDefault();
		removeClassActive(modal, 'modal--active');
		positionBody('static');
	};

	buttonOpenModal.addEventListener('click', openModal);
	buttonEnter.addEventListener('click', closeModal);
}

export default workModal;