import {
	View,
	Image,
	ActivityIndicator,
	Button,
	Dimensions,
	ScrollView
} from "react-native"
import { useEffect, useState } from "react"
import { apiArticleList } from "../../api/article"

import Item from "./item"
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
		function getArticleData() {
			setLoading(true)
			apiArticleList({ query: { category } })
				.then((res) => {
					if (res.code === 0) {
						setArticleList(res.data)
						setLoading(false)
					}
				})
				.catch((err) => {
					console.log(err)
				})
		}
		getArticleData()
	}, [category])
	return (
		<View>
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
							justifyContent: "center"
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
