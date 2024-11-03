import service from "../axios"

export const createUser = (data = {}) => service.post("/login/createUser", data)

export const userLogin = (data = {}) => service.post("users/login", data)
// 更新用户信息
export const updateUserInfo = (data = {}) =>
	service.post("login/updateUserInfo", data)
// 获取用户信息
export const getUserInfoByUserId = (query = {}) =>
	service.get("login/getUserInfoByUserId", { query })
// 获取用户点赞收藏关注列表
export const getUserReleateList = (query = {}) =>
	service.get("login/getUserReleateList", { query })
// 获取用户点赞收藏关注数量
export const getUserReleateCounts = (query = {}) =>
	service.get("login/getUserReleateCounts", { query })
