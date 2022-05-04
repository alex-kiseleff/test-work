import { IMovieCard } from "../interfaces";
import SERVER_METHODS from "../server/serverMethods";
import { createKey } from "../sessionStorage";
import createPopupList from "../templates/createPopupList";
import { changeElementContent, getElement, handlerButtonComeBack, hideElement } from "../utils.ts/lib";
import outputVideoPlayer from "./outputVideoPlayer";

/**
 * @module outputPopupList - выводит список фильмов.
 */
const outputPopupList = async () => {
	const popupCard = document.querySelector('.js-popup-card') as HTMLElement;
	const genres = document.querySelector('.js-genres');
	const wrapGenres = document.querySelector('.js-wrap-genres');
	const newMovies = document.querySelector('.js-new-movies');
	const arrayMovies: string[] = [];
	let nameCategory = '';

	const addButtonComeBackInArray = () => {
		arrayMovies.push(
			`<div class="popup-card__come-back">
				<button class="popup-card__button js-popup-card__button">
					<<< НАЗАД
				</button>
			</div>`
		);
	};

	const clearArrayMovies = () => { arrayMovies.length = 0 };

	//наполнение массива.
	const fillArrayIfSelectedNewMovies = (arr: Array<IMovieCard>) => {
		let currentGenre = arr[1].genre;
		if (nameCategory !== 'Жанры') {
			// добавляем название категории впереди списка фильмов в формируеммый массив
			arrayMovies.push(`<h3 class="popup-card__category">${nameCategory}</h3>`)
		}

		if (nameCategory === 'Жанры') {
			arrayMovies.push(`<h3 class="popup-card__category">${currentGenre}</h3>`)
		}

		arr.forEach(item => {
			if (nameCategory === 'Жанры') {
				if (currentGenre !== item.genre) {
					arrayMovies.push(`<h3 class="popup-card__category">${item.genre}</h3>`)
				}
				currentGenre = item.genre;
			}
			arrayMovies.push(createPopupList(item));
		})
	};

	//Создание строки запроса.
	const createQueryString = (nameList: string, genre: string) => {
		if (!nameList) {
			nameCategory = genre;
			return `genres?genre=${genre}`
		}

		if (nameList === 'Новинки') {
			nameCategory = nameList;
			return 'new-movies'
		}

		if (nameList === 'Жанры') {
			nameCategory = nameList;
			return 'genres'
		}
	};

	const handlerOpenToPopupList = async (e: Event) => {
		const target = e.target as HTMLElement;
		const key = createKey();
		const categoryGenres = target.innerText?.trim();
		const text = target.lastChild?.nodeValue?.trim();
		const queryString = createQueryString(text, categoryGenres);
		//получение всех карточек фильмов.
		const cards = await SERVER_METHODS.getData(queryString) as unknown as Array<IMovieCard>;

		addButtonComeBackInArray();
		fillArrayIfSelectedNewMovies(cards);

		hideElement('header');
		hideElement('nav');
		hideElement('content');
		//вывод на экран списка фильмов.
		arrayMovies.forEach(item => {
			popupCard.innerHTML += item;
		});

		window.scroll(0, 0);
		//Слушает карточки на "клик".
		popupCard?.addEventListener('click', (e) => {
			let target = e.target as HTMLElement;
			if (target.className !== 'popup-list__title') { return }
			const text = target.innerText.trim();
			changeElementContent(popupCard, '');
			outputVideoPlayer(text);
			clearArrayMovies();
		});
		//Слушает кнопку "НАЗАД".
		getElement('popup-card__button')
			?.addEventListener('click', () => {
				handlerButtonComeBack(key);
				changeElementContent(popupCard, '');
				clearArrayMovies();
			});
	};

	genres.addEventListener('click', handlerOpenToPopupList);
	newMovies.addEventListener('click', handlerOpenToPopupList);
	wrapGenres.addEventListener('click', handlerOpenToPopupList);
}

export default outputPopupList;