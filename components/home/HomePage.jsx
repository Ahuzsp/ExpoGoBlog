import { Text, View, ScrollView } from "react-native"
import Carousel from "../carousel"
import Category from "../category"
export default function HomePage({ navigation }) {
	return (
		<ScrollView style={{ backgroundColor: "#f0f0f0" }}>
			<Carousel navigation={navigation} />
			<Category navigation={navigation} />
		</ScrollView>
	)
}
