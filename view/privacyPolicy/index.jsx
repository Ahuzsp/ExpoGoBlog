import React from "react"
import { Dimensions, ScrollView } from "react-native"
import HTML from "react-native-render-html"
import { privacyPolicy } from "../../consts/index"
const contentWidth = Dimensions.get("window").width
export default function PrivacyPolicy() {
	return (
		privacyPolicy && (
			<ScrollView>
				<HTML source={{ html: privacyPolicy }} contentWidth={contentWidth} />
			</ScrollView>
		)
	)
}
