import { IMovieCard } from "../interfaces";

/**
 * @module createMovieCard - возвращает шаблонную строку с html-разметкой карточки фильма.
 * @param {IMovieCard} obj - объект с установочными данными карточки.
 * @returns {string}
 */
const createMovieCard = (obj: IMovieCard): string =>
	`<article class="card-movie card-movie--hovered js-card-movie">
		<div class="card-movie__wrap-img card-movie__wrap-img--hovered">
			<picture>
				<source srcset="${obj.source?.webp}" type="image/webp" />
				<img class="card-movie__img" src="${obj.source?.jpeg}"
					alt="${obj.alt}" />
			</picture>
			<div class="card-movie__description">
				${obj.description}
			</div>
		</div>
		<div class="card-movie__wrap-title">
			<h4 class="card-movie__title">${obj.title}</h4>
		</div>
	</article>`;

export default createMovieCard;