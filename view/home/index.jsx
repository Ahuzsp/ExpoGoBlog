import { createNativeStackNavigator } from "@react-navigation/native-stack"
import DetailScreen from "../../components/detail/index"
import ListScreen from "../list/index"
import HomePage from "../../components/home/HomePage"

const Stack = createNativeStackNavigator()
export default function HomeScreen() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="HomePage"
				component={HomePage}
				options={{
					title: "首页",
					headerTitleAlign: "center"
				}}
			/>
			<Stack.Screen name="List" component={ListScreen} />
			<Stack.Screen
				name="Detail"
				component={DetailScreen}
				options={{ title: "" }}
			/>
		</Stack.Navigator>
	)
}
