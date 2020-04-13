export const REMOVE_FILE = 'REMOVE_FILE';
export const REMOVE_FILES = 'REMOVE_FILES';
export const CHANGE_BOX = 'CHANGE_BOX';

export function removeFileById(id)
{
	const action =
	{
		type: REMOVE_FILE,
		id: id
	}
	return action;
}

export function removeFilesByChecked()
{
	const action =
	{
		type: REMOVE_FILES,
	}
	return action;
}

export function changeBoxSelection(id)
{
	const action =
	{
		type: CHANGE_BOX,
		id: id
	}
	return action;
}
