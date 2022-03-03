import React from 'react'
import Head from 'next/head'
import getConfig from 'next/config'
import Movie from '../src/components/Movie'
import { useState, useEffect } from 'react'
import stylesIndex from './styles.module.css'

import { Button, Container, Row, Col } from 'react-bootstrap'
 
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
export default function Home() {
  // State per far vedere tutti i risultati
  const [searchResults, setSearchResults] = useState([])
  // State per catturare i valori inseriti nell'input di ricerca
  const [formInput, setFormInput] = useState({})

  // Con questo state vediamo i risultati della ricerca tramite la fetch search()
  const [searchTerm, setSearchTerm] = useState("")
  
  // useEffect(() => {
  //   setSearchResults(initialData.trendingMovies.results)
  // }, [setSearchResults])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=36efc68a193b802e2257db65d00f6cc7`)
      const data = await res.json()
      setSearchResults(data.results)
    }
    fetchData()
  }, [])

  const handleInput = (e) => {
    let {name, value} = e.target
    setFormInput({...formInput, [name]: value})
    setSearchTerm(e.target.value)
  }

  // Fetch per la ricerca tramite la barra search
  const search = async(e) => {
    e.preventDefault()
    let movies = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=36efc68a193b802e2257db65d00f6cc7&language-US&query=${formInput.searchTerm}&page-1&include_adult=false`)
    movies = await movies.json()
    setSearchResults(movies.results)
  }
 
  return (
    <>
    <div className={stylesIndex.red_background}></div>
    <div className="container">
      
      <Head>
        
        <link rel='stylesheet' href='/styles.css' />
      </Head>
        {/* <h1>
          <Movie titolo = 'Lista dei film' />
        </h1> */}
        <h1>Movie App heroku</h1>
        <Row className='fluid'>
          <Col md={6} className="md-auto">
            <form classsName={stylesIndex.search_form} onSubmit={search}>
              <input className={stylesIndex.search}
                name='searchTerm'
                value={searchTerm}
                onChange={handleInput}
                required
              />
              <button className={stylesIndex.btn_search}>
                Search
              </button>
            </form>
          </Col>
        </Row>
        <Container>

      <div className={stylesIndex.movie_search_results_grid}>
        
        {searchResults.map((each, index) => {
          return(
            <div key = {index}>
              <Movie
              
              index = {each.id}
              title = {each.title}
              poster_path = {each.poster_path}
              overview = {each.overview}
            />
            </div>
            
          )
        })}
      </div>
      </Container>
    </div>
    </>
  )
}

// export async function getServerSideProps(context) {
//   let trendingMovies = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=36efc68a193b802e2257db65d00f6cc7`)
//   trendingMovies = await trendingMovies.json()
//   console.log(trendingMovies)
//   return {
//     props: {trendingMovies: trendingMovies}, // will be passed to the page component as props
//   }
// }

