import React, {useState, useEffect, useCallback} from 'react'
import axios from 'axios'
import Loading from '../components/Loading'
import Search from '../components/Search'
import CardList from '../components/CardList'

export default function Dashboard() {
    const [search, setSearch] = useState({
        description:'',
        location: ''
    })
    
    const [jobList, setJobList] = useState([])
    const [jobShow, setJobShow] = useState([])
    const [loading, setLoading] = useState(true)
    const [jobStatus, setjobStatus] = useState()
    const [loadMore, setLoadMore] = useState(true)
    const [page, setPage] = useState(1)
    const [isSubmit, setIsSubmit] = useState(false)
    const [filter, setFilter] = useState(false)
    

    const handleLoadMore = () => {
        setPage((prevPage) => prevPage+1)
    }

    const handleInputChange = (event) => {
        let {value, name} = event.target
        setSearch(prevSearch => {
            return {
                ...prevSearch,
                [name]: value
            }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setIsSubmit(prevSubmit => !prevSubmit)
        setJobList([])
        setLoading(true)
        console.log(isSubmit)
    }

    const handleCheck = (event) => {
        const checked = event.target.checked;
        setFilter(checked);
        
        filterJob();
    }

    const filterJob = () => {
        let filterJob = jobList.filter(job => job.type !== "Full Time")
        setJobShow(filterJob);
    }


    useEffect(()=>{
            console.log("call joblist endpoint")
            setLoading(true)
            let cancel
            axios.get(`/positions.json?`, {
                    params: {page:page, description: search.description, location: search.location, full_time:filter},
                    cancelToken: new axios.CancelToken(c => cancel = c)
                })
                .then(res => { 
                    if(res.data.length < 50){
                        setLoadMore(false)
                    }
                    setJobList(prevJobList => {
                        return [...prevJobList, ...res.data.map(item => {
                            let date = new Date(item.created_at)
                            let dateString = JSON.stringify(date).slice(1,11)
                            let obj = {
                                id: item.id,
                                title: item.title,
                                type: item.type,
                                company: item.company,
                                date: dateString,
                                url: item.url,
                                company: item.company,
                                company_url: item.company_url,
                                location: item.location,
                                logo: item.company_logo
                            }
                            return obj
                        })]
                    })                    

                    
                    setjobStatus(res.status)
                    setLoading(false)
                })
                .catch(e => {
                    if(axios.isCancel(e)) return
                })

                return () => {cancel()}
    }, [isSubmit, page])

    return (
        <>
            <div className="container-fluid text-center">    
                <div className="row content">
                    <div className="col-sm-2 sidenav">
                    
                    </div>
                    <div className="col-sm-8 text-left"> 
                        <div className="list-group">
                            <Search
                                handleInputChange={handleInputChange}
                                handleSubmit={handleSubmit}
                                value={search}
                                checkValue={filter}
                                handleCheck={handleCheck}
                            />
                            {
                                jobStatus === 200 && filter === false ?
                                jobList.map(job => {
                                    return (
                                        <CardList 
                                            id={job.id}
                                            title={job.title}
                                            sub_title={job.company}
                                            sub_title_link={job.company_url}
                                            desc={job.location}
                                            img={job.logo}
                                            status={job.date}
                                            desc_two={job.type}
                                        />
                                    )
                                })
                                : 
                                jobShow.map(job => {
                                    return (
                                        <CardList 
                                            id={job.id}
                                            title={job.title}
                                            sub_title={job.company}
                                            sub_title_link={job.company_url}
                                            desc={job.location}
                                            img={job.logo}
                                            status={job.date}
                                            desc_two={job.type}
                                        />
                                    )
                                })
                                
                            }
                            {!loading && loadMore && 
                                <button onClick={handleLoadMore} className="list-group-item list-group-item-action flex-column align-items-start">
                                    <h3 className="text-center">Load More</h3>
                                </button>
                            }
                            {loading && <Loading/>}
                        </div>
                    </div>
                    <div className="col-sm-2 sidenav">
                    </div>
                </div>
            </div>        
        </>
    )
}



                