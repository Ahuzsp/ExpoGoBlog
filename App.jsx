import * as React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import DetailScreen from "./components/detail/index"
import WriteScreen from "./view/write"
import HomeScreen from "./view/home/index"
import LoginScreen from "./view/login/index"
import SettingScreen from "./view/setting/index"
import { RootSiblingParent } from "react-native-root-siblings"
import { AuthProvider } from "./combination/usePerson"
const Stack = createNativeStackNavigator()
export default function App() {
	return (
		<AuthProvider>
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
					</Stack.Navigator>
				</NavigationContainer>
			</RootSiblingParent>
		</AuthProvider>
	)
}
