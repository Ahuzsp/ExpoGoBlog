import React from "react"
import {
	View,
	Text,
	StyleSheet,
	Image,
	Dimensions,
	TouchableWithoutFeedback
} from "react-native"
import moment from "moment"

const Item = ({ item, navigation }) => {
	return (
		<TouchableWithoutFeedback
			onPress={() => navigation.navigate("Detail", { id: item.articleId })}
		>
			<View style={styles.itemConatiner}>
				<Image
					source={{ uri: "http:ahuzsp.top/images/1.jpg" }}
					style={{ width: 100, height: 100, borderRadius: 10, marginRight: 10 }}
				/>
				<View style={styles.info}>
					<Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
						{item.articleTitle}
					</Text>

					<Text numberOfLines={2} ellipsizeMode="tail" style={styles.abstract}>
						{item.abstract}
					</Text>
					<View style={styles.separator}>
						<Text style={{ marginRight: 10, color: "rgb(255, 128, 0)" }}>
							阅读:&nbsp;{item.readCount ?? 0}
						</Text>
						<Text style={{ marginRight: 10, color: "rgb(255, 128, 0)" }}>
							{moment(+item.releaseTime).format("YYYY-MM-DD HH:mm:ss")}
						</Text>
						<Text>{item.category}</Text>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	)
}
const styles = StyleSheet.create({
	itemConatiner: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
		height: 120,
		fontSize: 16,
		paddingHorizontal: 10
	},
	info: {
		flex: 1,
		overflow: "hidden",
		height: 120,
		justifyContent: "space-between",
		paddingVertical: 12
	},
	title: {
		color: "#222426",
		fontSize: 20
	},
	abstract: {
		color: "#858687"
	},
	separator: {
		flexDirection: "row"
	}
})
export default Item
