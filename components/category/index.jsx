import {
	Text,
	View,
	Image,
	StyleSheet,
	Dimensions,
	TouchableWithoutFeedback
} from "react-native"
import categoryList from "../../combination/useCategory"
const { width: DimensionsWidth, height: DimensionsHeight } =
	Dimensions.get("window")
export default Category = ({ navigation }) => {
	return (
		<View>
			<Text style={styles.title}>分类</Text>

			<View style={styles.categoryConatiner}>
				{categoryList.map((item) => {
					return (
						<TouchableWithoutFeedback
							key={item.value}
							onPress={() =>
								navigation.navigate("List", { category: item.value })
							}
						>
							<View style={styles.categoryItem}>
								<Image
									source={item.url}
									style={{
										width: DimensionsWidth * 0.42,
										height: 100,
										borderRadius: 10
									}}
								/>
								<View>
									<Text style={styles.name}>{item.name}</Text>
									<Text style={styles.description}>{item.description}</Text>
								</View>
							</View>
						</TouchableWithoutFeedback>
					)
				})}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginLeft: 16
	},
	categoryConatiner: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		flexWrap: "wrap"
	},
	categoryItem: {
		marginVertical: 4,
		marginHorizontal: 5,
		padding: 5,
		backgroundColor: "#fff",
		borderRadius: 10
	},
	name: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#191919",
		marginVertical: 4
	},
	description: {
		color: "#999"
	}
})
