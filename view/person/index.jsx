import { View, Text, Button } from "react-native"
import User from "../../components/user"
export default function PersonScreen({ navigation }) {
	return (
		<View>
			<User navigation={navigation} />
			{/* <Button
				title="Go to Home"
				onPress={() => navigation.navigate("HomePage")}
			/> */}
		</View>
	)
}
