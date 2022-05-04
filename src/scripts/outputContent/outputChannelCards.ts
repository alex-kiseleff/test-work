import { IChannelCard } from "../interfaces";
import SERVER_METHODS from "../server/serverMethods";
import createChannelCard from "../templates/createChannelCard";

/**
 * @module outputChannelCards - асинхронная функция вывода на экран карточек телеканалов.
 */
const outputChannelCards = async () => {
	//Запрос на сервер.
	const arrayCards = await SERVER_METHODS.getData('channels');
	const wrapChannelCards = document.querySelector('.js-wrap-channel');
	const arrayChannels: string[] = [];
	//Собираем массив.
	arrayCards.forEach((item: IChannelCard) => {
		arrayChannels.push(createChannelCard(item));
	});
	//Выводим массив на экран.
	arrayChannels.forEach((item: string) => {
		wrapChannelCards.innerHTML += item;
	});

	window.scroll(0, 0);
}

export default outputChannelCards;