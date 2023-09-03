import React, { useEffect, useState } from "react"
import {
	View,
	Pressable,
	Text,
	TextInput,
	Modal,
	StyleSheet,
	Dimensions
} from "react-native"
const { width: screenWidth, height: screenHeight } = Dimensions.get("window")
const EditModal = ({ editValue, onModalClose, onInfoUpdate }) => {
	const [modelValue, setModelValue] = useState("")
	useEffect(() => {
		setModelValue(editValue + "")
		console.log(editValue, "editValue")
	}, [editValue])
	const handleEditSubmit = () => {
		onInfoUpdate(modelValue)
	}
	return (
		<Modal visible={true} transparent animationType="slide">
			<Pressable
				style={styles.modalContainer}
				onPress={() => onModalClose(false)}
			>
				<View
					style={{
						width: "100%",
						height: 200,
						backgroundColor: "#fff",
						justifyContent: "flex-start",
						alignItems: "flex-end",
						padding: 10
					}}
				>
					<TextInput
						value={modelValue}
						style={styles.baseInput}
						multiline
						placeholder="请输入内容"
						onChangeText={(text) => {
							setModelValue(text)
						}}
					></TextInput>
					<Pressable
						onPress={handleEditSubmit}
						style={[
							{ backgroundColor: modelValue ? "#409EFF" : "#66b1ff" },
							styles.btn
						]}
					>
						<Text style={{ color: "#fff" }}>确定</Text>
					</Pressable>
				</View>
			</Pressable>
		</Modal>
	)
}

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: "flex-end",
		backgroundColor: "rgba(0, 0, 0, 0.5)"
	},
	baseInput: {
		minHeight: 100,
		width: "100%",
		paddingHorizontal: 10,
		paddingVertical: 5,
		backgroundColor: "#f2f3f4",
		textAlignVertical: "top"
	},
	btn: {
		width: 60,
		marginTop: 20,
		paddingHorizontal: 15,
		paddingVertical: 8,
		borderRadius: 10,
		display: "flex",
		justifyContent: "center"
	}
})

export default EditModal
