import React, { useEffect, useLayoutEffect, useState } from "react"
import {
	View,
	Text,
	Image,
	Dimensions,
	ScrollView,
	ActivityIndicator
} from "react-native"
import { TabView, TabBar, SceneMap } from "react-native-tab-view"
import { useSelector } from "react-redux"
import { getUserReleateList } from "../../api/user"
import Item from "../list/item"
const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height
const ArticleList = ({ data, navigation }) => {
	return data?.length ? (
		<ScrollView>
			<View
				style={{
					flex: 1,
					alignItems: "center",
					justifyContent: "center",
					paddingBottom: 40
				}}
			>
				{data.map((item) => {
					return (
						<Item key={item.articleId} item={item} navigation={navigation} />
					)
				})}
			</View>
		</ScrollView>
	) : (
		<View
			style={{
				justifyContent: "center",
				height: screenHeight
			}}
		>
			<ActivityIndicator size="large" color="green" />
		</View>
	)
}

const FollowList = ({ data }) => {
	return data?.length ? (
		<ScrollView>
			<View style={{ height: screenHeight }}>
				{data.map((item) => (
					<View
						key={item.userId}
						style={{
							flexDirection: "row",
							alignItems: "center",
							paddingHorizontal: 15,
							paddingVertical: 5,
							maxHeight: 60,
							marginTop: 10,
							backgroundColor: "#999"
						}}
					>
						<Image
							source={{ uri: item.avatar }}
							style={{ width: 50, height: 50, borderRadius: 25 }}
						></Image>
						<View
							style={{
								flexDirection: "column",
								height: "100%",
								justifyContent: "space-between",
								marginLeft: 15
							}}
						>
							<Text
								style={{
									fontSize: 20,
									fontWeight: 600,
									maxWidth: screenWidth / 2 - 20
								}}
								numberOfLines={1}
								ellipsizeMode="tail"
							>
								{item.username}
							</Text>
							<Text style={{ fontSize: 16 }}>等级：初级</Text>
						</View>
					</View>
				))}
			</View>
		</ScrollView>
	) : (
		<Text>暂无数据</Text>
	)
}

const defauliLayout = { width: screenWidth, height: screenHeight }
const MyPage = ({ navigation, route }) => {
	const item = useSelector((state) => state.user)
	const tabList = useSelector((state) => state.tabList)
	const [index, setIndex] = useState(route.params?.id || 0)
	const [leaderBoardData, setLeaderBoardData] = useState({})
	useLayoutEffect(() => {
		getUserReleateList({ userId: item.userId })
			.then((res) => {
				setLeaderBoardData(res.data)
			})
			.catch((err) => {
				console.log(err, "err")
			})
	}, [item.userId])

	const routes = []
	tabList.forEach((el) => {
		routes.push({
			key: el.id,
			title: el.label
		})
	})
	return (
		<TabView
			navigationState={{ index, routes }}
			renderScene={SceneMap({
				1: () => (
					<ArticleList
						data={leaderBoardData.articleList}
						navigation={navigation}
					/>
				),
				2: () => <FollowList data={leaderBoardData.followList} />,
				3: () => (
					<ArticleList
						data={leaderBoardData.collectList}
						navigation={navigation}
					/>
				),
				4: () => (
					<ArticleList
						data={leaderBoardData.likeList}
						navigation={navigation}
					/>
				)
			})}
			renderTabBar={(props) => (
				<TabBar
					{...props}
					activeColor="#07c160"
					labelStyle={{ color: "#000" }}
					style={{ backgroundColor: "#fff" }}
					indicatorStyle={{ backgroundColor: "#07c160" }}
				/>
			)}
			onIndexChange={setIndex}
			initialLayout={defauliLayout}
		/>
	)
}

export default MyPage
