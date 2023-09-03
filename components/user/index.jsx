import React, { useEffect, useState } from "react"
import {
	TouchableWithoutFeedback,
	View,
	Text,
	Image,
	Dimensions
} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useSelector, useDispatch } from "react-redux"
import { login } from "../../store/myActions"
const screenWidth = Dimensions.get("window").width
export default function User({ navigation }) {
	const dispatch = useDispatch()
	const authUser = useSelector((state) => state.user)
	console.log(authUser, "authUser")
	useEffect(() => {
		const fetchUserInfo = async () => {
			// 从store中获取用户信息
			if (authUser.userId) {
				// 用户已登录，进行相应处理
				console.log("authUser is logged in")
			} else {
				// 从AsyncStorage中获取用户信息
				try {
					const storedUser = await AsyncStorage.getItem("user")
					if (storedUser) {
						// 用户信息存在于AsyncStorage中，将用户信息存入store中
						dispatch(login(JSON.parse(storedUser)))
						console.log("Stored user is logged in")
					} else {
						// 用户信息不存在，不作处理
						console.log("User is not logged in")
					}
				} catch (error) {
					console.log("Error retrieving user from AsyncStorage:", error)
				}
			}
		}

		fetchUserInfo()
	}, [])
	return (
		<View style={{ padding: 20 }}>
			{authUser?.userId ? (
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
							source={{ uri: authUser.avatar }}
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
							<Text
								style={{ fontSize: 20, maxWidth: screenWidth / 2 - 20 }}
								numberOfLines={1}
								ellipsizeMode="tail"
							>
								{authUser.username}
							</Text>
							<Text style={{ fontSize: 16 }}>等级：初级</Text>
						</View>
					</View>
					<Text style={{ fontSize: 16 }}>个人主页 ></Text>
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
						<Text style={{ marginLeft: 12, fontSize: 16 }}>登录/注册</Text>
					</View>
				</TouchableWithoutFeedback>
			)}
		</View>
	)
}
