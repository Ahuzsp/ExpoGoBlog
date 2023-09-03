// 导入所需的依赖
import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "./reducers"

// 创建 store
const store = configureStore({
	reducer: rootReducer
})

export default store
