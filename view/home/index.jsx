import PersonScreen from "../person/index"
import ListScreen from "../list/index"
import HomePage from "../../components/home/HomePage"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Ionicons from "react-native-vector-icons/Ionicons"

const Tab = createBottomTabNavigator()
export default function HomeScreen() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName
					if (route.name === "HomePage") {
						iconName = focused ? "home" : "home-outline"
					} else if (route.name === "Person") {
						iconName = focused ? "person" : "person-outline"
					} else if (route.name === "List") {
						iconName = focused ? "list" : "list-outline"
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
							<Ionicons
								name="add-circle-outline"
								size={22}
								style={{ marginRight: 10 }}
								onPress={() => navigation.navigate("Write")}
							></Ionicons>
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
				name="Person"
				options={({ navigation }) => ({
					title: "个人中心",
					headerRight: () => {
						return (
							<Ionicons
								name="settings-outline"
								size={20}
								style={{ marginRight: 20 }}
								onPress={() => navigation.navigate("Setting")}
							/>
						)
					}
				})}
				component={PersonScreen}
			/>
		</Tab.Navigator>
	)
}
