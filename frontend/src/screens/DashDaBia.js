import React from 'react';

import AddIcon from '@material-ui/icons/Add';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import '../components/CardDashProj.css';
import 'pure-react-carousel/dist/react-carousel.es.css';
import Header from '../components/Header';
class DashDaBia extends React.Component {
    constructor(props) {
        super(props);
        this.projects = {
            hits: []
        };
    }
    handleClick() {
        this.props.history.push("create_project");
    }
    render() {


        const titleStyle = {
            color: "black",
            backgroundColor: null,
            padding: "20px",
            fontFamily: "Arial",
            textAlign: "center",
            fontSize: "20px"
        };
        const buttonStyle = {
            margin: 5
        };
        const theme = createMuiTheme({
            palette: {
                secondary: {
                    main: '#F25C5C'
                }
            },
        });
        const classes = makeStyles({
            card: {
                height: 345,
                width: 345,
            },
            media: {
                height: 140,
            },
            slide: {
                margin: 10,
            }

        });
        const slideStyle = {
            margin: 5
        };

        return (
            //   Header< nao esquecer
            <div>
            <Header />
            <Grid direction="column">
            <Grid item xs container direction="row" spacing={2} style={titleStyle} >
            <Typography gutterBottom variant="subtitle1">
            PROJETO EM ANDAMENTO
            </Typography>
            <ThemeProvider theme={theme}>
            <Fab style={buttonStyle} color="secondary" size="small" aria-label="add" onClick={()=> this.handleClick()}>
            <AddIcon/>
            </Fab>
            </ThemeProvider>
            </Grid>
            <CarouselProvider
            naturalSlideWidth={30}
            naturalSlideHeight={15}
            totalSlides={3}
            touchEnabled="true"
            visibleSlides={2}>
            <Slider>
            <div>
            <Slide index={0}>
            <Card className={classes.card}>
            <div className="project_card">
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2" className="project_title">
            Nome do Projeto
            </Typography>
            <Typography gutterBottom variant="h5" component="h2" className="project_title">
            2021
            </Typography>
            <Typography gutterBottom variant="h5" component="h2" className="project_title">
            Data
            </Typography>
            <Typography gutterBottom variant="h5" component="h2" className="project_title">
            Sicredi
            </Typography>
            </CardContent>
            </div>
            <CardActions className="seeMore">
            <Button size="small" color="primary">
            Ver detalhes
            </Button>
            </CardActions>
            </Card>
            </Slide>
            </div>
            <Slide index={1}>
            <Card className={classes.card}>
            <div className="project_card">
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2" className="project_title">
            Nome do Projeto
            </Typography>
            <Typography gutterBottom variant="h5" component="h2" className="project_title">
            2022
            </Typography>
            <Typography gutterBottom variant="h5" component="h2" className="project_title">
            Data
            </Typography>
            <Typography gutterBottom variant="h5" component="h2" className="project_title">
            Sicredi
            </Typography>
            </CardContent>
            </div>
            <CardActions className="seeMore">
            <Button size="small" color="primary">
            Ver detalhes
            </Button>
            </CardActions>
            </Card>
            </Slide>
            <Slide index={2}>
            <Card className={classes.card}>
            <div className="project_card">
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2" className="project_title">
            Nome do Projeto
            </Typography>
            <Typography gutterBottom variant="h5" component="h2" className="project_title">
            2023
            </Typography>
            <Typography gutterBottom variant="h5" component="h2" className="project_title">
            Data
            </Typography>
            <Typography gutterBottom variant="h5" component="h2" className="project_title">
            Sicredi
            </Typography>
            </CardContent>
            </div>
            <CardActions className="seeMore">
            <Button size="small" color="primary">
            Ver detalhes
            </Button>
            </CardActions>
            </Card>
            </Slide>
            </Slider>
                        {/* <ButtonBack>Back</ButtonBack>
                        <ButtonNext>Next</ButtonNext> */}
                        </CarouselProvider>
                        </Grid>
                        <Grid direction="column">
                        <Grid item xs container direction="row" spacing={2} style={titleStyle}>
                        <Typography gutterBottom variant="subtitle1">
                        FORM PADRÃO
                        </Typography>
                        <ThemeProvider theme={theme}>
                        <Fab style={buttonStyle} color="secondary" size="small" aria-label="add">
                        <AddIcon />
                        </Fab>
                        </ThemeProvider>
                        </Grid>
                        <CarouselProvider
                        naturalSlideWidth={30}
                        naturalSlideHeight={15}
                        totalSlides={3}
                        touchEnabled="true"
                        visibleSlides={2}>
                        <Slider>
                        <div>
                        <Slide index={0}>
                        <Card className={classes.card}>
                        <div className="project_card">
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" className="project_title">
                        Nome do Projeto
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2" className="project_title">
                        2021
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2" className="project_title">
                        Data
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2" className="project_title">
                        Sicredi
                        </Typography>
                        </CardContent>
                        </div>
                        <CardActions className="seeMore">
                        <Button size="small" color="primary">
                        Ver detalhes
                        </Button>
                        </CardActions>
                        </Card>
                        </Slide>
                        </div>
                        <Slide index={1}>
                        <Card className={classes.card}>
                        <div className="project_card">
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" className="project_title">
                        Nome do Projeto
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2" className="project_title">
                        2022
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2" className="project_title">
                        Data
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2" className="project_title">
                        Sicredi
                        </Typography>
                        </CardContent>
                        </div>
                        <CardActions className="seeMore">
                        <Button size="small" color="primary">
                        Ver detalhes
                        </Button>
                        </CardActions>
                        </Card>
                        </Slide>
                        <Slide index={2}>
                        <Card className={classes.card}>
                        <div className="project_card">
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" className="project_title">
                        Nome do Projeto
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2" className="project_title">
                        2023
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2" className="project_title">
                        Data
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2" className="project_title">
                        Sicredi
                        </Typography>
                        </CardContent>
                        </div>
                        <CardActions className="seeMore">
                        <Button size="small" color="primary">
                        Ver detalhes
                        </Button>
                        </CardActions>
                        </Card>
                        </Slide>
                        </Slider>
                        {/* <ButtonBack>Back</ButtonBack>
                        <ButtonNext>Next</ButtonNext> */}
                        </CarouselProvider>
                        </Grid>
                        </div>
                        )
}
}
export default (DashDaBia);