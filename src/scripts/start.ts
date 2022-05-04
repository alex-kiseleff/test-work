import workModal from './workModal';
import search from './server/search';
import auth from './auth/auth';
import toggleMenu from './toggleMenu';
import { IUserDataForSessionStorage } from './interfaces';
import { getUserDataFromStorage, saveUserDataToStorage } from './sessionStorage';
import editNickname from './editNickname';
import outputNewMovieCards from './outputContent/outputNewMovieCards';
import outputChannelCards from './outputContent/outputChannelCards';
import outputVideoPlayer from './outputContent/outputVideoPlayer';
import outputPopupList from './outputContent/outputPopupList';

/**
 * @module start - стартовый модуль.
 */
const start = () => {
	/**
	 * Объект [userData] с установочными данными пользователя, которые записываются
	 * в sessionStorage
	 * @type {IUserDataForSessionStorage}
	 * @property {string} nickName - логин пользователя.
	 * @property {string} tab - текущая вкладка (фильмы/телеканалы).
	 * @property {boolean} session - открытие/закрытие сессии.
	 * @property {string} authorization - флаг авторизации пользователя 'true'/'false'.
	 */
	const userData: IUserDataForSessionStorage = {
		nickname: '',
		tab: 'фильмы',
		session: 'true',
		authorization: 'false'
	};

	/**
	 * @function setUserData - проверяет наличие записи в [sessionStorage] с ключем
	 * [userData], если запись есть - выход, иначе записывает {@link saveUserDataToStorage}
	 * в [sessionStorage] установочный объект [userData].
	 * @returns {void}
	 */
	const setUserData = (): void => {
		if (getUserDataFromStorage('userData')) { return }
		saveUserDataToStorage('userData', userData);
	};

	setUserData();
	workModal();
	auth();
	toggleMenu();
	editNickname();
	search();
	outputNewMovieCards();
	outputChannelCards();
	outputVideoPlayer();
	outputPopupList();
};

export default start;