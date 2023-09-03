import React from "react"
import { View, Pressable, StyleSheet, Text, Dimensions } from "react-native"
import { useSelector } from "react-redux"
const screenWidth = Dimensions.get("window").width
const category = [
	{ label: "文章", route: "List", count: 0, id: 1 },
	{ label: "关注", route: "List", count: 0, id: 2 },
	{ label: "收藏", route: "List", count: 0, id: 3 },
	{ label: "点赞", route: "List", count: 0, id: 4 }
]

export default function MyItem({ navigation }) {
	const authUser = useSelector((state) => state.user)
	const enterColl = () => {
		authUser?.userId ? alert("已登录") : navigation.navigate("Login")
	}
	return (
		<View style={styles.itemWrap}>
			{category.map((item) => {
				return (
					<Pressable style={styles.item} key={item.id} onPress={enterColl}>
						<Text style={{ fontSize: 16 }}>{item.label}</Text>
						<Text style={{ fontSize: 16 }}>{item.count}</Text>
					</Pressable>
				)
			})}
		</View>
	)
}
const styles = StyleSheet.create({
	itemWrap: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 24
	},
	item: {
		flexDirection: "column",
		alignItems: "center"
	}
})
