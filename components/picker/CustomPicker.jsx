import React, { useState } from "react"
import {
	View,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Text,
	Modal,
	StyleSheet,
	TextInput,
	Dimensions
} from "react-native"
const { width: screenWidth, height: screenHeight } = Dimensions.get("window")
const CustomPicker = ({ options, onValueChange }) => {
	const [selectedValue, setSelectedValue] = useState("")
	const [pickerVisible, setPickerVisible] = useState(false)

	const handleSelect = (label, value) => {
		setSelectedValue(label)
		setPickerVisible(false)
		console.log(value)
		onValueChange(value)
	}

	const togglePicker = () => {
		setPickerVisible(!pickerVisible)
	}

	return (
		<View>
			<TouchableOpacity
				style={{
					height: 40,
					borderRadius: 5,
					borderWidth: 1,
					borderColor: "rgb(200, 200, 200)"
				}}
				onPress={togglePicker}
			>
				<View style={styles.baseInput}>
					<Text style={{ lineHeight: 30 }}>{selectedValue || "请选择"}</Text>
				</View>
			</TouchableOpacity>
			<Modal visible={pickerVisible} transparent animationType="slide">
				<TouchableOpacity style={styles.modalContainer} onPress={togglePicker}>
					<View
						style={{
							width: "100%",
							justifyContent: "flex-end"
						}}
					>
						<View style={styles.pickerContainer}>
							{options.map((item, index) => (
								<TouchableOpacity
									key={index}
									onPress={() => handleSelect(item.label, item.value)}
									style={styles.optionContainer}
								>
									<Text>{item.label}</Text>
								</TouchableOpacity>
							))}
						</View>
					</View>
				</TouchableOpacity>
			</Modal>
		</View>
	)
}

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: "flex-end",
		backgroundColor: "rgba(0, 0, 0, 0.5)"
	},
	pickerContainer: {
		width: "100%",
		backgroundColor: "white",
		padding: 10,
		borderRadius: 5
	},
	optionContainer: {
		padding: 10
	},
	baseInput: {
		width: screenWidth - 32,
		minHeight: 40,
		padding: 4,
		color: "black"
	}
})

export default CustomPicker
