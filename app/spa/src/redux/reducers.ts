import { Action, ActionType } from 'src/redux/actions'
import { Store } from 'src/redux/store'

const initialState: Store = {
	serverConnection: false,
}

export function appReducers(
	state: Store = initialState,
	action: Action,
): Store {
	switch (action.type) {

		case ActionType.UPDATE_SERVER_CONNECTION_STATUS:
			return {
				...state,
				serverConnection: action.serverConnection,
			}
	}

	return state
}
