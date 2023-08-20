import axios from "axios"
//引入qs模块，用来序列化post类型的数据

axios.defaults.timeout = 15000
const basicUrl = "http://192.168.10.105:8000"

//设置axios基础路径
const service = axios.create({
	baseURL: basicUrl
})
// 请求拦截器
service.interceptors.request.use(
	(config) => {
		// 每次发送请求之前本地存储中是否存在token，也可以通过Redux这里只演示通过本地拿到token
		// 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
		// 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
		//设置请求头
		// config.headers = {
		// 	"Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
		// }
		if (config.method === "get") {
			config.params = config.query
		}
		return config
	},
	(error) => {
		return error
	}
)
// 响应拦截器
service.interceptors.response.use(
	(response) => {
		//根据返回不同的状态码做不同的事情
		// 这里一定要和后台开发人员协商好统一的错误状态码
		if (response.status === 200) {
			const { data } = response
			return data
		} else {
			return response
		}
	},
	(error) => {
		const { response } = error
		return response.data
		// 下面这样调用会报错
		// const showMessage = useMessage()
		// showMessage("error", `code:${code}, ${msg}`)
		// return response
	}
)
//最后把封装好的axios导出
export default service
