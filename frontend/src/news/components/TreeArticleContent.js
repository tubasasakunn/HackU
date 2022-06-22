import * as React from 'react';
import api from "../api/Requests"
import { Suspense } from 'react';
import axios from 'axios';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ConnectedTvOutlined } from '@mui/icons-material';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles'


export class TreeArticleContent extends React.Component {
    constructor(props){
        super(props);
        console.log(props)
        let rate,defaultExpanded
        switch (props.class){
          case 'parent':
            rate=0.0
            defaultExpanded=false
            break;
          case 'child':
            rate=0.4
            defaultExpanded=false
            break
          case 'bro':
            rate=0.2
            defaultExpanded=false
            break
          case 'self':
            rate=0.2
            defaultExpanded=true
            break
          default:
            rate=1.0
            defaultExpanded=false
        }

        let color,backgroundColor
        if (props.comment){
          backgroundColor={
            backgroundColor:'#42a5f5'
          }
          color='black'
        }else{
          backgroundColor={
            backgroundColor:'#ba68c8'
          }
          color='white'
        }



        


        var x = document.body.scrollWidth;
        var y = document.body.scrollHeight;
        const sx={
          width: x*(1-rate),
          height: 0,
          ml:x*rate/8,
          //pt:(props.num-1)*y/8
          }
        this.state={
            article:props.article,
            title:props.title,
            class:props.class,
            sx:sx,
            backgroundColor:backgroundColor,
            color:color,
            defaultExpanded:defaultExpanded
        }
    }

//    <Accordion className={this.state.calss}}>
    render() {
      return (
        
          <Accordion 
          defaultExpanded={this.state.defaultExpanded}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"    
              sx={this.state.backgroundColor}
            >
              <Typography color={this.state.color} >{this.state.title}</Typography>
            </AccordionSummary>

            <AccordionDetails
              sx={this.state.backgroundColor}
            >
              <Typography color={this.state.color}>
              {this.state.article}
              </Typography>
            </AccordionDetails>

          </Accordion>

        
      
      );
    }
  }