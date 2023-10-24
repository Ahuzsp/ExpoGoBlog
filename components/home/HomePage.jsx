import { Text, View, ScrollView } from "react-native"
import { useEffect } from "react"
import Carousel from "../carousel"
import Category from "../category"
import { useSelector, useDispatch } from "react-redux"
import { login } from "../../store/myActions"
import AsyncStorage from "@react-native-async-storage/async-storage"
export default function HomePage({ navigation }) {
	const dispatch = useDispatch()
	const authUser = useSelector((state) => state.user)
	useEffect(() => {
		const setLogin = async () => {
			if (authUser?.userId) return
			const storedUser = await AsyncStorage.getItem("user")
			if (!storedUser) return
			dispatch(login(JSON.parse(storedUser)))
		}
		setLogin()
	}, [])
	return (
		<ScrollView style={{ backgroundColor: "#f0f0f0" }}>
			<Carousel navigation={navigation} />
			<Category navigation={navigation} />
		</ScrollView>
	)
}
