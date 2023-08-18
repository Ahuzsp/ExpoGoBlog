import {
	View,
	Text,
	Button,
	Dimensions,
	StyleSheet,
	TextInput,
	ScrollView,
	TouchableOpacity,
	TouchableWithoutFeedback
} from "react-native"
import { useState } from "react"
// import { PickerView } from "@ant-design/react-native"
// 分类列表
import categoryList from "../../combination/useCategory"
import CustomPicker from "../../components/picker/CustomPicker"
const { width: screenWidth, height: screenHeight } = Dimensions.get("window")
export default function DetailsScreen({ navigation }) {
	const [selectedCategory, setSelectedCategory] = useState("")
	return (
		<View style={{ flex: 1, alignItems: "center" }}>
			<View>
				<Text style={{ marginVertical: 10 }}>标题</Text>
				<TextInput style={styles.baseInput} placeholder="请输入标题" />
			</View>
			<View>
				<Text style={{ marginVertical: 10 }}>描述</Text>
				<TextInput style={styles.baseInput} placeholder="请输入描述（选填）" />
			</View>
			<View>
				<Text style={{ marginVertical: 10 }}>分类</Text>
				<CustomPicker
					options={categoryList}
					selectedValue={selectedCategory}
					onValueChange={(value) => {
						setSelectedCategory(value)
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
					/>
				</ScrollView>
			</View>
			<View style={{ flexDirection: "row", marginTop: 10 }}>
				<View style={{ marginRight: 30 }}>
					<Button title="取消">取消</Button>
				</View>
				<Button title="发布">发布</Button>
			</View>
		</View>
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
