import { createKey } from "../sessionStorage";
import createPopupSelect from "../templates/createPopupSelect";
import createPopupMessage from "../templates/createPopupMessage";
import SERVER_METHODS from "./serverMethods";
import { IChannelCard, IMovieCard } from "../interfaces";
import { clearValueInput, getElement } from "../utils.ts/lib";

/**
 * @module search - модуль поиска в БД из поисковой строки. 
 */
const search = () => {
	const buttonSearch = document.querySelector('.js-button-search') as HTMLButtonElement;

	/**
	 * @function createQueryString - формирует строку запроса по входящим данным.
	 * @param {string} key - ключ на mock-сервере (в массиве JSON) по которому нужно получить значения.
	 * @returns {string}
	 */
	const createQueryString = (key: string): string => {
		const elementInputSearch = document.querySelector('.js-input-search') as HTMLInputElement;
		if (!elementInputSearch.value) {
			createPopupMessage('Пустой запрос!');
			return
		}
		return `${key}?q=${elementInputSearch.value}`
	};

	//Запрос на сервер.
	buttonSearch.addEventListener('click', async () => {
		const answer = await SERVER_METHODS.findByValue(createQueryString(createKey())) as unknown as Array<IMovieCard | IChannelCard>;

		if (answer) {
			if (answer.length === 0) {
				createPopupMessage('По вашему запросу ничего не найдено.');
				clearValueInput(getElement('js-input-search') as HTMLInputElement);
				return
			}
		};
		createPopupSelect(answer);
		clearValueInput(getElement('js-input-search') as HTMLInputElement);
	});
}

export default search;