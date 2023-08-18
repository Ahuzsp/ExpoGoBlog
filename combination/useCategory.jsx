const html = require("../assets/category/html.png")
const css = require("../assets/category/css.png")
const js = require("../assets/category/javascript.png")
const jsfn = require("../assets/category/jsfn.png")
const vue = require("../assets/category/vue.png")
const react = require("../assets/category/react.png")
const rn = require("../assets/category/rn.png")
const categoryList = [
	{
		url: html,
		name: "html",
		label: "html",
		description: "页面骨架基础html",
		value: 1
	},
	{ url: css, name: "css", label: "css", description: "样式层叠表", value: 2 },
	{
		url: js,
		name: "javascript",
		label: "javascript",
		description: "驱动页面交互",
		value: 3
	},
	{
		url: jsfn,
		name: "js手写题目",
		label: "js手写题目",
		description: "js的各种方法手写练习",
		value: 4
	},
	{
		url: vue,
		name: "vue",
		label: "vue",
		description: "前端渐进式框架vue",
		value: 5
	},
	{
		url: react,
		name: "React",
		label: "react",
		description: "前端主流框架react",
		value: 6
	},
	{
		url: rn,
		name: "react-native",
		label: "react-native",
		description: "react跨端框架",
		value: 7
	}
]

export default categoryList
