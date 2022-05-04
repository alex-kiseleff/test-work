import { getUserDataFromStorage, overwriteCurrentValueToStorage } from "./sessionStorage";
import { TTabs } from "./types";
import { addClassActive, removeClassActive } from "./utils.ts/lib";

/**
 * @module toggleMenu - переключение вкладок меню и контента.
 */
const toggleMenu = () => {
	const content = document.querySelector('.js-content') as HTMLElement;
	const channelList = document.querySelector('.js-channel-list') as HTMLElement;
	const navList = document.querySelector('.js-nav-list');
	const arrNavList = Array.from(document.querySelector('.js-nav-list').children);
	let activeTab: Element = null;

	/**
	 * @function recoveryOpenTabAfterReboot - открывает контент и делает активной вкладку,
	 * которые были активны до перезагрузки страницы.
	 * @returns {void}
	 */
	const recoveryOpenTabAfterReboot = (): void => {
		const userData = getUserDataFromStorage('userData');
		if (!userData.tab) { return }
		arrNavList.forEach(item => {
			if (item.textContent.toLowerCase() === userData.tab.toLowerCase()) {
				addClassActive(item, 'nav__item--active');
				toggleContent(item);
			}
		})
	};

	/**
	 * @function findActiveTab - находит элемент с модификатором [nav__item--active] в коллекции UL (вкладок меню),
	 * сохраняя найденный элемент в переменную [activeTab].
	 * @returns {Element} activeTab
	 */
	const findActiveTab = (): Element => {
		const arr = arrNavList.filter(item => item.classList.contains('nav__item--active'));
		activeTab = arr[0];
		return activeTab
	};

	/**
	 * @function toggleTabs - сравнивает выбранный по клику элемент с активным [activeTab],
	 * в случае совпадения завершает выполнение функции, иначе добавляет модификатор [nav__item--active] к классу
	 * выбранного элемента и удаляет его у прежнего [activeTab], сохраняет новый активный элемент в переменную
	 * [activeTab] и возвращает её.
	 * @param {Event} e
	 * @returns {Element} activeTab
	 */
	const toggleTabs = (e: Event): Element | void => {
		const selectedTab = e.target as HTMLElement;
		findActiveTab();
		if (selectedTab === activeTab) { return }
		addClassActive(selectedTab, 'nav__item--active');
		removeClassActive(activeTab, 'nav__item--active')
		activeTab = selectedTab;
		overwriteCurrentValueToStorage('tab', activeTab.textContent);
		return activeTab
	};

	/**
	 * @function toggleContent - в зависимости от переданной вкладки, вызывает 
	 * сответствующий контент.
	 * @param {Element} elem - элемент [LI] меню.
	 * @returns {void}
	 */
	const toggleContent = (elem: Element): void => {
		const text = elem.textContent as TTabs;
		switch (text.toLowerCase()) {
			case 'фильмы':
				addClassActive(content, 'content--active');
				removeClassActive(channelList, 'channel-list--active');
				break;
			case 'телеканалы':
				addClassActive(channelList, 'channel-list--active');
				removeClassActive(content, 'content--active');
				break;
		}
	};

	const handlerClick = (e: Event) => {
		const target = e.target as HTMLElement;
		if (target.className !== 'nav__item') { return }
		toggleTabs(e)
		toggleContent(activeTab)
	};

	navList.addEventListener('click', handlerClick);
	recoveryOpenTabAfterReboot();
}

export default toggleMenu;