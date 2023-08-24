export const userInfo = {
	username: "",
	password: "",
	avatar: "",
	userId: null
}

export const setPersonInfo = (data) => {
	const { username, password, avatar, userId } = data
	userInfo.username = username
	userInfo.password = password
	userInfo.avatar = avatar
	userInfo.userId = userId
}
