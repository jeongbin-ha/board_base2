import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import theme from './style/Theme.jsx';
import GlobalStyle from './style/GlobalStyle.jsx';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ThemeProvider>
	</StrictMode>,
);
