import { IMovieCard } from "../interfaces";

/**
 * @module createPopupMovieCard - возвращает шаблонную строку с html-разметкой карточки фильма 
 * в детализированном виде.
 * @param {IMovieCard} obj - объект с установочными данными карточки.
 * @returns {string}
 */
const createPopupMovieCard = (obj: IMovieCard): string =>
	`<article class="popup-movie-card">
		<div class="popup-movie-card__come-back">
			<button class="popup-movie-card__button js-popup-button-come-back">
				<<< НАЗАД
			</button>
		</div>
		<div class="popup-movie-card__container">
			<h4 class="popup-movie-card__title">${obj.title}</h4>
			<div class="popup-movie-card__wrap-img">
				<picture class="popup-movie-card__picture">
					<source srcset="${obj.source?.webp}" type="image/webp" />
					<img class="popup-movie-card__img" src="${obj.source?.jpeg}"
						alt="${obj.alt}" />
				</picture>
				<div class="popup-movie-card__info">
					<p><span class="popup-movie-card__info-title">Актеры:</span>${obj.information?.info}</p>
					<p><span class="popup-movie-card__info-title">Сценарий:</span>${obj.information?.info}</p>
					<p><span class="popup-movie-card__info-title">Продолжительность:</span>${obj.information?.info}</p>
					<p><span class="popup-movie-card__info-title">Бюджет:</span>${obj.information?.info}</p>
					<p><span class="popup-movie-card__info-title">Кассовые сборы:</span>${obj.information?.info}</p>
					<p><span class="popup-movie-card__info-title">Рейтинг:</span>${obj.information?.info}</p>
					<p><span class="popup-movie-card__info-title">Возрастные ограничения:</span>${obj.information?.info}</p>
				</div>
			</div>
			<div class="popup-movie-card__description">
				<span class="popup-movie-card__description-title">Описание:</span>
				<p class="popup-movie-card__description-text">${obj.description}</p>
			</div>
			<video class="popup-movie-card__video-player" controls="controls">
				<source src="" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
				<source src="" type='video/webm; codecs="vp8, vorbis"'>
			</video>
		</div>
	</article>`;

export default createPopupMovieCard;