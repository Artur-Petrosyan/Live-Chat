import React from "react";
import ChatWindow from "./components/ChatWindow";
import { Button, ConfigProvider } from "antd";
import { useAntdTheme } from "./hooks/useAntTheme";

const App = () => {
		const {theme, toggleTheme} = useAntdTheme();

		return (
					<ConfigProvider
								theme={ theme }
					>
							<div style={ {padding: "1rem"} }>
									<Button onClick={ toggleTheme }>
											Change theme
									</Button>
									<ChatWindow/>
							</div>
					</ConfigProvider>
		);
};

export default App;