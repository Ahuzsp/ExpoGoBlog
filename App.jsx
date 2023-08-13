import * as React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeScreen from "./view/home/index"
import WriteScreen from "./view/write/index"
import SettingsScreen from "./view/setting/index"

import Ionicons from "react-native-vector-icons/Ionicons"

const Tab = createBottomTabNavigator()
export default function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName
						if (route.name === "Home") {
							iconName = focused ? "ios-home" : "ios-home-outline"
						} else if (route.name === "Settings") {
							iconName = focused ? "ios-list" : "ios-list-outline"
						} else if (route.name === "Write") {
							iconName = focused ? "ios-create" : "ios-create-outline"
						}
						// You can return any component that you like here!
						return <Ionicons name={iconName} size={size} color={color} />
					},
					tabBarStyle: {
						display: route.name === "Detail" ? "none" : "flex"
					},
					headerTitleAlign: "center",
					tabBarActiveTintColor: "tomato",
					tabBarInactiveTintColor: "gray"
				})}
			>
				<Tab.Screen
					name="Home"
					options={{
						headerShown: false
					}}
					component={HomeScreen}
				/>
				<Tab.Screen
					name="Write"
					options={{ title: "创作" }}
					component={WriteScreen}
				/>
				<Tab.Screen
					name="Settings"
					options={{ title: "设置" }}
					component={SettingsScreen}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	)
}
