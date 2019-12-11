import React from 'react';
import axios from 'axios';
import AddIcon from '@material-ui/icons/Add';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import 'pure-react-carousel/dist/react-carousel.es.css';
//Redux
import actions from "../actions";
import { persistor } from "../store";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const mapStateToProps = state => ({
    templates: state.data.templates,
    projects: state.data.projects,
    user: state.user
  });

  const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { setTemplate: actions.setTemplate, setProject: actions.setProject },
    dispatch
  );

class BiaDashScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: props.projects,
            templates: props.templates,
            user: props.user
        }
    }
 
    handleCreateProject() {
        this.props.history.push('create_project');
    }
    handleCreateTemplate() {
        this.props.history.push('create_template');
    }
    handleProjectDetails(project) {
        this.props.setProject(project);
    }
    handleTemplateDetails(template) {
        this.props.setTemplate(template);
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
        var templateCards = this.state.templates.map((d,i) => 
                                                       <div>
                                                            <Slide index={i}>
                                                                <Card className={classes.card}>
                                                                    <div className="project_card">
                                                                        <CardContent>
                                                                            <Typography gutterBottom variant="h5" component="h2" className="project_title">
                                                                               {d.title}
                                                                            </Typography>
                                                                        </CardContent>
                                                                   </div>
                                                                </Card>
                                                            </Slide>
                                                        </div>);

        var projectCards = this.state.projects.map((d,i) => 
                                                        <div>
                                                            <Slide index={i}>
                                                                <Card className={classes.card}>
                                                                    <div className="project_card">
                                                                        <CardContent>
                                                                            <Typography gutterBottom variant="h5" component="h2" className="project_title">
                                                                                {d.title}
                                                                            </Typography>
                                                                        </CardContent>
                                                                    </div>
                                                                    <CardActions className="seeMore">
                                                                        <Button size="small" color="primary" onClick={() => this.handleProjectDetails(d)}>
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
                            <Fab style={buttonStyle} color="secondary" size="small" aria-label="add" onClick={e => this.handleCreateProject()}>
                                <AddIcon />
                            </Fab>
                        </ThemeProvider>
                    </Grid>
                    <CarouselProvider
                        naturalSlideWidth={30}
                        naturalSlideHeight={15}
                        totalSlides={this.state.projects.length}
                        touchEnabled="true"
                        visibleSlides={this.state.projects.length + 2}>
                        <Slider>
                            {projectCards}
                        </Slider>
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
                        totalSlides={this.state.projects.length}
                        touchEnabled="true"
                        visibleSlides={this.state.projects.length+3}>
                        <Slider>
                            {templateCards}
                        </Slider>
                    </CarouselProvider>
                </Grid>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BiaDashScreen);