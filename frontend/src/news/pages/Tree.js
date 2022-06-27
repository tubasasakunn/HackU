
import api from "../api/Requests";
import useAxios from "axios-hooks";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { TreeArticleContent } from "../components/TreeArticleContent";
import {  createRef,Suspense,useEffect,useRef } from 'react';
import LeaderLine from "leader-line-new";
import Draggable from 'react-draggable';

import Xarrow from "react-xarrows";
import {useXarrow, Xwrapper} from 'react-xarrows';


import Box from '@mui/material/Box';
import { ConnectedTvOutlined } from "@mui/icons-material";
import * as React from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { delay } from "lodash";


export const Tree = () => {

  const { id } = useParams();
  const [count, setCount] = React.useState(0);

  const query = new URLSearchParams({
    id: id,
  });
    
  const [{ data, error, loading }] = useAxios({
    url: api.getRelationsFromQuery.url(query),
    method: api.getRelationsFromQuery.method,
  });



  const listRefs = useRef([]);

  if (loading || !data) return <h1>loading...</h1>;
  if (error) return <h1>Error!</h1>;
  const parent=data["parent"]
  const bros=data["bros"]
  const child=data["child"]
  const self=data["self"]
  
  listRefs.current[0] = createRef();
  listRefs.current[1] = createRef();
  listRefs.current[2] = createRef();
  console.log('saxasx',listRefs.current[0])

  const arrow_list=[]
  let start,end
  if(parent.length>0){
    start = parent[0].id
  }
  let i=0
  for (const elem of parent.slice(1)) {
    end=elem.id
    arrow_list.push({"start":String(start),"end":String(end),"startAnchor": "buttom","endAnchor":"tops"})
    start = end
  }

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const onClick = () => {
    console.log(count)
    delay(500).then(() =>
    setCount(count => count + 1)
    );
    
  };

  if(parent.length>0){
    start = parent[parent.length - 1].id
  for (const elem of bros) {
    end=elem.id
    arrow_list.push({"start":String(start),"end":String(end),"startAnchor": {position: "buttom", offset: { x: -100 }},"endAnchor":"left"})

  }

  
  for (const elem of self) {
    end=elem.id
    arrow_list.push({"start":String(start),"end":String(end),"startAnchor": {position: "buttom", offset: { x: -100 }},"endAnchor":"left"})
  }
}
  
  start=self[0].id
  for (const elem of child) {
    end=elem.id
    arrow_list.push({"start":String(start),"end":String(end),"startAnchor": {position: "buttom", offset: { x: -100 }},"endAnchor":"left"})
  }

  /*

*/
  for (const elem of arrow_list){
    console.log("x",elem)

    
  }

  return (

    
    <div>          


      {parent.map((item,index) => {
        return (

          <Box sx={{ml:0,p:1 }}>
            
            <TreeArticleContent title={item.title} article={item.article} class={'parent'} comment={item.comment} id={String(item.id)} onClick={onClick}/>
        
          
          </Box>
        );
        
      })}




{bros.map((item) => {
        return (
          <Box sx={{ml:12,p:1}}>
            <TreeArticleContent title={item.title} article={item.article} class={'bros'} comment={item.comment} id={String(item.id)} onClick={onClick}/>
          </Box>
        );
      })}  
      

{self.map((item) => {
        return (
          <Box sx={{ml:12,p:1}}>
            <TreeArticleContent title={item.title} article={item.article} class={'self'} comment={item.comment} id={String(item.id)} onClick={onClick}/>
       </Box>
        );
      })}



      {child.map((item) => {
        return (
          <Box sx={{ml:24,p:1}}>
            <TreeArticleContent title={item.title} article={item.article} class={'child'} comment={item.comment} id={String(item.id)} onClick={onClick}/>
          </Box>
        );
      })}


{arrow_list.map((item,index) => {
  return (
    <Xarrow
        start={item.start} //can be react ref
        end={item.end} //or an id
        startAnchor={item.startAnchor}
        endAnchor={item.endAnchor}
        key={index}
        showHead={false}
        strokeWidth={1}
        path={"grid"}
        zIndex={-100}
        headSize={count}
      />
  )
})}

    </div>
  );
};

