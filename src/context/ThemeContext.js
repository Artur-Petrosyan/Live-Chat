import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
		const [darkMode, setDarkMode] = useState(() => {
				return localStorage.getItem("theme") === "dark";
		});

		const toggleTheme = () => setDarkMode((prev) => !prev);

		useEffect(() => {
				localStorage.setItem("theme", darkMode ? "dark" : "light");
		}, [darkMode]);

		return (
					<ThemeContext.Provider value={{ darkMode, toggleTheme }}>
							{children}
					</ThemeContext.Provider>
		);
};

export const useTheme = () => useContext(ThemeContext);