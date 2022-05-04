import { IChannelCard, IMovieCard, IUserDataForDataBase } from "../interfaces";

/**
 * @module
 * @type {object} SERVER_METHODS - содержит в себе базовый адрес mock-сервера [json-server],
 * а также методы работы с сервером.
 */
const SERVER_METHODS = {
	URL_BASE: 'http://localhost:3000',

	/**
	 * @method getData - получает с mock-сервера [json-server] [limit] карточек, если [limit] не задано,
	 * получает 10 карточек.
	 * @param {string} key - ключ массива JSON по которому нужно получить значения.
	 * @param {number} limit - количество выводимых карточек, по умолчанию 10.
	 * @returns {Promise<Array<IMovieCard | IChannelCard>>}
	 */
	async getData(key: string, limit?: number): Promise<Array<IMovieCard | IChannelCard>> {
		const limitOutput = limit ? `?_limit=${limit}` : '';
		const creatingQueryString = `${this.URL_BASE}/${key}${limitOutput}`;
		try {
			const response = await fetch(creatingQueryString);
			const answer = await response.json();
			return answer
		} catch (error) {
			console.error(error);
		}
	},

	/**
	 * @method findByValue - ищет совпадения на mock-сервере [json-server] по входной
	 * строке [queryString] и получает массив этих значений.
	 * @param {string} queryString - входная строка по которой идет поиск.
	 * @returns {Promise<Array<IMovieCard | IChannelCard> | Array<IUserDataForDataBase>>}
	 */
	async findByValue(queryString: string): Promise<Array<IMovieCard | IChannelCard> | Array<IUserDataForDataBase>> {
		if (!queryString) { return };
		try {
			const response = await fetch(`${this.URL_BASE}/${queryString}`);
			const answer = await response.json();
			return answer
		} catch (error) {
			console.error(error);
		}
	},

	/**
	 * @method postRequestWithUserData - сохраняет данные пользователя на mock-сервере [json-server].
	 * @param {IUserDataForDataBase} data - объект сохраняемый в базе данных.
	 * @returns {Promise<Response>}
	 */
	async postRequestWithUserData(data: IUserDataForDataBase): Promise<Response> {
		const settings = {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data)
		};

		try {
			const response = await fetch(`${this.URL_BASE}/users`, settings);
			return response
		} catch (error) {
			console.error(error);
		}
	},

	/**
	 * @method changeUserDataToDataBase - меняет значение никнейма уже существующего пользователя.
	 * @param data 
	 * @returns {Promise<Response>}
	 */
	async changeUserDataToDataBase(data: any, id: string): Promise<Response> {
		const settings = {
			method: 'PATCH',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data)
		};

		try {
			const response = await fetch(`${this.URL_BASE}/users/${id}`, settings);
			return response
		} catch (error) {
			console.error(error);
		}
	}
}

export default SERVER_METHODS;