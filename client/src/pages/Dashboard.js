import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function Dashboard() {
    const [jobList, setJobList] = useState([])
    const [loading, setLoading] = useState(true)
    const [jobStatus, setjobStatus] = useState()
    const [jobLength, setJobLength] = useState()

    useEffect(()=>{
            console.log("call joblist endpoint")
            setJobList([])
            setLoading(true)
            let cancel
            axios.get(`/positions.json?`, {
                    cancelToken: new axios.CancelToken(c => cancel = c)
                })
                .then(res => { 
                    
                    setJobList(prevJobList => {
                        return [...res.data.map(item => {
                            let obj = {
                                id: item.id,
                                title: item.title,
                                type: item.type,
                                company: item.company,
                                date: item.created_at,
                                url: item.url,
                                company: item.company,
                                company_url: item.company_url,
                                location: item.location,
                                logo: item.company_logo
                            }
                            return obj
                        })]
                    })
                    setJobLength(res.data.length)
                    setjobStatus(res.status)
                    setLoading(false)
                })
                .catch(e => {
                    if(axios.isCancel(e)) return
                })

                return () => {cancel()}
    }, [])

    return (
        <>
            <div className="container">
                <div className="list-group">
                    {loading && 'Loading...'}
                    {
                        jobStatus === 200 ?
                        jobList.map(job => {
                            return (
                                <a href={job.url} key={job.id} className="list-group-item list-group-item-action flex-column align-items-start">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <img src={job.logo} alt="" height="100px" width="100px"/>
                                        </div>
                                        <div className="col-md-10">
                                            <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">{job.title}</h5>
                                            <small className="text-muted">{job.type}</small>
                                            </div>
                                            <a href={job.company_url}><small className="text-primary">{job.company}</small></a>
                                            <p><small className="text-dark">{job.location}</small></p>
                                        </div>
                                    </div>
                                </a>
                            )
                        })
                        : null
                    }
                    {!loading && 
                        <button className="list-group-item list-group-item-action flex-column align-items-start text-center">
                            <h3>Load More</h3>
                        </button>
                    }
                </div>
            </div>           
        </>
    )
}



                