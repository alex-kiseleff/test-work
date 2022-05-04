import CHECK_METHODS from "./auth/checkMethods";
import SERVER_METHODS from "./server/serverMethods";
import { getUserDataFromStorage, overwriteCurrentValueToStorage } from "./sessionStorage";
import createPopupMessage from "./templates/createPopupMessage";
import { addClassActive, clearValueInput, debounce, elementIsDisabled, elementIsEnabled, focusOnElement, removeClassActive } from "./utils.ts/lib";

/**
 * @module - работа с блоком никнейма: показ, редактирование.
 * @param {string} login - необязательный параметр.
 */
const editNickname = (login?: string) => {
	const buttonExit = document.querySelector('.js-button-exit');
	const nicknameBox = document.querySelector('.js-nickname-box') as HTMLElement;
	const buttonOpenModal = document.querySelector('.js-button-open-modal') as HTMLButtonElement;
	const inputNickname = document.querySelector('.js-input-nickname') as HTMLInputElement;

	/**
	 * @function recoveryNickNameAfterReboot - после перезагрузки страницы проверяет никнейм в [sessionStorage],
	 * если он не существует - выход, если существует - вызывает [showNickname] и [addClassActive].
	 * @returns {void}
	 */
	const recoveryNickNameAfterReboot = (): void => {
		let userData = getUserDataFromStorage('userData');
		if (!userData.nickname) { return }
		showNickname();
		addClassActive(nicknameBox, 'header__wrap-nickname-box--active');
		addClassActive(buttonOpenModal, 'simple-button--hidden');
	};

	/**
	 * @function editValue - сохраняет значение инпута [inputNickname],
	 * после его изменения с последующей записью в хранилище и в БД.
	 * @returns {void}
	 */
	const editValue = async (): Promise<void> => {
		let promise: boolean = false;
		if (!CHECK_METHODS.checkLogin(inputNickname.value)) {
			CHECK_METHODS.setColorInvalid(inputNickname);
			elementIsDisabled(inputNickname)
			promise = await createPopupMessage('Неверный логин, он не будет сохранен!');
			if (promise) {
				elementIsEnabled(inputNickname);
				focusOnElement(inputNickname);
			}
			return
		}
		if (CHECK_METHODS.checkLogin(inputNickname.value)) {
			CHECK_METHODS.setColorValid(inputNickname);
			try {
				(async () => {
					const log = getUserDataFromStorage('userData')?.nickname;//получает текущий логин из sessionStorage
					const userFromDataBase = await SERVER_METHODS.findByValue(`users?nickname=${log}`);//получает user из БД
					const response = await SERVER_METHODS.changeUserDataToDataBase({//меняет текущий логин на новый в БД
						nickname: inputNickname.value,
					}, userFromDataBase[0].id);

					if (response.ok) {
						overwriteCurrentValueToStorage('nickname', inputNickname.value);
						elementIsDisabled(inputNickname)
						promise = await createPopupMessage('Новый логин успешно сохранен!');
						if (promise) { elementIsEnabled(inputNickname) }
					}
				})()
			} catch (err) {
				console.log(err);
			}
		}
		CHECK_METHODS.changeColorInput(
			inputNickname,
			CHECK_METHODS.checkLogin(inputNickname.value))
	};

	/**
	 * @function showNickname - если существует никнейм в [sessionStorage]
	 * присваивает инпуту [inputNickname] это значение.
	 * @returns {void}
	 */
	const showNickname = () => {
		let userData = getUserDataFromStorage('userData');
		if (userData.nickname) {
			inputNickname.value = userData.nickname;
			return
		}
		removeClassActive(nicknameBox, 'header__wrap-nickname-box--active');
		removeClassActive(buttonOpenModal, 'simple-button--hidden');
	};

	const exitFromAuthorization = (e: Event) => {
		e.preventDefault();
		removeClassActive(nicknameBox, 'header__wrap-nickname-box--active');
		removeClassActive(buttonOpenModal, 'simple-button--hidden');
		clearValueInput(inputNickname);
		overwriteCurrentValueToStorage('nickname', '');
		overwriteCurrentValueToStorage('tab', 'фильмы');
		overwriteCurrentValueToStorage('authorization', 'false');
		buttonExit.removeEventListener('click', exitFromAuthorization);
	};

	buttonExit.addEventListener('click', exitFromAuthorization);

	recoveryNickNameAfterReboot();
	if (login) { overwriteCurrentValueToStorage('nickname', login) };
	addClassActive(nicknameBox, 'header__wrap-nickname-box--active');
	addClassActive(buttonOpenModal, 'simple-button--hidden');
	showNickname();
	inputNickname.addEventListener('input', debounce(() => editValue(), 700))
}

export default editNickname;