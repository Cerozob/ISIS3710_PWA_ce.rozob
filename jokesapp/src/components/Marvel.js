import React, { useEffect,useState } from 'react';
const crypto = require('crypto');

const Marvel = () => {
    const [state, setState] = useState({ marvel: [] });
    
    const setMarvel = (pMarvel) => {
        setState({ marvel: pMarvel });
    }

    const genMarvelMD5 = (ts, apikey) => {
        let content = `${ts}${process.env.REACT_APP_PRIVATE_KEY}${apikey}`;
        return crypto.createHash('md5').update(content).digest("hex");
    }
    
    useEffect(() => {

         if (!navigator.onLine) {
             if (localStorage.getItem("marvel") === null)
                 setMarvel("Loading...");
             else
                 setMarvel(localStorage.getItem("marvel"));
    }


        const endpoint = process.env.REACT_APP_MARVEL_URL;
        console.log("endpoint :"+endpoint)
        let marvelURL = new URL(endpoint);
        let ts = Date.now().toString();
        let apikey = process.env.REACT_APP_PUBLIC_KEY;
        let hash = genMarvelMD5(ts,apikey);
        marvelURL.searchParams.set("ts",ts)
        marvelURL.searchParams.set("apikey",apikey)
        marvelURL.searchParams.set("hash",hash)

        fetch(marvelURL).then(res => {
            return res.json();
        }).then((marvelObj) => {
            let marvel = marvelObj.data.results;
            console.log(marvel);
            setMarvel(marvel);
            localStorage.setItem("marvel", marvel);
        });
    },[])
    
    return (<div>
        {state.marvel.map((item) => (

            <div className="marvelCharacter">
                <h1 className="marvelTitle">{item.name}</h1>
                <h2 className="marvelDescription">{item.description}</h2>
                <h3 className="appearancesTitle">Apariciones</h3>
                <h4 className="comicappearances">Comics</h4>
                {item.comics.items.map((comic) => (
                    <h5>{comic.name}</h5>
                ))}
                <h4 className="seriesappearances">Series</h4>
                {item.series.items.map((serie) => (
                    <h5>{serie.name}</h5>
                ))}
            </div>
        ))}
    </div>);
}
export default Marvel;