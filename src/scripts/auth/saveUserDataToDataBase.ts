import { IUserDataForDataBase } from "../interfaces";
import SERVER_METHODS from "../server/serverMethods";
import createPopupMessage from "../templates/createPopupMessage";
import CHECK_METHODS from "./checkMethods";

/**
 * @module workWithUserDataToDataBase - работа с данными пользователя в базе данных.
 * @param {string} log - логин.
 * @param {string} pas - пароль.
 * @returns {void}
 */
const workWithUserDataToDataBase = (log: string, pas: string): void => {
	if (!log || !pas) { return }

	//регистрация нового пользователя, логина нет в БД.
	const registeringNewUser = async () => {
		const checkbox = document.querySelector('.js-checkbox') as HTMLInputElement;
		const checkCheckbox = CHECK_METHODS.checkCheckbox(checkbox);
		if (!checkCheckbox) {
			createPopupMessage(`Добро пожаловать ${log}! Ваши данные не будут сохранены на сервере.`, 5000);
			return
		}
		const saveUser = await saveUserDataToDataBase(log, pas);
		if (saveUser) {
			createPopupMessage(`Добро пожаловать ${log}! Ваши данные сохранены на сервере.`, 5000);
			return
		}
		createPopupMessage('Сервер не отвечает.')
	};
	//неудача, логин уже существует, а пароль не совпадает.
	const failToRegister = () => {
		createPopupMessage(`Пользователь с никнеймом "${log}" уже существует, выберите другой ник.`, 5000);
	};
	//авторизация успешна. Логин и пароль совпадают с БД.
	const loginToApp = () => {
		createPopupMessage(`${log} мы рады вас приветствовать снова!`, 5000);
	};

	/**
	 * @function changeUserDataToDataBase - проверка логина и пароля в БД.
	 * @param {string} log 
	 * @param {string} pas 
	 * @returns {Promise<void>}
	 */
	const checkUserDataToDataBase = async (log: string, pas: string): Promise<void> => {
		const answer = await SERVER_METHODS.findByValue(`users?nickname=${log}`) as unknown as Array<IUserDataForDataBase>;

		if (!answer) {
			createPopupMessage(`Ошибка сервера.`);
			return
		}

		const newLogin = () => {
			return answer.length === 0 || answer[0]?.nickname !== log;
		};

		const loginExistsPasswordNot = () => {
			return answer[0]?.nickname === log && answer[0]?.password !== pas;
		};

		const loginExistsPasswordExists = () => {
			return answer[0]?.nickname === log && answer[0]?.password === pas;
		};

		if (newLogin()) {
			registeringNewUser();
			return
		}

		if (loginExistsPasswordNot()) {
			failToRegister();
			return
		}

		if (loginExistsPasswordExists()) {
			loginToApp();
			return
		}
	};

	/**
	 * @function saveUserDataToDataBase - сохраняет данные пользователя в БД.
	 * @param {string} log - логин.
	 * @param {string} pas - пароль.
	 * @returns {Promise<boolean>}
	 */
	const saveUserDataToDataBase = async (log: string, pas: string): Promise<boolean> => {
		const data: IUserDataForDataBase = {
			id: '',
			nickname: log,
			password: pas,
			date: new Date(),
		}
		const response = await SERVER_METHODS.postRequestWithUserData(data);

		if (response.ok) { return true }
	}
	checkUserDataToDataBase(log, pas);
}

export default workWithUserDataToDataBase;