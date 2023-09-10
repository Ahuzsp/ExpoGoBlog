import React from "react"
import { View, Pressable, StyleSheet, Text } from "react-native"
import { useSelector } from "react-redux"

export default function MyItem({ navigation }) {
	const authUser = useSelector((state) => state.user)
	const tabList = useSelector((state) => state.tabList)
	const enterColl = () => {
		authUser?.userId ? alert("已登录") : navigation.navigate("Login")
	}
	return (
		<View style={styles.itemWrap}>
			{tabList.map((item) => {
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
