import service from "../axios"

export const apiArticleList = (query = {}) =>
	service.get("articles/getArticles", query)

export const getDetailById = (query = {}) => {
	return service.get("articles/getDetailById", { query })
}
export const addArticle = (data = {}) => {
	return service.post("articles/addArticle", data)
}
export const upload = (data = {}) => {
	return service.post("upload/upload", data)
}
export const collect = (data = {}) => {
	return service.post("articles/collect", data)
}
export const follow = (data = {}) => {
	return service.post("articles/follow", data)
}
export const queryArticleReleate = (query = {}) => {
	return service.get("articles/queryArticleReleate", { query })
}
