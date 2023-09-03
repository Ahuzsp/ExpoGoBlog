// reducers/myReducer.js
const initialState = {
	isLoggedIn: false,
	error: null,
	user: {},
	isLoading: false,
	categoryOption: {},
	// tabList: ["个人信息", "我的文章", "我的评论", "我的关注", "我的收藏"]
	tabList: [
		{ label: "个人信息", route: "info" },
		{ label: "我的文章", route: "article" },
		{ label: "我的评论", route: "comment" },
		{ label: "我的关注", route: "follow" },
		{ label: "我的收藏", route: "collection" }
	]
}
export default function myReducer(state = initialState, action) {
	switch (action.type) {
		case "LOGIN_SUCCESS":
			return {
				...state,
				user: action.payload
			}
		case "LOGINOUT_SUCCESS":
			return {
				...state,
				user: {}
			}
		default:
			return state
	}
}
