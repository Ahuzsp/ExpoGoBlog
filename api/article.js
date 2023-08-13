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
