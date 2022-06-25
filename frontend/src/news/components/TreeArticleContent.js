import * as React from 'react';
import api from "../api/Requests"
import { Suspense } from 'react';
import axios from 'axios';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ConnectedTvOutlined, ControlPointDuplicateOutlined } from '@mui/icons-material';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles'


export class TreeArticleContent extends React.Component {
    constructor(props){
        super(props);
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

        let titlecolor,titlebackgroundColor,articlecolor,articlebackgroundColor
        if (props.comment){
          titlebackgroundColor={
            backgroundColor:'#a4bbf3'
          }
          articlebackgroundColor={
            backgroundColor:'#bbccf6'
          }
          titlecolor='black'
          articlecolor='black'
        }else{
          titlebackgroundColor={
            backgroundColor:'#a9afbd'
          }
          articlebackgroundColor={
            backgroundColor:'#bfc3ce'
          }
          titlecolor='black'
          articlecolor='black'
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
            titlebackgroundColor:titlebackgroundColor,
            titlecolor:titlecolor,
            articlebackgroundColor:articlebackgroundColor,
            articlecolor:articlecolor,
            defaultExpanded:defaultExpanded,
            id:props.id,
            onClick:props.onClick
        }
        console.log(props.onClick)
    }

//    <Accordion className={this.state.calss}}>
    render() {
      return (
          <Accordion 
          defaultExpanded={this.state.defaultExpanded}
          id={String(this.state.id)} 
          onChange = {this.state.onClick}
          
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              sx={this.state.titlebackgroundColor}
              id={String(this.state.id)+"top"}  
            >
              <Typography color={this.state.titlecolor} >{this.state.title}</Typography>
            </AccordionSummary>

            <AccordionDetails
              sx={this.state.articlebackgroundColor}
              id={String(this.state.id)+"buttom"}  
            >
              <Typography color={this.state.articlecolor}>
              {this.state.article}
              </Typography>
            </AccordionDetails>

          </Accordion>
        
      
      );
    }
  }