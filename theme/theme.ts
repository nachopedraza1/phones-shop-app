import { createTheme } from "@mui/material";
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: ['200', '300', '400'], subsets: ['latin'], display: 'swap' });

export const appTheme = createTheme({
    palette: {
        mode: 'light'
    },
    typography: {
        fontFamily: poppins.style.fontFamily,
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 30,
                    background:'#f9f9f9'
                }
            }
        }
    }
});
