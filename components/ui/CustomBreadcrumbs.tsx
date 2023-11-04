import { Breadcrumbs, Link as MuiLink, Typography } from "@mui/material"
import Link from "next/link"


const CustomBreadcrumbs: React.FC<{ productName: string }> = ({ productName }) => {
    return (
        <Breadcrumbs separator="›">
            <MuiLink component={Link} underline="hover" color="inherit" href="/">
                Inicio
            </MuiLink>
            <MuiLink
                component={Link}
                underline="hover"
                color="inherit"
                href="/material-ui/getting-started/installation/"
            >
                Productos
            </MuiLink>
            <Typography color="text.primary"> {productName} </Typography>
        </Breadcrumbs>
    )
}

export default CustomBreadcrumbs;