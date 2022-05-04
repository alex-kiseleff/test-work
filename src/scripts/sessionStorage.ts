import { IUserDataForSessionStorage } from "./interfaces";
import { TProperty } from "./types";

/**
 * @function getUserDataFromStorage - получает из sessionStorage JSON строку по ключу [key],
 * преобразует его в объект.
 * @param {string} key - ключ по которому нужно получить значение.
 * @returns {IUserDataForSessionStorage || null}
 */
const getUserDataFromStorage = (key: string): IUserDataForSessionStorage | null => {
	return JSON.parse(sessionStorage.getItem(key));
};

/**
 * @function createKey - создает ключ массива mock-сервера, взависимости от 
 * открытой вкладки (значений tab сохраненных в [sessionStorage]).
 * @returns {string}
 */
const createKey = (): string => {
	const userData = getUserDataFromStorage('userData');
	if (userData.tab) {
		if (userData.tab.toLowerCase() === 'фильмы') { return 'new-movies' };
		if (userData.tab.toLowerCase() === 'телеканалы') { return 'channels' };
	}
};

/**
 * @function saveUserDataToStorage - записывает объект [userData] в sessionStorage в виде JSON строки.
 * @param {string} key - ключ под которым нужно сохранить значение.
 * @param {IUserDataForSessionStorage} userData - объект.
 * @returns {void}
 */
const saveUserDataToStorage = (key: string, userData: IUserDataForSessionStorage) => {
	sessionStorage.setItem(key, JSON.stringify(userData));
};

/**
 * @function overwriteCurrentValueToStorage - перезаписывает свойство [property] в объекте [userData].
 * @param {TProperty} property - свойство объекта [userData], которое нужно поменять.
 * @param {string} newValue - новое значение.
 * @returns {void}
 */
const overwriteCurrentValueToStorage = (property: TProperty, newValue: string): void => {
	let userData: IUserDataForSessionStorage = getUserDataFromStorage('userData');
	if (userData) {
		userData[property] = newValue;
		saveUserDataToStorage('userData', userData);
	}
};

export { getUserDataFromStorage, saveUserDataToStorage, overwriteCurrentValueToStorage, createKey };