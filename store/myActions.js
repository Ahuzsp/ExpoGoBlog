export function login(payload) {
	return { type: "LOGIN_SUCCESS", payload }
}
export function loginoutAction(payload) {
	return { type: "LOGINOUT_SUCCESS", payload }
}
export function behavior(payload) {
	return { type: "SET_BEHAVIOE", payload }
}
