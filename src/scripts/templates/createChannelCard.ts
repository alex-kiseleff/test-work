import { IChannelCard } from "../interfaces";

/**
 * @module createChannelCard - возвращает шаблонную строку с html-разметкой карточки телеканала.
 * @param {IChannelCard} obj - объект с установочными данными карточки.
 * @returns {string}
 */
const createChannelCard = (obj: IChannelCard): string =>
	`<article class="block-channel block-channel--hovered js-block-channel">
		<div class="block-channel__wrap-logo">
			${obj.svg}
		</div>
		<div class="block-channel__wrap-list-program">
			<h4 class="block-channel__title">${obj.title}</h4>
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
	</article>`;

export default createChannelCard;