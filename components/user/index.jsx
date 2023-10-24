import React, { useEffect, useState } from "react"
import {
	TouchableWithoutFeedback,
	View,
	Text,
	Image,
	Pressable,
	Dimensions
} from "react-native"
import { useSelector } from "react-redux"
import IonIcons from "react-native-vector-icons/Ionicons"
const screenWidth = Dimensions.get("window").width
export default function User({ navigation }) {
	const authUser = useSelector((state) => state.user)
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
								style={{
									fontSize: 20,
									fontWeight: 600,
									maxWidth: screenWidth / 2 - 20
								}}
								numberOfLines={1}
								ellipsizeMode="tail"
							>
								{authUser.username}
							</Text>
							<Text style={{ fontSize: 16 }}>等级：初级</Text>
						</View>
					</View>
					<Pressable
						style={{ flexDirection: "row" }}
						onPress={() => navigation.navigate("PersonPageScreen")}
					>
						<Text style={{ fontSize: 16 }}>个人主页</Text>
						<IonIcons
							name="chevron-forward-outline"
							size={20}
							color="gray"
						></IonIcons>
					</Pressable>
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
