import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
        primary:{
            main:'#016660'
        }
    },
    typography: {
        fontFamily:"Poppins",
        fontWeightLight:400,
        fontWeightRegular:500,
        fontWeightMedium:600,
        fontWeightBold:700
    }
})

export default theme;
