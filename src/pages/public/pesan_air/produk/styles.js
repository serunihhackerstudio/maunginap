import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  spaceBtn : {
    marginTop:theme.spacing(2)
  }
  }));

  export default useStyles;