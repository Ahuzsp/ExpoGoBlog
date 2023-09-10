import React, { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useSelector } from "react-redux"
import Ionicon from "react-native-vector-icons/Ionicons"
import ScrollableTabView, {
	ScrollableTabBar,
	DefaultTabBar
} from "react-native-scrollable-tab-view"
export default function MyPage() {
	const tabList = useSelector((state) => state.tabList)
	const [activeTab, setActiveTab] = useState(1)
	return (
		<>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					marginTop: 20,
					paddingHorizontal: 24,
					paddingBottom: 10,
					borderBottomWidth: 1,
					borderBottomColor: "#E5E5E5"
				}}
			>
				{tabList.map((tab) => {
					return (
						<TouchableOpacity
							key={tab.id}
							style={styles.tabItem}
							onPress={() => setActiveTab(tab.id)}
						>
							<Text
								style={{
									fontSize: 16,
									color: activeTab === tab.id ? "#07c160" : "#000"
								}}
							>
								{tab.label}
							</Text>
							{tab.id === activeTab && <View style={styles.underline} />}
						</TouchableOpacity>
					)
				})}
				<Ionicon name="search-outline" size={24} color="gray"></Ionicon>
			</View>
		</>
	)
}
const styles = StyleSheet.create({
	tabItem: {
		position: "relative"
	},
	underline: {
		position: "absolute",
		height: 4,
		borderRadius: 2,
		width: 28,
		backgroundColor: "#07c160",
		position: "absolute",
		top: 24,
		left: 2
	}
})
