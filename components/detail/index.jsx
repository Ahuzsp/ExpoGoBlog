import { useEffect, useState } from "react"
import {
	View,
	Text,
	Button,
	Image,
	StyleSheet,
	ScrollView,
	Dimensions,
	Pressable,
	ActivityIndicator
} from "react-native"
import moment from "moment"
import { getDetailById } from "../../api/article"
import { getUserInfoByUserId } from "../../api/user"
import HTML from "react-native-render-html"

const contentWidth = Dimensions.get("window").width
const contentHeight = Dimensions.get("window").height
export default function DetailScreen({ route }) {
	const [loading, setLoading] = useState(false)
	const [detail, setDetail] = useState({})
	const [userInfo, setUserInfo] = useState({})
	const { userId, id } = route.params
	useEffect(() => {
		async function featchData() {
			setLoading(true)
			const user = getUserInfoByUserId({ userId })
			const article = getDetailById({ articleId: id })
			const res = await Promise.all([user, article]).catch((err) =>
				alert(err.message)
			)
			setDetail(res[1].data)
			setUserInfo(res[0].data)
			setLoading(false)
		}
		featchData()
	}, [id])

	return (
		<ScrollView>
			{loading ? (
				<View style={styles.indicator}>
					<ActivityIndicator size="large" color="green" />
				</View>
			) : (
				<View style={styles.container}>
					<View style={styles.title}>
						<Text style={styles.ft24}>{detail.articleTitle}</Text>
					</View>

					<View style={styles.user}>
						<View
							style={{ flexDirection: "row", justifyContent: "space-between" }}
						>
							<Image
								source={{ uri: userInfo.avatar }}
								style={{ width: 50, height: 50, borderRadius: 25 }}
							></Image>
							<View
								style={{
									display: "flex",
									justifyContent: "space-between",
									marginLeft: 10
								}}
							>
								<Text style={[{ color: "#8a919f" }, styles.ft16]}>
									{detail.author}
								</Text>
								<Text style={[{ color: "#8a919f" }, styles.ft16]}>
									<Text>
										{moment(+detail.releaseTime).format("YYYY-MM-DD HH:mm:ss")}
									</Text>
									&nbsp;&nbsp;
									<Text>字数:{detail.wordCount}</Text>
								</Text>
							</View>
						</View>
						<Pressable
							style={({ pressed }) => [
								{ backgroundColor: pressed ? "#409EFF" : "#66b1ff" },
								styles.btn
							]}
						>
							<Text style={styles.btnText}>关注</Text>
						</Pressable>
					</View>
					{detail.detailContent && (
						<HTML
							source={{ html: detail.detailContent }}
							contentWidth={contentWidth}
							baseStyle={styles.ft16}
							tagsStyles={{
								img: styles.imgTag,
								code: styles.codeTag,
								strong: styles.strongTag
							}}
						/>
					)}

					{/* <Text>Detail Screen</Text>
						<Button
							title="Go to Details... again"
							onPress={() => navigation.push("Detail")}
						/>
						<Button title="Go back" onPress={() => navigation.goBack()} />
						<Button
							title="Go back to first screen in stack"
							onPress={() => navigation.popToTop()}
						/> */}
				</View>
			)}
		</ScrollView>
	)
}
const styles = StyleSheet.create({
	indicator: {
		justifyContent: "center",
		height: contentHeight
	},
	container: {
		paddingHorizontal: 8
	},
	title: {
		marginVertical: 10
	},
	user: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 10,
		marginBottom: 20,
		padding: 5,
		backgroundColor: "#fff",
		borderRadius: 4
	},
	ft16: {
		fontSize: 16
	},
	ft24: {
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center"
	},
	btn: {
		paddingHorizontal: 15,
		paddingVertical: 8,
		borderRadius: 10,
		display: "flex",
		justifyContent: "center"
	},
	btnText: {
		color: "#fff",
		textAlign: "center"
	},
	imgTag: {
		width: contentWidth - 30,
		borderRadius: 10
	},
	strongTag: {
		fontSize: 18
	},
	codeTag: {
		paddingHorizontal: 8,
		color: "#999",
		// backgroundColor: "#f8f8f8",
		backgroundColor: "rgb(30, 30, 30)",
		paddingTop: 10,
		borderRadius: 10
	}
})
