import * as React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import DetailScreen from "./components/detail/index"
import WriteScreen from "./view/write"
import HomeScreen from "./view/home/index"
import LoginScreen from "./view/login/index"
import { RootSiblingParent } from "react-native-root-siblings"
const Stack = createNativeStackNavigator()
export default function App() {
	return (
		<RootSiblingParent>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name="Home"
						component={HomeScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Write"
						component={WriteScreen}
						options={{ title: "创作中心", headerTitleAlign: "center" }}
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
				</Stack.Navigator>
			</NavigationContainer>
		</RootSiblingParent>
	)
}
