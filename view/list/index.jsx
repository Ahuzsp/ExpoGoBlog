import {
	View,
	Image,
	ActivityIndicator,
	Dimensions,
	ScrollView
} from "react-native"
import { useEffect, useState, useRef } from "react"
import { apiArticleList } from "../../api/article"

import Item from "./item"
import CustomPicker from "../../components/picker/CustomPicker"
import categoryList from "../../combination/useCategory"
const contentWidth = Dimensions.get("window").width
const contentHeight = Dimensions.get("window").height
export default function List({ navigation, route }) {
	const [isLoading, setLoading] = useState(false)
	const [articleList, setArticleList] = useState([])
	let category = 1

	if (route && route.params && route.params.category) {
		category = route.params.category
	}
	useEffect(() => {
		getArticleData()
	}, [category])
	function getArticleData() {
		setLoading(true)
		apiArticleList({ query: { category } })
			.then((res) => {
				if (res.code === 0) {
					setArticleList(res.data)
				}
			})
			.catch((err) => {
				console.log(err)
			})
			.finally(() => setLoading(false))
	}
	const handleValuePicker = (val) => {
		category = val
		getArticleData()
	}
	return (
		<View>
			<View
				style={{
					backgroundColor: "#fff",
					paddingHorizontal: articleList.length ? 10 : 0
				}}
			>
				<CustomPicker
					options={[
						{
							url: "",
							name: "全部",
							label: "全部",
							description: "无",
							value: null
						},
						...categoryList
					]}
					modelValue={category}
					onValueChange={(value) => handleValuePicker(value)}
				/>
			</View>
			{isLoading ? (
				<View style={{ justifyContent: "center", height: contentHeight }}>
					<ActivityIndicator size="large" color="green" />
				</View>
			) : articleList.length ? (
				<ScrollView>
					<View
						style={{
							flex: 1,
							alignItems: "center",
							justifyContent: "center",
							paddingBottom: 40
						}}
					>
						{articleList.map((item) => {
							return (
								<Item
									key={item.articleId}
									item={item}
									navigation={navigation}
								/>
							)
						})}
					</View>
				</ScrollView>
			) : (
				<Image
					source={require("../../assets/default/no_data3.png")}
					style={{ width: contentWidth }}
				></Image>
			)}
		</View>
	)
}
