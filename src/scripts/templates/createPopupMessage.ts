import { addClassActive, elementIsDisabled, elementIsEnabled, changeElementContent, removeClassActive } from "../utils.ts/lib";

/**
 * @module createPopupMessage - выводит на экран всплывающее сообщение
 * на [delay] мс и убирает его.
 * @param {string} message - сообщение.
 * @returns {Promise<boolean>}
 */
const createPopupMessage = async (message: string, delay: number = 3000): Promise<boolean> => {
	const buttonSearch = document.querySelector('.js-button-search') as HTMLButtonElement;
	const popupMessage = document.querySelector('.popup-message') as HTMLElement;
	const title = document.querySelector('.popup-message__title') as HTMLElement;

	changeElementContent(title, message);
	addClassActive(popupMessage, 'popup-message--active');
	elementIsDisabled(buttonSearch);

	/**
	 * @Promise - ждет пока всплывающее сообщение открыто, как закрылось
	 *  возвращает [true].
	 */
	let promise = new Promise(resolve => {
		setTimeout(() => {
			removeClassActive(popupMessage, 'popup-message--active');
			elementIsEnabled(buttonSearch);
			resolve('true');
		}, delay);
	});
	const result = await promise;
	if (result) { return true }
}

export default createPopupMessage;