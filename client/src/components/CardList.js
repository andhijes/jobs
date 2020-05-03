import React from 'react'
import {Link} from 'react-router-dom'
export default function CardList(props) {
    const logo_png = "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
    const {
        id,
        title,
        sub_title,
        sub_title_link,
        desc,
        desc_two,
        img,
        status
    } = props
    return (
        <>
            <div key={id} className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="row">
                    <div className="col-md-2">
                        <img src={img ? img : logo_png} alt="" height="100px" width="100px"/>
                    </div>
                    <div className="col-md-10">
                        <div className="d-flex w-100 justify-content-between">
                        <Link to={`/dashboard/jobs/${id}`}><h5 className="mb-1 text-dark">{title}</h5></Link>
                        <small className="text-muted">{status}</small>
                        </div>
                        <a href={sub_title_link}><small className="text-primary">{sub_title}</small></a>
                        <p><small className="text-dark">{desc} • {desc_two}</small></p>
                    </div>
                </div>
            </div>
        </>
    )
}
