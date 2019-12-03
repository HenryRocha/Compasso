import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './NewDashProject.css';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const useStyles = makeStyles({
  card: {
    height: 345,
    width: 345
  },
  media: {
    height: 140,
  },
});

export default function NewDashProject() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
    <div className="project_card">
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className="project_title">
          Adicionar Projeto
          </Typography>
        </CardContent>
    </div>
      <CardActions className="addProject">
        <Button size="large">
        <AddCircleOutlineIcon />
        </Button>
      </CardActions>

    </Card>
  );
}
