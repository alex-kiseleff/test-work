import { IChannelCard, IMovieCard } from "../interfaces";
import SERVER_METHODS from "../server/serverMethods";
import { createKey } from "../sessionStorage";
import createPopupChannelCard from "../templates/createPopupChannelCard";
import createPopupMovieCard from "../templates/createPopupMovieCard";
import { changeElementContent, getElement, handlerButtonComeBack, hideElement } from "../utils.ts/lib";

/**
 * @module outputtingDetailInfoCard - выводит видеоплеер и детализированную информацию о кликнутой карточке
 * в отдельном [popup].
 * @param {string} str - необязательная входящая строка для формирования строки запроса из 
 * выпадающего списка поиска.
 * @returns {void}
 */
const outputtingDetailInfoCard = (str: string = ''): void => {
	const wrapMovies = document.querySelector('.js-wrap-movies');
	const wrapChannels = document.querySelector('.js-wrap-channel');
	const comparedMovieCardClass = 'card-movie card-movie--hovered js-card-movie';
	const movieCardClass = '.card-movie.card-movie--hovered.js-card-movie';
	const comparedChannelCardClass = 'block-channel block-channel--hovered js-block-channel';
	const channelCardClass = '.block-channel.block-channel--hovered.js-block-channel';
	let key = '';

	/**
	 * @function getTextFromParent - находит родителя с классом [classParent], 
	 * возвращает название карточки.
	 * @param {Event} e 
	 * @param {string} classParent - класс искомого родителя.
	 * @param {string} comparedClass - сравниваемый класс.
	 * @returns {string | void}
	 */
	const getTextFromParent = (e: Event, classParent: string, comparedClass: string): string | void => {
		const target = e.target as HTMLElement;
		const parent = target.closest(classParent);
		if (parent?.className !== comparedClass) { return };
		return parent.lastElementChild.childNodes[1].textContent
	};

	/**
	 * @function createQueryString - формирует строку запроса из ключа массива 
	 * mock-сервера и входящей строки или содержимого [textContent] кликнутого 
	 * элемента и возвращает ее.
	 * @param {string} nameCard - необязательный параметр название карточки из 
	 * выпадающего списка поиска.
	 * @param {Event} e - необязательный параметр
	 * @returns {string}
	 */
	const createQueryString = (nameCard?: string, e?: Event): string => {
		key = createKey();

		if (nameCard) {
			return `${key}?q=${nameCard}`
		}

		if (key === 'new-movies') {
			return `${key}?q=${getTextFromParent(e, movieCardClass, comparedMovieCardClass)}`
		}

		if (key === 'channels') {
			return `${key}?q=${getTextFromParent(e, channelCardClass, comparedChannelCardClass)}`
		}
	};

	const openPopup = (callback: ({ }) => string, obj: IMovieCard | IChannelCard) => {
		changeElementContent(getElement('js-popup-card'), callback(obj));
	};

	/**
	 * @function handlerToOpenCard - открывает попап с видеоплеером и детализированной информацией 
	 * карточки фильма или телеканала (зависит от [key]), вешает слушатель на кнопку "НАЗАД".
	 * @param {string} nameCard 
	 * @param {Event} e 
	 * @returns {Promise<void>}
	 */
	const handlerToOpenCard = async (nameCard?: string, e?: Event): Promise<void> => {
		if (createQueryString(nameCard, e)?.includes('undefined')) { return }

		key = createKey();
		const answer = await SERVER_METHODS.findByValue(createQueryString(nameCard, e)) as unknown as Array<IMovieCard | IChannelCard>;
		const callback = key === 'new-movies' ? createPopupMovieCard : createPopupChannelCard;

		hideElement('header');
		hideElement('nav');
		hideElement(key === 'new-movies' ? 'content' : 'channel-list');
		openPopup(callback, answer[0]);

		window.scroll(0, 0);

		getElement('js-popup-button-come-back')
			.addEventListener('click', () => { handlerButtonComeBack(key) });
	};

	if (str) { handlerToOpenCard(str) };
	wrapMovies.addEventListener('click', (e) => { handlerToOpenCard('', e) });
	wrapChannels.addEventListener('click', (e) => { handlerToOpenCard('', e) });
}

export default outputtingDetailInfoCard;