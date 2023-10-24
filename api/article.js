import service from "../axios"

export const apiArticleList = (query = {}) =>
	service.get("article/getAllList", query)

export const getDetailById = (query = {}) => {
	return service.get("article/getDetailById", { query })
}
export const addArticle = (data = {}) => {
	return service.post("article/addArticle", data)
}
export const upload = (data = {}) => {
	return service.post("upload/upload", data)
}
export const collect = (data = {}) => {
	return service.post("article/collect", data)
}
export const follow = (data = {}) => {
	return service.post("article/follow", data)
}
export const queryArticleReleate = (query = {}) => {
	return service.get("article/queryArticleReleate", { query })
}
