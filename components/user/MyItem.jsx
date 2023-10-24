import React, { useEffect, useState } from "react"
import { View, Pressable, StyleSheet, Text } from "react-native"
import { useSelector } from "react-redux"
import { getUserReleateCounts } from "../../api/user"
export default function MyItem({ navigation }) {
	const [userReleateCount, setUserReleateCount] = useState({})
	const authUser = useSelector((state) => state.user)
	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			// 在这里执行当页面获得焦点时要执行的逻辑
			fetchData()
		})
		return () => {
			unsubscribe() // 在组件卸载时取消订阅
		}
	}, [navigation])
	// 定义fetchData函数
	const fetchData = async () => {
		if (!authUser?.userId) {
			setUserReleateCount({})
			return
		}
		const releateCount = await getUserReleateCounts({
			userId: authUser.userId
		})
		setUserReleateCount(releateCount.data || {})
	}

	const tabList = useSelector((state) => state.tabList).map((item) => {
		return {
			...item,
			count: userReleateCount[item.countKey] || 0
		}
	})
	const enterColl = (id) => {
		authUser?.userId
			? navigation.navigate("PersonPageScreen", { id: id - 1 })
			: navigation.navigate("Login")
	}
	return (
		<View style={styles.itemWrap}>
			{tabList.map((item) => {
				return (
					<Pressable
						style={styles.item}
						key={item.id}
						onPress={() => enterColl(item.id)}
					>
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
