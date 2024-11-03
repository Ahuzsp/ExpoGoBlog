import React from "react"
import {
	View,
	Text,
	StyleSheet,
	Image,
	Pressable,
	Dimensions
} from "react-native"
import Swiper from "react-native-swiper"

const Carousel = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Swiper
				style={styles.wrapper}
				autoplay
				autoplayTimeout={3.5}
				dotStyle={styles.dot}
				activeDotStyle={styles.activeDot}
			>
				<Pressable
					style={styles.slide}
					onPress={() => {
						navigation.navigate("Detail", { id: 7, userId: 1 })
					}}
				>
					<Image
						source={{ uri: "https://i.ibb.co/nL4JPtw/dog.jpg" }}
						style={{
							width: Dimensions.get("window").width,
							height: 150
						}}
					/>
				</Pressable>
				<Pressable
					style={styles.slide}
					onPress={() => {
						navigation.navigate("Detail", { id: 27, userId: 1 })
					}}
				>
					<Image
						source={{ uri: "https://i.ibb.co/nL4JPtw/dog.jpg" }}
						style={{
							width: Dimensions.get("window").width,
							height: 150
						}}
					/>
				</Pressable>
				<Pressable
					style={styles.slide}
					onPress={() => {
						navigation.navigate("Detail", { id: 12, userId: 1 })
					}}
				>
					<Image
						source={{ uri: "https://i.ibb.co/nL4JPtw/dog.jpg" }}
						style={{
							width: Dimensions.get("window").width,
							height: 150
						}}
					/>
				</Pressable>
			</Swiper>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		height: 150,
		paddingHorizontal: 10,
		marginBottom: 20
	},
	wrapper: {},
	slide: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 5
	}
})

export default Carousel
