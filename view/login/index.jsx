import React, { useContext } from "react"
import {
	View,
	Image,
	TextInput,
	StyleSheet,
	Text,
	Button,
	Dimensions,
	Pressable,
	TouchableOpacity
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Toast from "react-native-root-toast"
import { createUser, userLogin } from "../../api/user"
import { AuthContext } from "../../combination/usePerson"
import Ionicons from "react-native-vector-icons/Ionicons"
import AsyncStorage from "@react-native-async-storage/async-storage"
const CustomToast = (content, duration = 1000) => {
	let toast = Toast.show(content, {
		position: Toast.positions.CENTER
	})

	setTimeout(function hideToast() {
		Toast.hide(toast)
	}, duration)
}
const height = Dimensions.get("window").height

export default function Login({ navigation }) {
	const [user, setUser] = React.useState({
		username: "",
		password: ""
	})
	const { setCommonUser } = useContext(AuthContext)
	const [loginState, setLoginState] = React.useState(true)
	const isClickable = user.username && user.password
	const getDisableStyle = () => {
		if (isClickable) return {}
		return {
			opacity: 0.5
		}
	}
	const submitLogin = () => {
		if (!isClickable) return
		// 判断是注册还是登录
		if (loginState) {
			userLogin(user)
				.then(async (res) => {
					if (res?.code === 0) {
						saveUserInfo(res.data.user, "登录成功")
					} else {
						CustomToast(res.message)
					}
				})
				.catch((err) => {
					CustomToast(err.message)
				})
			return
		}
		createUser(user)
			.then((res) => {
				if (res.code === 0) {
					saveUserInfo(res.data.user, "注册并登录成功")
				} else {
					CustomToast(res.message)
				}
			})
			.catch((err) => {
				CustomToast(err.message)
			})
	}
	const saveUserInfo = async (data, msg) => {
		await AsyncStorage.setItem("user", JSON.stringify(data))
		setCommonUser(data)
		CustomToast(msg)
		// 返回
		navigation.goBack()
	}
	return (
		<SafeAreaView style={{ padding: 10 }}>
			<Ionicons
				name="ios-close"
				size={28}
				color="gray"
				onPress={() => navigation.goBack()}
			></Ionicons>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
					marginTop: 40
				}}
			>
				<Image
					source={require("../../assets/icon.png")}
					style={{ width: 40, height: 40, borderRadius: 20 }}
				></Image>
				<Text style={{ fontSize: 26, marginLeft: 10 }}>登录体验更多精彩</Text>
			</View>
			<View style={{ marginTop: 40, paddingHorizontal: 20 }}>
				<TextInput
					style={styles.baseInput}
					placeholder="请输入账号"
					value={user.username}
					clearButtonMode="always"
					onChangeText={(text) => setUser({ ...user, username: text })}
				></TextInput>
				<TextInput
					style={styles.baseInput}
					placeholder="请输入密码"
					clearButtonMode="always"
					value={user.password}
					secureTextEntry={true}
					onChangeText={(text) => setUser({ ...user, password: text })}
				></TextInput>
				<View style={{ marginTop: 15 }}>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<Text>{loginState ? "没有账号？点击" : "已有账号，点击"}</Text>
						<Pressable onPress={() => setLoginState(!loginState)}>
							<Text style={{ color: "#1677ff" }}>
								{loginState ? "注册" : "登录"}
							</Text>
						</Pressable>
					</View>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "center",
						marginTop: 15
					}}
				>
					<TouchableOpacity
						activeOpacity={isClickable ? 0.7 : 0.5}
						style={[styles.button, getDisableStyle()]}
						onPress={submitLogin}
					>
						<Text style={{ color: "white" }}>
							{loginState ? "登录" : "注册"}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	baseInput: {
		height: 40,
		// borderRadius: 5,
		borderBottomWidth: 1,
		borderBottomColor: "rgb(200, 200, 200)",
		marginTop: 20,
		paddingHorizontal: 10
	},
	button: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#1677ff",
		height: 40,
		width: 120,
		borderRadius: 5
	}
})
