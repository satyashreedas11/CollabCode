enum USER_CONNECTION_STATUS {
	OFFLINE = "offline",
	ONLINE = "online",
}

interface User {
	username: string
	roomId: string
	uid?: string
	email?: string | null
	status: USER_CONNECTION_STATUS
	cursorPosition: number
	typing: boolean
	currentFile: string | null
	socketId: string
}

export { USER_CONNECTION_STATUS, User }
