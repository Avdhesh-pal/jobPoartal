import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import {JOB_API_END_POINT} from  '../components/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setAllJobs } from '../components/redux/jobSlice'


const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.job);
  useEffect(() => {
    const fetchAllJobs = async()=>{

        try {
            const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,{withCredentials:true});
            if(res.data.success){
                dispatch(setAllJobs(res.data.jobs))
            }
        } catch (error) {
            console.log(error);
            
        }
    }
   fetchAllJobs();  
  }, [])
  
}

export default useGetAllJobs
