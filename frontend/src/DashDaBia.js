import React, { Component } from 'react';

import AddIcon from '@material-ui/icons/Add';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Swiper from 'swiper/js/swiper.esm.bundle';

class DashDaBia extends React.Component {
    constructor(props) {
        super(props);
        this.projects = {
            hits: []
        };
        this.state = {
            // dummy slides data
            slides: (function () {
                var slides = [];
                for (var i = 0; i < 600; i += 1) {
                    slides.push('Slide ' + (i + 1));
                }
                return slides;
            }()),
            // virtual data
            virtualData: {
                slides: [],
            },
        }
    }
    // componentDidMount() {
    //     const swiper = new Swiper('.swiper-container', {
    //         virtual: {
    //             slides: self.state.slides,
    //             renderExternal(data) {
    //                 // assign virtual slides data
    //                 self.setState({
    //                     virtualData: data,
    //                 });
    //             }
    //         },
    //     });
    // }
    render() {
        // const self = this;
        // const swiper = new Swiper('.swiper-container', {

        //     virtual: {
        //         slides: self.state.slides,
        //         renderExternal(data) {
        //             // assign virtual slides data
        //             self.setState({
        //                 virtualData: data,
        //             });
        //         }
        //     },
        // });
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
        return (
            //   Header< nao esquecer
            <div>
                <Grid direction="row">
                    <Grid item xs container direction="row" spacing={2} style={titleStyle} >
                        PROJETOS EM ANDAMENTO
                    <ThemeProvider theme={theme}>
                            <Fab style={buttonStyle} color="secondary" size="small" aria-label="add">
                                <AddIcon />
                            </Fab>
                        </ThemeProvider>
                    </Grid>
                </Grid>
                {/* <div className={swiper}> */}
                {/* <div className="swiper-wrapper"> */}
                {/* It is important to set "left" style prop on every slide */}
                {/* {this.state.virtualData.slides.map((slide, index) => ( */}
                {/* <div className="swiper-slide" */}
                {/* key={index} */}
                {/* >{slide}</div> */}
                {/* ))} */}
                {/* </div> */}
                {/* </div> */}
                <Grid direction="row">
                    <Grid item xs container direction="row" spacing={2} style={titleStyle}>
                        FORM PADRÃO
                    <ThemeProvider theme={theme}>
                            <Fab style={buttonStyle} color="secondary" size="small" aria-label="add">
                                <AddIcon />
                            </Fab>
                        </ThemeProvider>
                    </Grid>
                </Grid>
                {/* <div className={swiper}> */}
                {/* <div className="swiper-wrapper"> */}
                {/* It is important to set "left" style prop on every slide */}
                {/* {this.state.virtualData.slides.map((slide, index) => ( */}
                {/* <div className="swiper-slide" */}
                {/* key={index} */}
                {/* >{slide}</div> */}
                {/* ))} */}
                {/* </div> */}
                {/* </div> */}
            </div>
        )
    }
}
export default (DashDaBia);