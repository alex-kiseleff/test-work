import { IChannelCard } from "../interfaces";

/**
 * @module createPopupChannelCard - возвращает шаблонную строку с html-разметкой карточки 
 * телеканала в детализированном виде.
 * @param {IChannelCard} obj - объект с установочными данными карточки.
 * @returns {string}
 */
const createPopupChannelCard = (obj: IChannelCard): string =>
	`<article class="popup-channel-card">
		<div class="popup-channel-card__come-back">
			<button class="popup-channel-card__button js-popup-button-come-back">
				<<< НАЗАД
			</button>
		</div>
		<div class="popup-channel-card__container">
			<h4 class="popup-channel-card__title">${obj.title}</h4>
			<video class="popup-channel-card__video-player" controls="controls">
				<source src="" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
				<source src="" type='video/webm; codecs="vp8, vorbis"'>
			</video>
			<h5 class="popup-channel-card__list-program-title">
				Программа телепередач:
			</h5>
			<div class="popup-channel-card__wrap-list-program">
				<article class="string-info string-info--current-program">
					<span class="string-info__time">
						${obj.currentProgram.time}
					</span>
					<span class="string-info__text">
						${obj.currentProgram.name}
					</span>
				</article>
				<article class="string-info">
					<span class="string-info__time">
						${obj.secondProgram.time}
					</span>
					<span class="string-info__text">
						${obj.secondProgram.name}
					</span>
				</article>
				<article class="string-info">
					<span class="string-info__time">
						${obj.thirdProgram.time}
					</span>
					<span class="string-info__text">
						${obj.thirdProgram.name}
					</span>
				</article>
			</div>
			<div class="popup-channel-card__info">
				<p>
					<span class="popup-channel-card__info-title">
						Дополнительная информация:
					</span>
					${obj.information?.info}
				</p>
			</div>
		</div>
	</article>`;

export default createPopupChannelCard;