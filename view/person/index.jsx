import { View, Text, Button } from "react-native"
import User from "../../components/user"
import MyItem from "../../components/user/MyItem"
export default function PersonScreen({ navigation }) {
	return (
		<View style={{ backgroundColor: "white", flex: 1 }}>
			<User navigation={navigation} />
			<MyItem navigation={navigation}></MyItem>
		</View>
	)
}
