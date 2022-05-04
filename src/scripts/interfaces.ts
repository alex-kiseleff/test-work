interface IcheckValidArguments {
	callback_1: boolean,
	callback_2: boolean,
	elem_1: HTMLInputElement,
	elem_2: HTMLInputElement,
	button: HTMLButtonElement
};

interface IUserDataForSessionStorage {
	nickname: string,
	tab: string,
	session: string,
	authorization: string
};

interface IUserDataForDataBase {
	id: string,
	nickname: string,
	password: string,
	date: Date
};

interface IMovieCard {
	id: string,
	genre: string,
	source: {
		webp: string,
		jpeg: string
	},
	alt: string,
	description: string,
	title: string,
	information: {
		info: string
	},
	href: string
};

interface IChannelCard {
	id: string,
	href: string,
	svg: string,
	title: string,
	information: {
		info: string
	},
	currentProgram: {
		time: string,
		name: string
	},
	secondProgram: {
		time: string,
		name: string
	},
	thirdProgram: {
		time: string,
		name: string
	}
};

export {
	IcheckValidArguments,
	IUserDataForSessionStorage,
	IUserDataForDataBase,
	IMovieCard,
	IChannelCard
};