// reducers/myReducer.js
const initialState = {
	isLoggedIn: false,
	error: null,
	user: {},
	behavior: {},
	isLoading: false,
	categoryOption: {},
	tabList: [
		{ label: "文章", route: "ArticleList", id: 1, countKey: "articleCount" },
		{ label: "关注", route: "FollowList", id: 2, countKey: "followCount" },
		{ label: "收藏", route: "CollectList", id: 3, countKey: "bookmarkCount" },
		{ label: "点赞", route: "LikeList", id: 4, countKey: "likeCount" }
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
		case "SET_BEHAVIOE":
			return {
				...state,
				behavior: action.payload
			}
		default:
			return state
	}
}
