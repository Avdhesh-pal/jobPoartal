import React, { useEffect,useState } from 'react'
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import {Input} from '../ui/input';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '../redux/jobSlice';

const AdminJobs = () => {
  useGetAllAdminJobs();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input,setInput] = useState("");
  useEffect(()=>{
    dispatch(setSearchJobByText(input));
  },[input])
  
  return (
    <div>
      <Navbar/>
      <div className='max-w-6xl mx-auto my-10' >
        <div className='flex items-center justify-between'>
          <Input
            className="w-fit"
            placeholder="Filter by name"
            onChange = {(e)=>setInput(e.target.value)}
          />
          <Button onClick={()=> navigate("/admin/jobs/create")} >New Jobs</Button>
        </div>
        <AdminJobsTable/>
      </div>
    </div>
  )
}

export default AdminJobs
