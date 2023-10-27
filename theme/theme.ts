import { createTheme } from "@mui/material";
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: ['200', '300', '400'], subsets: ['latin'], display: 'swap' });

export const appTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#21003d'
        }
    },
    typography: {
        fontFamily: poppins.style.fontFamily,
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 30,
                    background: '#f9f9f9'
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'white'
                }
            }
        }
    }
});
