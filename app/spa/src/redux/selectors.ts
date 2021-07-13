import { Store } from 'src/redux/store'

export const isServerConnected = (state: Store): boolean => {
	return state.serverConnection
}