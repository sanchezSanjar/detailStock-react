import { createTheme } from '@mui/material/styles';
import { common } from '@mui/material/colors';
import shadow from './shadow';
import typography from './typography';

const fontFamily = "'Inter', 'Helvetica Neue', Arial, sans-serif";

/**
 * DARK GRAPHITE THEME (matches the tokens in app.css)
 */
const dark = {
	palette: {
		mode: 'dark',
		background: {
			default: '#121418',
			paper: '#1b1f25',
		},
		primary: {
			main: '#e50914',
			dark: '#c40812',
			contrastText: common.white,
		},
		secondary: {
			main: '#2e353e',
			contrastText: common.white,
		},
		text: {
			primary: '#f1f3f5',
			secondary: '#8f98a3',
		},
		divider: '#2e353e',
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
					backgroundColor: '#121418',
					color: '#f1f3f5',
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
let theme = createTheme(dark);
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
