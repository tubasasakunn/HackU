
import api from "../api/Requests";
import useAxios from "axios-hooks";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { TreeArticleContent } from "../components/TreeArticleContent";
import { Suspense } from 'react';

import Stack from '@mui/material/Stack';

import Box from '@mui/material/Box';
import { ConnectedTvOutlined } from "@mui/icons-material";
export const Tree = () => {
  const id=25
  const query = new URLSearchParams({
    id: id,
  });
    
  const [{ data, error, loading }] = useAxios({
    url: api.getRelationsFromQuery.url(query),
    method: api.getRelationsFromQuery.method,
  });

  if (loading || !data) return <h1>loading...</h1>;
  if (error) return <h1>Error!</h1>;
  const parent=data["parent"]
  const bros=data["bros"]
  const child=data["child"]
  const self=data["self"]


  return (
    <div>
      {parent.map((item) => {
        return (
          <Box sx={{ml:0}}>
            <TreeArticleContent title={item.title} article={item.article} class={'parent'} comment={item.comment}/>
          </Box>
        );
      })}

{self.map((item) => {
        return (
          <Box sx={{ml:12}}>
            <TreeArticleContent title={item.title} article={item.article} class={'self'} comment={item.comment}/>
          </Box>
        );
      })}

{bros.map((item) => {
        return (
          <Box sx={{ml:15}}>
            <TreeArticleContent title={item.title} article={item.article} class={'bor'} comment={item.comment}/>
          </Box>
        );
      })}




      {child.map((item) => {
        return (
          <Box sx={{ml:24}}>
            <TreeArticleContent title={item.title} article={item.article} class={'child'} comment={item.comment}/>
          </Box>
        );
      })}
    </div>
  );
};

