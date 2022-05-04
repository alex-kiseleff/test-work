/**
 * @module
 * @type {object} CHECK_METHODS - объект содержащий методы проверки на соответствие регулярным
 * выражениям логина и пароля, подсветки их полей при неправильном значении,
 * включении кнопки входа в сервис.
 */
const CHECK_METHODS = {
	loginReg: /^[a-zA-Z0-9]{3,16}$/,
	passwordReg: /^(?=.*[A-Z].*[A-Z])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/,

	/**
	 * @method checkLogin - проверяет входящую строку [str] на соответствие
	 * регулярному выражению [loginReg].
	 * @param str - входящая строка.
	 * @returns {boolean}
	 */
	checkLogin(str: string): boolean {
		return this.loginReg.test(str.trim());
	},

	/**
	 * @method checkPassword - проверяет входящую строку [str] на соответствие
	 * регулярному выражению [passwordReg].
	 * @param str - входящая строка.
	 * @returns {boolean}
	 */
	checkPassword(str: string): boolean {
		return this.passwordReg.test(str.trim());
	},

	/**
	 * @method checkCheckbox - проверка чекбокса, при включенном данные будут сохранены в БД.
	 * @param {HTMLInputElement} elem 
	 * @returns {boolean}
	 */
	checkCheckbox(elem: HTMLInputElement): boolean {
		return elem.checked
	},

	/**
	 * @method activeButton - проверяет на правдивость две входящие функции, если они правдивы,
	 * тогда отключает [disabled] у [button] и выходит, иначе оставляет кнопку неактивной.
	 * @param {boolean} checkLog
	 * @param {boolean} checkPass
	 * @param {HTMLButtonElement} button 
	 * @returns {void}
	 */
	activeButton(checkLog: boolean, checkPass: boolean, button: HTMLButtonElement): void {
		if (checkLog && checkPass) {
			button.disabled = false;
			return
		}
		button.disabled = true
	},

	/**
	 * @method setColorInvalid - добавляет входящему элементу модификатор [input--invalid]
	 * на который назначены стили для подсветки неверно введенных данных.
	 * @param {HTMLInputElement} elem 
	 */
	setColorInvalid(elem: HTMLInputElement) {
		elem.classList.add('input--invalid');
	},

	/**
	 * @method setColorValid - удаляет у входящего элемента модификатор [input--invalid]
	 * на который назначены стили для подсветки неверно введенных данных.
	 * @param {HTMLInputElement} elem 
	 */
	setColorValid(elem: HTMLInputElement) {
		elem.classList.remove('input--invalid');
	},

	/**
	 * @method changeColorInput - вызывает [setColorInvalid], если 
	 * проверка [checking] возвращает ложь, и [setColorValid], если 
	 * проверка [checking] возвращает правду.
	 * @param {Element} elem - элемент передаваемый в качестве параметра.
	 * @param {boolean} checking 
	 * @returns {void}
	 */
	changeColorInput(elem: Element, checking: boolean): void {
		if (!checking) {
			this.setColorInvalid(elem);
			return
		}
		this.setColorValid(elem);
	},
}

export default CHECK_METHODS;