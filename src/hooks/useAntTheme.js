import { theme } from 'antd';
import { useTheme } from '../context/ThemeContext';

export const useAntdTheme = () => {
		const { darkMode,toggleTheme } = useTheme();

		return {
				theme: {
						algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm
				},
				toggleTheme
		};
};