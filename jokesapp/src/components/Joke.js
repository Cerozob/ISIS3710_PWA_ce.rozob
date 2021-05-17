import React, { useEffect,useState } from 'react';

const Joke = () => {
    const [state, setState] = useState({ joke:[] });
    
    const setJoke = (pjoke) => {
        setState({ joke: pjoke });
    }
    
    useEffect(() => {

         if (!navigator.onLine) {
             if (localStorage.getItem("joke") === null)
                 setJoke("Loading...");
             else
                 setJoke(localStorage.getItem("joke"));
    }


        const endpoint = process.env.REACT_APP_NORRIS_URL;
        fetch(endpoint).then(res => {
            let joke = res.json();
            console.log(joke);
            return joke;
        }).then((resjoke) => {
            setJoke(resjoke);
            localStorage.setItem("joke", resjoke);
        });
    },[])
    
    return (
        <div className="Joke">
            <h1 className="joketitle">
            {state.joke.value}
            </h1>
        </div>
 );
}
export default Joke;