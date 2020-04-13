import files_json from '../data/files.json';
import {REMOVE_FILE, CHANGE_BOX, REMOVE_FILES} from '../actions'; //ADD_FILE, EDIT_FILE, REMOVE_FILES

function files(state = files_json, action)
{
	switch(action.type)
	{
		case REMOVE_FILE:
		{
			var files = state.filter(file => file.id !== action.id);
			return files;
		}
		case REMOVE_FILES:
		{
			var files = state.filter(file => file.checked === false);
			return files;
		}
		case CHANGE_BOX:
		{
			var files = state;
			var file = state.find(file => file.id === action.id);
			file.checked = !file.checked;
			files.forEach((file, index) =>
			{
				if (file.id === action.id)
				{
					files[index] = file;
				}
			})
			return files;
		}
		default:
			return state;
	}
}

export default files;
