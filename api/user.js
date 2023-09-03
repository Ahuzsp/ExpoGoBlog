import service from "../axios"

export const createUser = (data = {}) => service.post("/login/createUser", data)

export const userLogin = (data = {}) => service.post("login/userLogin", data)

export const updateUserInfo = (data = {}) =>
	service.post("login/updateUserInfo", data)

export const getUserInfoByUserId = (query = {}) =>
	service.get("login/getUserInfoByUserId", query)
