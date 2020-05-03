import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Loading from '../components/Loading'

export default function JobDetail(props) {
    const { id } = props.match.params;
    const url = "/positions/" + id + ".json";
    const [job, setJob] = useState({})
    const [jobLoading, setjobLoading] = useState(true)
    const [errorFetch, setErrorFetch] = useState(false)
    const logo_png = "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
    
    const getJobs = async () => {
        const jobs = await axios.get(url);
        if(JSON.stringify(jobs.data) !== JSON.stringify({})){
            setJob(jobs.data);
        }
        else{
            setErrorFetch(true)
        }
        setjobLoading(false)
       };

    useEffect(()=>{
        setjobLoading(true)
        getJobs()        
    }, [])

    return (
        <>
         <div className="container-fluid text-center">    
            <div className="row content">
                <div className="col-sm-2 sidenav">
                
                </div>
                {jobLoading && <Loading/>}
                {!jobLoading && 
                    <div className="col-sm-8 text-left"> 
                        <div className="card mb-3">
                            <div className="card-body">
                                <div className="row mb-4">
                                    <div className="col-md-2">
                                        <img src={job.company_logo ? job.company_logo : logo_png} alt="" height="100px" width="100px"/>
                                    </div>
                                    <div className="col-md-10">
                                        <div className="d-flex w-100 justify-content-between">
                                            <h4>{job.title}</h4>
                                            <small className="text-muted">{job.type}</small>
                                        </div>
                                        <div className="d-inline-flex">
                                            <a href={job.company_url}><small className="text-primary mr-2">{job.company} </small></a>
                                            <p><small className="text-dark">{job.location}</small></p>
                                        </div>
                                        <p><small className="text-dark">{job.created_at}</small></p>
                                    </div>
                                </div>
                                <p className="card-text"><span dangerouslySetInnerHTML={{ __html: job.description }} /></p>
                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    </div>
                }
                <div className="col-sm-2 sidenav">
                </div>
            </div>
        </div>
   
        </>
    )
}
