import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useContext } from "react"
import { Text, View, StyleSheet, Pressable } from "react-native"
import { Ionicons } from "react-native-vector-icons"
import { AuthContext } from "../../combination/usePerson"
const settingList = [
	{ label: "编辑资料", value: 1 },
	{ label: "账号设置", value: 2 },
	{ label: "关于", value: 3 }
]
export default function SettingScreen({ navigation }) {
	const { setCommonUser } = useContext(AuthContext)
	const loginout = async () => {
		await AsyncStorage.removeItem("user")
		setCommonUser({})
		navigation.goBack()
	}
	return (
		<View>
			{settingList.map((li) => {
				return (
					<View key={li.value} style={styles.li}>
						<Text>{li.label}</Text>
						<Ionicons name="chevron-forward-outline" size={20} color="gray" />
					</View>
				)
			})}
			<Pressable style={styles.loginout} onPress={loginout}>
				<Text style={{ color: "red" }}>退出登录</Text>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	li: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 12,
		backgroundColor: "#fff",
		height: 50,
		borderBottomWidth: 1,
		borderBottomColor: "#f2f3f4"
	},
	loginout: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
		height: 50,
		borderBottomWidth: 1,
		borderBottomColor: "#f2f3f4",
		marginTop: 15
	}
})
