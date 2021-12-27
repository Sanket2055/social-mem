import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

import * as api from '../api'
// action creators 
// this are the functions that returns action( action is just a object that returns a type and a payload)

// since we are dealing with async we have to add this "async (dispatch)=>" as a part of redux thunk and then instead of returning we have to dispatch it

export const getPosts =()=> async (dispatch)=>{

    try {

        const {data} = await api.fetchPosts();
        // in the above step we are getting the data from the backend

        dispatch({type:FETCH_ALL , payload:data});
    } catch (error) {
        console.log(error);
        
    }
    



}
export const createPost=(post)=> async (dispatch)=>{
    try {
        const {data} =await api.createPost(post);
        dispatch({
            type:CREATE ,  payload:data
        })
        
    } catch (error) {
        console.log(error);
        
    }

}
export const updatePost = (id, post) => async (dispatch) => {
    try {
      const { data } = await api.updatePost(id, post);
  
      dispatch({ type:UPDATE, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };

  
  export const deletePost = (id) => async (dispatch) => {
    try {
       await api.deletePost(id);
  
      dispatch({ type:DELETE, payload: id });
    } catch (error) {
      console.log(error);
    }
  };

  export const likePost = (id) => async (dispatch) => {
    try {
      const { data } = await api.likePost(id);
  
      dispatch({ type: LIKE, payload: data });
    } catch (error) {
      console.log(error);
    }
  };