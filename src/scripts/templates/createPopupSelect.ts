import { IChannelCard, IMovieCard } from "../interfaces";
import outputVideoPlayer from "../outputContent/outputVideoPlayer";
import { addClassActive, changeElementContent, removeClassActive } from "../utils.ts/lib";

/**
 * @module createPopupSelect - выводит на экран [select]
 * со всеми полученными результатами поиска.
 * @param {Array<string>} arr - массив результатов.
 * @returns {void}
 */
const createPopupSelect = (arr: Array<IMovieCard | IChannelCard>): void => {
	if (!arr) { return };
	const body = document.querySelector('.body');
	const popupMessage = document.querySelector('.popup-message') as HTMLElement;
	const popupMessageContainer = document.querySelector('.popup-message__container') as HTMLElement;
	const title = document.querySelector('.popup-message__title') as HTMLElement;

	/**
	 * @function getText - возвращает текст из кликнутого целевого элемента.
	 * @param {Event} e
	 * @returns {string}
	 */
	const getText = (e: Event): string => {
		const target = e.target as HTMLElement;
		return target.textContent.trim();
	};

	const closePopup = (e: Event) => {
		const target = e.target as HTMLElement;
		const popupContainerClass = 'popup-message__container';
		const popupTitleClass = 'popup-message__title';

		if (target.className === popupContainerClass ||
			target.className === popupTitleClass) {
			return
		}

		if (target.className === 'popup-message__title popup-message__title--menu') {
			outputVideoPlayer(getText(e));
		}

		changeElementContent(popupMessageContainer, '<li class="popup-message__title"></li>');
		removeClassActive(popupMessage, 'popup-message--active');
		body.removeEventListener('click', closePopup)
	};

	arr.forEach((item: IMovieCard | IChannelCard) => {
		changeElementContent(title, `Вот то, что мы нашли по вашему запросу:</br></br></br>`);
		popupMessageContainer.innerHTML += `
			<li class="popup-message__title popup-message__title--menu">
				${item.title}
			</li></br>`;
	});

	addClassActive(popupMessage, 'popup-message--active');
	body.addEventListener('click', closePopup);
}

export default createPopupSelect;