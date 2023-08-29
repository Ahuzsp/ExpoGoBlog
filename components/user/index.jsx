import React, { useContext, useEffect, useState } from "react"
import { TouchableWithoutFeedback, View, Text, Image } from "react-native"
import { AuthContext } from "../../combination/usePerson"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function User({ navigation }) {
	const { authUser } = useContext(AuthContext)
	const [userInfo, setUserInfo] = useState({})
	useEffect(() => {
		const checkLoginStatus = async () => {
			// 检查本地是否存在 user
			const user = await AsyncStorage.getItem("user")
			if (user) {
				// 已登录，执行自动登录逻辑
				setUserInfo(JSON.parse(user))
			} else {
				setUserInfo(authUser || {})
			}
		}

		checkLoginStatus()
	}, [authUser])
	return (
		<View style={{ padding: 20 }}>
			{userInfo?.userId ? (
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						height: 50
					}}
				>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							height: "100%"
						}}
					>
						<Image
							source={{ uri: userInfo.avatar }}
							style={{ width: 50, height: 50, borderRadius: 25 }}
						></Image>
						<View
							style={{
								flexDirection: "column",
								height: "100%",
								justifyContent: "space-between",
								marginLeft: 15
							}}
						>
							<Text style={{ fontSize: 20 }}>{userInfo.username}</Text>
							<Text>等级：初级</Text>
						</View>
					</View>
					<Text style={{ fontSize: 12 }}>个人主页 ></Text>
				</View>
			) : (
				<TouchableWithoutFeedback onPress={() => navigation.navigate("Login")}>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center"
						}}
					>
						<Image
							source={{
								uri: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
							}}
							style={{ width: 40, height: 40, borderRadius: 20 }}
						></Image>
						<Text style={{ marginLeft: 12 }}>登录/注册</Text>
					</View>
				</TouchableWithoutFeedback>
			)}
		</View>
	)
}
