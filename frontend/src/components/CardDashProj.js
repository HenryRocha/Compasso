import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './CardDashProj.css';

class CardDashProj extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.projects = {
  //     hits: []
  //   };
  // }
  // const classes = useStyles();
  render(){
    const {nomeProjeto,ano,data,empresa} = this.props;
    const classes = makeStyles({
      card: {
        height: 345,
        width: 345
      },
      media: {
        height: 140,
      },
    });
    return(
      <Card className = { classes.card } >
        <div className="project_card">
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" className="project_title">
              {nomeProjeto}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2" className="project_title">
              {ano}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2" className="project_title">
              {data}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2" className="project_title">
              {empresa}
            </Typography>
          </CardContent>
        </div>
        <CardActions className="seeMore">
          <Button size="small" color="primary">
            Ver detalhes
          </Button>
        </CardActions>
      </Card>
    );
  }
}
export default (CardDashProj);
