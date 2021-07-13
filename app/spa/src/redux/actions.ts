
export enum ActionType {
	UPDATE_SERVER_CONNECTION_STATUS = 'UPDATE_SERVER_CONNECTION_STATUS',
}

export enum WSActionType {
	ws_event = 'ws_event',
	connect = 'connect',
	ws_disconnect = 'ws_disconnect',
	ping = 'ping',
}

export type Action =
	| {
			type: ActionType.UPDATE_SERVER_CONNECTION_STATUS
			serverConnection: boolean
	  }

export type WSAction =
	| {
		type: 'connect'
	} | {
		type: 'ws_disconnect'
	} | {
		type: 'ping'
	}

export const updateServerConnectionStatus = (status: boolean): Action => {
	return {
		type: ActionType.UPDATE_SERVER_CONNECTION_STATUS,
		serverConnection: status,
	}
}



export const sendWSConnectionRequest = (): WSAction => {
	return {
		type: WSActionType.connect,
	}
}

export const sendWSDisconnect = (): WSAction => {
	return {
		type: WSActionType.ws_disconnect,
	}
}

export const ping = (): WSAction => {
	return {
		type: WSActionType.ping,
	}
}
