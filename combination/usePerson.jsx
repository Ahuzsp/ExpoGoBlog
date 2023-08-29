// AuthContext.js
import React, { createContext, useState } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [authUser, setCommonUser] = useState({})

	return (
		<AuthContext.Provider
			value={{ isLoggedIn, setIsLoggedIn, authUser, setCommonUser }}
		>
			{children}
		</AuthContext.Provider>
	)
}
