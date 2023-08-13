import {
	Text,
	View,
	Image,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
	TouchableWithoutFeedback
} from "react-native"
const html = require("../../assets/category/html.png")
const css = require("../../assets/category/css.png")
const js = require("../../assets/category/javascript.png")
const jsfn = require("../../assets/category/jsfn.png")
const vue = require("../../assets/category/vue.png")
const react = require("../../assets/category/react.png")
const rn = require("../../assets/category/rn.png")
const categoryList = [
	{ url: html, name: "html", description: "页面骨架基础html", value: 1 },
	{ url: css, name: "css", description: "样式层叠表", value: 2 },
	{ url: js, name: "javascript", description: "驱动页面交互", value: 3 },
	{
		url: jsfn,
		name: "js手写题目",
		description: "js的各种方法手写练习",
		value: 4
	},
	{ url: vue, name: "vue", description: "前端渐进式框架vue", value: 5 },
	{ url: react, name: "react", description: "前端主流框架react", value: 6 },
	{ url: rn, name: "rn", description: "react跨端框架", value: 7 }
]
const { width: DimensionsWidth, height: DimensionsHeight } =
	Dimensions.get("window")
export default Category = ({ navigation }) => {
	return (
		<View>
			<Text style={styles.title}>分类</Text>

			<View style={styles.categoryConatiner}>
				{categoryList.map((item) => {
					return (
						<TouchableWithoutFeedback
							key={item.value}
							onPress={() =>
								navigation.navigate("List", { category: item.value })
							}
						>
							<View style={styles.categoryItem}>
								<Image
									source={item.url}
									style={{
										width: DimensionsWidth * 0.42,
										height: 100,
										borderRadius: 10
									}}
								/>
								<View>
									<Text style={styles.name}>{item.name}</Text>
									<Text style={styles.description}>{item.description}</Text>
								</View>
							</View>
						</TouchableWithoutFeedback>
					)
				})}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginLeft: 16
	},
	categoryConatiner: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		flexWrap: "wrap"
	},
	categoryItem: {
		marginVertical: 4,
		marginHorizontal: 5,
		padding: 5,
		backgroundColor: "#fff",
		borderRadius: 10
	},
	name: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#191919",
		marginVertical: 4
	},
	description: {
		color: "#999"
	}
})
