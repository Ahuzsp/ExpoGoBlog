import { useEffect, useLayoutEffect, useState } from "react"
import {
	View,
	Text,
	Button,
	Image,
	StyleSheet,
	ScrollView,
	Dimensions,
	Pressable,
	TouchableOpacity,
	ActivityIndicator
} from "react-native"
import moment from "moment"
import {
	getDetailById,
	collect,
	follow,
	queryArticleReleate
} from "../../api/article"
import { getUserInfoByUserId } from "../../api/user"
import HTML from "react-native-render-html"
import { useSelector } from "react-redux"
import Toast from "react-native-root-toast"
import IonIcons from "react-native-vector-icons/Ionicons"
const contentWidth = Dimensions.get("window").width
const contentHeight = Dimensions.get("window").height
// toast
const CustomToast = (content, duration = 1000) => {
	let toast = Toast.show(content, {
		position: Toast.positions.CENTER
	})

	setTimeout(function hideToast() {
		Toast.hide(toast)
	}, duration)
}
export default function DetailScreen({ route, navigation }) {
	const authUser = useSelector((state) => state.user)
	const [loading, setLoading] = useState(false)
	const [detail, setDetail] = useState({})
	const [userInfo, setUserInfo] = useState({})
	const [userBehavior, setUserBehavior] = useState({})
	const { id } = route.params
	useEffect(() => {
		const onFocus = async () => {
			setLoading(true)
			getDetailById({ articleId: id })
				.then(async (res) => {
					if (res.code === 0) {
						setDetail(res?.data || {})
						const user = await getUserInfoByUserId({
							userId: res.data?.userId || 0
						})
						setUserInfo(user.data)
						setLoading(false)
						if (!authUser.userId) return
						// 注意useState的异步赋值
						const query = {
							userId: authUser.userId,
							authorId: user.data.userId,
							articleId: res.data.articleId
						}
						getBehavior(query)
					}
				})
				.catch((err) => {
					console.log(err, "获取文章详情出错")
				})
		}
		onFocus()
	}, [id])
	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					onPress={() => handleColllect(userBehavior?.isCollect)}
				>
					<IonIcons
						name={
							userBehavior?.isCollect
								? "heart-dislike-outline"
								: "heart-outline"
						}
						size={24}
						color={"black"}
					/>
				</TouchableOpacity>
			)
		})
	}, [userBehavior.isCollect])
	// 获取用户点赞收藏关注状态
	const getBehavior = async (query) => {
		const res = await queryArticleReleate(query).catch((err) => {
			console.log(err, "获取用户相关出错")
		})
		setUserBehavior(res?.data || {})
	}
	const handleColllect = (isCollect) => {
		if (!authUser.userId) {
			navigation.navigate("Login")
			return
		}
		collect({ userId: authUser.userId, articleId: id })
			.then((res) => {
				if (res.code === 0) {
					getBehavior({
						userId: authUser.userId,
						authorId: detail.userId,
						articleId: detail.articleId
					})
					CustomToast(res.msg)
				}
			})
			.catch((err) => {
				console.log("====================================")
				console.log(err, "err")
				console.log("====================================")
				CustomToast("收藏失败")
			})
	}
	// 关注
	const enterColl = (isFollow) => {
		if (!authUser.userId) {
			navigation.navigate("Login")
			return
		}
		follow({ followerId: authUser.userId, followId: detail.userId })
			.then((res) => {
				if (res.code === 0) {
					getBehavior({
						userId: authUser.userId,
						authorId: detail.userId,
						articleId: detail.articleId
					})
					CustomToast(res.msg)
				} else {
					CustomToast("关注失败,该用户不存在")
				}
			})
			.catch(() => {
				CustomToast("关注失败")
			})
	}
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
								source={{ uri: userInfo?.avatar }}
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
							onPress={() => enterColl(userBehavior.isFollow)}
						>
							<Text style={styles.btnText}>
								{userBehavior?.isFollow ? "取消关注" : "关注"}
							</Text>
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
