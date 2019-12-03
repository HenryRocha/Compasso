import React from 'react';
import axios from 'axios';

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
import 'pure-react-carousel/dist/react-carousel.es.css';
import Header from '../components/Header';
class BiaDashScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            templates: []
        }
    }
    componentWillMount() {

        axios.get('http://localhost:5003/templates')
        .then(res => {
            if(res.status == 200){
                this.setState({
                templates: res.data.templates
                });
                console.log(res.data.templates)
            }else{
                this.setState({
                templates: res.data.templates
                });
                console.log(res.data.templates)
            }
        });

        axios.get('http://localhost:3002/projects?' + "aqui_vai_um_userId_tirado_do_store", )
        .then(res => {
            if(res.status == 200){
                this.setState({
                projects: res.data
                });
            }else{
                this.setState({
                projects: res.data
                });
            }
        });
    
      }
    teste() {
        this.props.history.push('create_project');
    }
    handleCreateTemplate() {
        this.props.history.push('create_template');
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

        const templatesList = this.state.templates.map((d) => 
                                                       <div>
                                                            <Slide index={0}>
                                                                <Card className={classes.card}>
                                                                    <div className="project_card">
                                                                        <CardContent>
                                                                            <Typography gutterBottom variant="h5" component="h2" className="project_title">
                                                                               {d.title}
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
                                                        </div>);

        const projectsList = this.state.projects.map((d) => 
                                                        <div>
                                                            <Slide index={0}>
                                                                <Card className={classes.card}>
                                                                    <div className="project_card">
                                                                        <CardContent>
                                                                            <Typography gutterBottom variant="h5" component="h2" className="project_title">
                                                                                {d.title}
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
                                                        </div>);

        
        return (
            //   Header< nao esquecer
            <div>
                <Grid direction="column">
                    <Grid item xs container direction="row" spacing={2} style={titleStyle} >
                        <Typography gutterBottom variant="subtitle1">
                            PROJETO EM ANDAMENTO
                        </Typography>
                        <ThemeProvider theme={theme}>
                            <Fab style={buttonStyle} color="secondary" size="small" aria-label="add" onClick={e => this.teste()}>
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
                            {projectsList}
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
                            <Fab style={buttonStyle} color="secondary" size="small" aria-label="add" onClick={e => this.handleCreateTemplate()}>
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
                            {templatesList}
                        </Slider>
                        {/* <ButtonBack>Back</ButtonBack>
                        <ButtonNext>Next</ButtonNext> */}
                    </CarouselProvider>
                </Grid>
            </div>
        )
    }
}
export default (BiaDashScreen);