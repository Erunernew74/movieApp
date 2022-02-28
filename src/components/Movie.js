import React from "react"
import styles from '../../styles/Movie.module.css'



const Movie = ({ title, index, overview, poster_path, titolo}) => {
    const IMAGES_URL = "https://image.tmdb.org/t/p/w500/"
    return(
        <div className={styles.movie} key={index}>
            
            <h2>{titolo}</h2>
            {/* <h3>{title}</h3> */}
            <img src={IMAGES_URL + poster_path} alt={title} />
            <div className={styles.movie_overview}>{overview}</div>
        </div>
    )

    
}

export default Movie