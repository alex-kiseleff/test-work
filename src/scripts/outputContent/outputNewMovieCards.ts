import { IMovieCard } from "../interfaces";
import SERVER_METHODS from "../server/serverMethods";
import createMovieCard from "../templates/createMovieCard";

/**
 * @module outputNewMovieCards - асинхронная функция вывода на экран четырёх карточек новинок кино.
 */
const outputNewMovieCards = async () => {
	//Запрос на сервер.
	const arrayCards = await SERVER_METHODS.getData('new-movies', 4);
	const wrapMovieCards = document.querySelector('.js-wrap-movies');
	const arrayMovies: string[] = [];

	arrayCards.forEach((item: IMovieCard) => {
		arrayMovies.push(createMovieCard(item))
	});

	arrayMovies.forEach((item: string) => {
		wrapMovieCards.innerHTML += item;
	});

	window.scroll(0, 0);
}

export default outputNewMovieCards;