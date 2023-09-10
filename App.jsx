import * as React from "react"
import { Image, Text, View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import DetailScreen from "./components/detail/index"
import WriteScreen from "./view/write"
import HomeScreen from "./view/home/index"
import LoginScreen from "./view/login/index"
import SettingScreen from "./view/setting/index"
import PrivacyPolicy from "./view/privacyPolicy/index"
import PersonPageScreen from "./view/person/myPage"
import { RootSiblingParent } from "react-native-root-siblings"
import EditInfo from "./view/setting/editInfo"
import { Provider } from "react-redux"
import store from "./store/index"
const Stack = createNativeStackNavigator()
export default function App() {
	return (
		<Provider store={store}>
			<RootSiblingParent>
				<NavigationContainer>
					<Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
						<Stack.Screen
							name="Home"
							component={HomeScreen}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="Write"
							component={WriteScreen}
							options={{ title: "创作中心" }}
						/>
						<Stack.Screen
							name="Detail"
							component={DetailScreen}
							options={{ title: "" }}
						/>
						<Stack.Screen
							name="Login"
							component={LoginScreen}
							options={{ title: "登录", headerShown: false }}
						/>
						<Stack.Screen
							name="Setting"
							component={SettingScreen}
							options={{ title: "设置" }}
						/>
						<Stack.Screen
							name="EditInfo"
							component={EditInfo}
							options={{
								title: "编辑资料"
								// headerShadowVisible: false 这是控制头部阴影的
							}}
						/>
						<Stack.Screen
							name="PrivacyPolicy"
							component={PrivacyPolicy}
							options={{
								title: "隐私政策"
							}}
						/>
						<Stack.Screen
							name="PersonPageScreen"
							component={PersonPageScreen}
							options={{
								title: "我的",
								// header: () => <CustomHeader />
								headerBackground: () => (
									<Image
										style={{
											flex: 1,
											resizeMode: "cover",
											alignItems: "center"
										}}
										source={require("./assets/category/css.png")}
									/>
								)
							}}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</RootSiblingParent>
		</Provider>
	)
}
