import AsyncStorage from "@react-native-async-storage/async-storage"
import React from "react"
import { Text, View, StyleSheet, Pressable } from "react-native"
import { Ionicons } from "react-native-vector-icons"
import { useDispatch } from "react-redux"
import { loginoutAction } from "../../store/myActions"
const settingList = [
	{ label: "编辑资料", value: 1 },
	{ label: "账号设置", value: 2 },
	{ label: "隐私政策", value: 3 }
]
export default function SettingScreen({ navigation }) {
	const dispath = useDispatch()
	const loginout = async () => {
		await AsyncStorage.removeItem("user")
		dispath(loginoutAction({}))
		navigation.goBack()
	}
	const handleBtnClick = (value) => {
		switch (value) {
			case 1:
				navigation.navigate("EditInfo")
				break
			case 2:
				navigation.navigate("Setting")
				break
			case 3:
				navigation.navigate("PrivacyPolicy")
				break
		}
	}
	return (
		<View>
			{settingList.map((li) => {
				return (
					<Pressable
						key={li.value}
						style={styles.li}
						onPress={() => handleBtnClick(li.value)}
					>
						<Text>{li.label}</Text>
						<Ionicons name="chevron-forward-outline" size={20} color="gray" />
					</Pressable>
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
