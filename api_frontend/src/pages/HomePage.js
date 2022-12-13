import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const HomePage = () => {

    const [advocates, setAdvocates] = useState([])
    const [total, setTotal] = useState(0)
    const [pagination, setPagination] = useState(null)

    useEffect(() => {
        getData()
    }, [])

    let getData = async (query = '') => {
        let response = await axios.get(`http://127.0.0.1:8000/advocates?query=${query}`)
        setAdvocates(response.data)
        // setPagination(response.data.pagination)

        // let response = await axios.get(`https://cados.up.railway.app/advocates?query=${query}`)
        // // console.log('RESPONSE:', response)
        // setAdvocates(response.data.advocates)
        // setTotal(response.data.total)
        // setPagination(response.data.pagination)
    }

    let searchData = (e) => {
            e.preventDefault()
        let query = e.target.query.value
        getData(query)
    }

  return (
    <div className='main--container'>
        <h1>Search {total} developer advocates found by @dennisivy's webscraper and the TwitterAPI.</h1>
        <p>{pagination?.results_found} Developer advocates found</p>

        <div className='form--wrapper'>
            <form onSubmit={searchData} id="search_form">
                <input type="text" name="query" placeholder='Search advocates...'></input>
                <input type="submit" value="Search" className='btn--primary'></input>
            </form>
        </div>

        <div className='advocate__list'>
            {advocates.map((advocate, index) => (
                <div className='advocate__preview__wrapper' key={(index)}>
                    <div className='advocate__preview__header'>
                        <Link to={`/advocate/${advocate.username}`}>
                            <img className='advocate__preview__image' src={advocate.profile_pic}/>
                        </Link>
                        <div>
                            <strong>{advocate.name}</strong>
                            <br/>
                            <a href={advocate.twitter} target="_blank">@{advocate.username}</a>
                        </div>

                        <small className='bio--preview'>{advocate.bio}</small>
                    </div>

                </div>
            ))}
        </div>
    </div>
  )
}

export default HomePage