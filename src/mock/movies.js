import Axios from "axios";

const MoviesGetter = () => {
    return Axios.get("http://localhost:5000/playlist/5fda31cb0ccaba1ab8e72bb5").then(res => res.data).catch(err => console.log(err));
}

export default MoviesGetter;

        // let url = 'https://reactnative.dev/movies.json';
