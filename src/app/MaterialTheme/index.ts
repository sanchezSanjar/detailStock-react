import { createTheme } from '@mui/material/styles';
import { common } from '@mui/material/colors';
import shadow from './shadow';
import typography from './typography';

const fontFamily = "'Inter', 'Helvetica Neue', Arial, sans-serif";

/**
 * LIGHT THEME (DEFAULT)
 */
const light = {
	palette: {
		mode: 'light',
		background: {
			default: '#f4f5f7',
			paper: common.white,
		},
		primary: {
			main: '#e50914',
			dark: '#c40812',
			contrastText: common.white,
		},
		secondary: {
			main: '#1e242b',
			contrastText: common.white,
		},
		text: {
			primary: '#1e242b',
			secondary: '#6b7280',
		},
	},
	shape: {
		borderRadius: 10,
	},
	components: {
		MuiContainer: {
			styleOverrides: {
				root: {
					height: '100%',
				},
			},
		},
		MuiCssBaseline: {
			styleOverrides: {
				html: { height: '100%' },
				body: {
					backgroundColor: '#f4f5f7',
					color: '#1e242b',
					fontFamily,
					minHeight: '100vh',
				},
			},
		},
		MuiButton: {
			defaultProps: {
				disableElevation: true,
			},
			styleOverrides: {
				root: {
					borderRadius: 10,
					textTransform: 'none',
					fontWeight: 700,
					letterSpacing: 0.2,
				},
			},
		},
	},
	shadow,
	typography: { ...typography, fontFamily },
} as const;

// A custom theme for this app
let theme = createTheme(light);
theme = createTheme(theme, {
	components: {
		MuiContainer: {
			styleOverrides: {
				maxWidthLg: {
					[theme.breakpoints.up('lg')]: {
						maxWidth: '1300px',
					},
				},
			},
		},
	},
});

export default theme;
