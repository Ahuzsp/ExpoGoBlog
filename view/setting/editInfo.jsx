import React, { useState } from "react"
import {
	Text,
	View,
	Alert,
	Image,
	Pressable,
	StyleSheet,
	Dimensions
} from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import * as ImagePicker from "expo-image-picker"
import { useSelector, useDispatch } from "react-redux"
// api
import { updateUserInfo } from "../../api/user"
// 组件
import EditModal from "../../components/modal"
let editFieldInfo = {
	curField: "",
	value: ""
}
const screenWidth = Dimensions.get("window").width
export default function EditInfo({ navigation }) {
	const dispatch = useDispatch()
	const [modalVisible, setModalVisible] = useState(false)
	const [editValue, setEditValue] = useState("")
	const authUser = useSelector((state) => state.user)
	const settingList = [
		{ label: "用户名", value: authUser.username, key: 1, field: "username" },
		{
			label: "简介",
			value: authUser.description || "",
			key: 2,
			field: "description"
		},
		{ label: "年龄", value: authUser.age || 18, key: 3, field: "age" },
		{
			label: "博客地址",
			value: authUser.blogUrl || "",
			key: 4,
			field: "blogUrl"
		}
	]
	const [avatar, setAvatar] = useState("")
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
				aspect: [4, 4],
				quality: 1
			})

			if (!result.canceled) {
				setAvatar(result.assets[0].uri)
			}
		}
		// No permissions request is necessary for launching the image library

		console.log(avatar, "avatar")
	}
	const handleEditInfo = (field, value) => {
		editFieldInfo.curField = field
		setEditValue(value)
		setModalVisible(true)
	}
	handleSubmit = (value) => {
		if (!value) return
		editFieldInfo.value = editFieldInfo.curField === "age" ? +value : value
		updateUserInfo({
			userId: authUser.userId,
			updateInfo: { [editFieldInfo.curField]: value }
		})
			.then((res) => {
				if (res.code === 0) {
					setModalVisible(false)
					dispatch({
						type: "LOGIN_SUCCESS",
						payload: {
							...authUser,
							[editFieldInfo.curField]: editFieldInfo.value
						}
					})
				}
			})
			.catch((err) => {
				console.log(err, "err")
			})
	}
	return (
		<View>
			<Pressable
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					backgroundColor: "#fff",
					alignItems: "center",
					paddingHorizontal: 24,
					paddingVertical: 15,
					backgroundColor: "#fff"
				}}
				onPress={pickImage}
			>
				<Text style={{ fontSize: 18 }}>头像</Text>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<Image
						source={{ uri: authUser?.avatar }}
						style={{
							width: 60,
							height: 60,
							borderRadius: 30,
							marginRight: 10
						}}
					/>
					<Ionicons
						name="chevron-forward-outline"
						size={20}
						color="gray"
					></Ionicons>
				</View>
			</Pressable>
			{settingList.map((li, i) => {
				return (
					<Pressable
						key={li.key}
						style={[styles.li, { marginTop: i === 0 ? 20 : 0 }]}
						onPress={() => handleEditInfo(li.field, li.value)}
					>
						<Text>{li.label}</Text>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center"
							}}
						>
							<Text
								style={{
									fontSize: 16,
									color: "gray",
									marginRight: 16,
									maxWidth: screenWidth - 120
								}}
								numberOfLines={1}
								ellipsizeMode="tail"
							>
								{li.value}
							</Text>
							<Ionicons name="chevron-forward-outline" size={20} color="gray" />
						</View>
					</Pressable>
				)
			})}
			{modalVisible && (
				<EditModal
					editValue={editValue}
					onInfoUpdate={(value) => handleSubmit(value)}
					onModalClose={() => setModalVisible(false)}
				/>
			)}
		</View>
	)
}
const styles = StyleSheet.create({
	li: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		height: 44,
		borderBottomWidth: 1,
		borderBottomColor: "#f2f3f4",
		backgroundColor: "#fff",
		paddingHorizontal: 24
	}
})
