import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
	palette: {
		primary: { main: '#ffc617' },
		secondary: { main: '#1C1A19' }
	},
	components: {
		// Name of the component
		MuiButton: {
			styleOverrides: {
				// Name of the slot
				root: {
					textTransform: 'none'
				},
				containedPrimary: {
					fontSize: "1.3rem",
					boxShadow: "none",
					borderRadius: "70px",
					backgroundColor: "#FDBF5A",
					color: '#000',
					"&:focus": {
						backgroundColor: "#FFA842",
						boxShadow: "none",
					},
					"&:hover": {
						backgroundColor: "#FFA842",
						boxShadow: "none !Important",
					},
					"&:disabled": {
						backgroundColor: "##D8D7D5",
					},
				},
				textPrimary: {
					color: '#fff'
				},
			},
		},
		MuiFormLabel: {
			styleOverrides: {
				root: {
					"&$focused": {
						color: "#1473e6"
					}
				}
			}
		},
		MuiLink: {
			styleOverrides: {
				root: {
					color: "#1473e6",
					cursor: "pointer"
				}
			}
		},
		MuiInput: {
			styleOverrides: {
				root: {

				},
				underline: {
					"&:after": {
						"borderBottomColor": "#1473e6"
					}
				}
			}
		},
		MuiFormHelperText: {
			styleOverrides: {
				root: {
					color: 'red',
					margin: '0'
				},
			}
		},
		MuiLink: {
			styleOverrides: {
				root: {
					position: "absolute",
					bottom: "-1.2em"
				}
			}
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					borderRadius: '10px',
				}
			}
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					borderRadius: '0',
				}
			}
		},
	},
})
