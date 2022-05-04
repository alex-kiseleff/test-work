import CHECK_METHODS from './checkMethods';
import workModal from '../workModal';
import editNickName from '../editNickname';
import { clearValueInput } from '../utils.ts/lib';
import { overwriteCurrentValueToStorage } from '../sessionStorage';
import workWithUserDataToDataBase from './saveUserDataToDataBase';

/**
 * @module auth - модуль авторизации.
 */
const auth = () => {
	const login = document.querySelector('.js-login') as HTMLInputElement;
	const password = document.querySelector('.js-password') as HTMLInputElement;
	const buttonEnter = document.querySelector('.js-button-enter') as HTMLInputElement;

	/**
	 * @function inputLogin - проверяет значение инпута логина при его валидности и 
	 * валидности значения пароля делает кнопку входа активной, иначе выделяет 
	 * поле инпута некорректным цветом.
	 * @returns {void}
	 */
	const inputLogin = (): void => {
		CHECK_METHODS.changeColorInput(login, CHECK_METHODS.checkLogin(login.value));
		CHECK_METHODS.activeButton(
			CHECK_METHODS.checkLogin(login.value),
			CHECK_METHODS.checkPassword(password.value),
			buttonEnter
		)
	};

	/**
	 * @function inputPassword - проверяет значение инпута пароля при его валидности и 
	 * валидности значения логина делает кнопку входа активной, иначе выделяет 
	 * поле инпута некорректным цветом.
	 * @returns {void}
	 */
	const inputPassword = () => {
		CHECK_METHODS.changeColorInput(password, CHECK_METHODS.checkPassword(password.value));
		CHECK_METHODS.activeButton(
			CHECK_METHODS.checkLogin(login.value),
			CHECK_METHODS.checkPassword(password.value),
			buttonEnter
		)
	};

	login.addEventListener('input', inputLogin);
	password.addEventListener('input', inputPassword);

	buttonEnter.addEventListener('click', (e: Event) => {
		e.preventDefault();
		workWithUserDataToDataBase(login.value, password.value);
		editNickName(login.value);
		workModal();
		overwriteCurrentValueToStorage('authorization', 'true');
		clearValueInput(login);
		clearValueInput(password);
	});
}

export default auth;