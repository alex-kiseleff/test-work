import { IMovieCard } from "../interfaces";

/**
 * @module createPopupList - возвращает шаблонную строку с html разметкой карточки 
 * фильма которые будут в списке.
 * @param {IMovieCard} obj
 * @returns {string}
 */
const createPopupList = (obj: IMovieCard): string =>
	`<article class="popup-list">
		<div class="popup-list__container">
			<h4 class="popup-list__title">${obj.title}</h4>
			<div class="popup-list__wrap-block">
				<picture class="popup-list__picture">
					<source srcset="${obj.source?.webp}" type="image/webp" />
					<img class="popup-list__img" src="${obj.source?.jpeg}"
						alt="${obj.alt}" />
				</picture>
				<div class="popup-list__description">
					<h6 class="popup-list__description-title">Описание:</h6>
					<p class="popup-list__description-text">${obj.description}</p>
				</div>
			</div>
		</div>
	</article>`;

export default createPopupList;