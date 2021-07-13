
import { createClient } from 'graphql-ws'
import {
	updateServerConnectionStatus,
	WSAction,
	WSActionType,
} from 'src/redux/actions'

let socket: any = null

const socketMiddleware = () => 
  {
	return (next: any) => async (action: WSAction) => {
		switch (action.type) {
			case WSActionType.connect:
				console.log('WSActionType.connect')
				const url = `ws://${window.location.hostname}:3501/wsgraphql`

				socket = createClient({
					url,
					on: {
						closed: () => {
						  console.log("closed");
						},
						connected: () => {
						  console.log("connected");
						},
						opened: () => {
						  console.log("opened ");
						},
						error: (e) => {
						  console.log("error ", e);
						},
					  }
				})
				
				break

			case WSActionType.ws_disconnect:
				console.log('WSActionType.ws_disconnect')
				if (socket) {
					socket = null
					return next(updateServerConnectionStatus(false))
				}
				break
			case WSActionType.ping:
				console.log('WSActionType.ping')
				if (socket) {
					
					const result = await new Promise((resolve, reject) => {
						// @ts-ignore
						let result;
						socket.subscribe(
						  {
							query: '{ ping }',
						  },
						  {
							  // todo: type these responses
							next: (data: any) => (result = data),
							error: reject,
							// @ts-ignore
							complete: () => resolve(result),
						  },
						);
					})
					console.log('result', result)
				} else {
					console.log('\nTHERE WAS NO CONNECTION\n\n')
					return next(updateServerConnectionStatus(false))
				}
				break

			default:
				return next(action)
		}
	}
}

export default socketMiddleware