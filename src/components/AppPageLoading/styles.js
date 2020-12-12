import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    title: {
        color:theme.palette.primary.main,
        textAlign: 'center'
    },
    loadingBox: {
        display:'flex',
        alignItems:'center',
        justifyContent:'center', 
        height:'50vh'
    },
    loadingBoxIcon: {
        alignItems:'center',
        justifyContent:'center', 
        height:theme.spacing(3),
        width:theme.spacing(3)
    }

}))

export default useStyles;