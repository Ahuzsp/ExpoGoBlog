import { View, Image, Text, Button, Dimensions, ScrollView } from "react-native"
import { useEffect, useState } from "react"
import { apiArticleList } from "../../api/article"

import Item from "./item"
const contentWidth = Dimensions.get("window").width
export default function List({ navigation, route }) {
	const [articleList, setArticleList] = useState([])
	const { category } = route.params
	useEffect(() => {
		function getArticleData() {
			apiArticleList({ query: { category } })
				.then((res) => {
					if (res.code === 0) {
						setArticleList(res.data)
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
			{articleList?.length ? (
				<ScrollView>
					<View
						style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
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
					source={require("../../assets/default/no_data.png")}
					style={{ width: contentWidth }}
				></Image>
			)}
		</View>
	)
}
