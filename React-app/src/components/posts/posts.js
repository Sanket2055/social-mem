
import React from 'react';
import {useSelector} from 'react-redux'
// use selector used to fetch the data from the global redux store
import { Grid, CircularProgress } from '@material-ui/core';
import Post from './post/post';
import useStyles from './styles'
import { useDispatch } from 'react-redux';

const Posts = ({setCurrentId}) => {
    const posts=useSelector(state => state.posts) //also intialised it as a hook , in props we get acces to whole state
     const classes= useStyles();
     const dispatch = useDispatch()
     console.log(posts);  
    return (
        !posts.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
              {posts.map((post) => (
                <Grid key={post._id} item xs={12} sm={6} md={6} >
                  <Post post={post} setCurrentId={setCurrentId}  />
                </Grid>
              ))}
            </Grid>
    )
    )
}
export default Posts;
