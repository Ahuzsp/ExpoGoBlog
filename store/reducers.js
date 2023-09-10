// reducers/myReducer.js
const initialState = {
	isLoggedIn: false,
	error: null,
	user: {},
	isLoading: false,
	categoryOption: {},
	// tabList: ["个人信息", "我的文章", "我的评论", "我的关注", "我的收藏"]
	tabList: [
		{ label: "文章", route: "List", count: 0, id: 1 },
		{ label: "关注", route: "List", count: 0, id: 2 },
		{ label: "收藏", route: "List", count: 0, id: 3 },
		{ label: "点赞", route: "List", count: 0, id: 4 }
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
