import SettingsScreen from "../setting/index"
import ListScreen from "../list/index"
import HomePage from "../../components/home/HomePage"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Ionicons from "react-native-vector-icons/Ionicons"
import { Button, Text } from "react-native"
import { Pressable } from "react-native"
const Tab = createBottomTabNavigator()
export default function HomeScreen() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName
					if (route.name === "HomePage") {
						iconName = focused ? "ios-home" : "ios-home-outline"
					} else if (route.name === "Settings") {
						iconName = focused ? "ios-person" : "ios-person-outline"
					} else if (route.name === "List") {
						iconName = focused ? "ios-list" : "ios-list-outline"
					}
					// You can return any component that you like here!
					return <Ionicons name={iconName} size={size} color={color} />
				},
				headerTitleAlign: "center",
				tabBarActiveTintColor: "tomato",
				tabBarInactiveTintColor: "gray"
			})}
		>
			<Tab.Screen
				name="HomePage"
				options={({ navigation }) => ({
					title: "首页",
					headerTitle: "首页",
					headerRight: () => {
						return (
							<Pressable
								onPress={() => navigation.navigate("Write")}
								style={{ marginRight: 10 }}
							>
								<Text>创作中心+</Text>
							</Pressable>
						)
					}
				})}
				component={HomePage}
			/>
			<Tab.Screen
				name="List"
				options={{ title: "文章列表" }}
				component={ListScreen}
			/>
			<Tab.Screen
				name="Settings"
				options={{ title: "个人中心" }}
				component={SettingsScreen}
			/>
		</Tab.Navigator>
	)
}
