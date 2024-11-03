import {
	View,
	Text,
	Image,
	Alert,
	Dimensions,
	StyleSheet,
	TextInput,
	ScrollView,
	Platform,
	TouchableOpacity,
	Pressable
} from "react-native"
import { useState, useRef, useLayoutEffect, useEffect } from "react"
// import { PickerView } from "@ant-design/react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
// 分类列表
import categoryList from "../../combination/useCategory"
import CustomPicker from "../../components/picker/CustomPicker"
// Toast
import Toast from "react-native-root-toast"
import * as ImagePicker from "expo-image-picker"

import { addArticle } from "../../api/article"
import { useSelector, useDispatch } from "react-redux"
const { width: screenWidth, height: screenHeight } = Dimensions.get("window")

const CustomToast = (content, duration = 1000) => {
	let toast = Toast.show(content, {
		position: Toast.positions.CENTER
	})

	setTimeout(function hideToast() {
		Toast.hide(toast)
	}, duration)
}
export default function WriteScreen({ navigation }) {
	const authUser = useSelector((state) => state.user)
	const [imageList, setImageList] = useState([])
	// 定义数据
	const formRef = useRef({
		articleTitle: "",
		abstract: "",
		detailContent: ""
	})
	const selectedCategoryRef = useRef(null)
	const handleNextStep = () => {
		const formValue = formRef.current
		const selectedCategoryValue = selectedCategoryRef.current
		const { articleTitle, abstract, detailContent } = formValue
		if (!formValue.articleTitle) {
			CustomToast("请填写标题")
			return
		} else if (!selectedCategoryValue) {
			CustomToast("请选择分类")
			return
		} else if (!formValue.detailContent) {
			CustomToast("请填写内容")
			return
		}
		if (!authUser.userId) {
			navigation.navigate("Login")
			return
		}
		const params = {
			articleTitle,
			abstract,
			detailContent,
			author: authUser.username,
			wordCount: detailContent.length,
			userId: authUser.userId,
			clientType: Platform.OS === "android" ? 2 : 3,
			category: selectedCategoryValue
		}
		addArticle(params)
			.then((res) => {
				console.log(res, 147)
				if (res && res.code === 0) {
					CustomToast("新增文章成功！")
					navigation.navigate("List", { category: selectedCategoryValue })
				} else {
					CustomToast(res.msg)
				}
			})
			.catch((error) => {
				CustomToast(error)
			})
	}
	const openSettings = () => {
		if (Platform.OS === "ios") {
			Linking.openURL("app-settings:")
		} else {
			IntentLauncher.startActivityAsync(
				IntentLauncher.ACTION_APPLICATION_SETTINGS
			)
		}
	}
	// 选择图片
	const pickImage = async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
		if (status !== "granted") {
			Alert.alert(
				"相册权限",
				"需要相册权限来选择照片",
				[
					{ text: "取消", style: "cancel" },
					{
						text: "去设置",
						onPress: () => openSettings
					}
				],
				{ cancelable: false }
			)
		} else {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				allowsEditing: true,
				// aspect: [4, 3],
				quality: 1
			})

			if (!result.canceled) {
				setImageList([...imageList, result.assets[0].uri])
			}
		}
		// No permissions request is necessary for launching the image library

		console.log(imageList)
	}
	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity onPress={handleNextStep}>
					<Text>保存</Text>
				</TouchableOpacity>
			)
		})
	}, [authUser])

	return (
		<ScrollView>
			<View style={{ flex: 1, alignItems: "center", paddingBottom: 20 }}>
				<View>
					<Text style={{ marginVertical: 10 }}>标题</Text>
					<TextInput
						style={styles.baseInput}
						placeholder="请输入标题"
						onChangeText={(text) => {
							formRef.current.articleTitle = text
						}}
					/>
				</View>
				<View>
					<Text style={{ marginVertical: 10 }}>描述</Text>
					<TextInput
						style={styles.baseInput}
						placeholder="请输入描述（选填）"
						onChangeText={(text) => {
							formRef.current.abstract = text
						}}
					/>
				</View>
				<View>
					<Text style={{ marginVertical: 10 }}>分类</Text>
					<CustomPicker
						options={categoryList}
						modelValue={selectedCategoryRef.current}
						onValueChange={(value) => {
							selectedCategoryRef.current = value
						}}
					/>
				</View>
				<View style={{ height: screenHeight - 500 }}>
					<Text style={{ marginTop: 10 }}>内容</Text>
					<View
						style={{ height: 1, backgroundColor: "#999", marginVertical: 10 }}
					></View>
					<ScrollView>
						<TextInput
							style={[
								styles.baseInput,
								{ height: "100%", textAlignVertical: "top", borderWidth: 0 }
							]}
							multiline
							placeholder="请输入内容"
							editable
							maxLength={2000}
							onChangeText={(text) => {
								formRef.current.detailContent = text
							}}
						/>
					</ScrollView>
				</View>
				<View
					style={{
						flexDirection: "row",
						flexWrap: "wrap",
						width: screenWidth,
						paddingLeft: 20
					}}
				>
					{imageList.map((uri, i) => {
						return (
							<Image
								key={i}
								source={{ uri }}
								style={{
									width: screenWidth / 3 - 20,
									height: screenWidth / 3 - 20,
									marginTop: 10,
									marginRight: 10
								}}
							/>
						)
					})}

					<Pressable
						style={{
							width: screenWidth / 3 - 20,
							height: screenWidth / 3 - 20,
							borderWidth: 1,
							borderColor: "#999",
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
							marginTop: 10
						}}
						onPress={pickImage}
					>
						<Ionicons name="add" size={32} color="#999" />
					</Pressable>
				</View>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	baseInput: {
		width: screenWidth - 32,
		minHeight: 40,
		borderWidth: 1,
		borderColor: "#666",
		padding: 4,
		borderRadius: 5
	}
})
