
export const HOME_PAGE = 'HOME_PAGE';
export const READING_ROOM = 'READING_ROOM';
export const JKEF_PROJECTS = 'JKEF_PROJECTS';
export const JKEF_STAT = 'JKEF_STAT';

export const showJkefIndex = () => {
	return {
		type: HOME_PAGE,
		site: 'jkef'
	}
}

export const showJkefReadingRoom = () => {
	return {
		type: READING_ROOM,
		site: 'jkef'
	}
}

export const showJkefProjects = () => {
	return {
		type: JKEF_PROJECTS,
		site: 'jkef'
	}
}

export const showJkefStat = () => {
	return {
		type: JKEF_STAT,
		site: 'jkef'
	}
}