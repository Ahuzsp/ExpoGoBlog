import React from "react"
import { TouchableWithoutFeedback, View, Text, Image } from "react-native"
import { userInfo } from "../../combination/usePerson"
export default function User({ navigation }) {
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
							<Text>{userInfo.username}</Text>
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
