import { Badge, Box, useColorModeValue, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import "./MovieSinglePage.css";
import { MYSPACE_UPDATE } from '../Redux/Auth/ActionTypes';

export const MovieSinglePage = () => {
    const { _id } = useParams();
    const Account_info = useSelector((store) => store.authReducer.Account_info)
    const movies = useSelector((store) => store.productReducer.movies);
    const UserId = useSelector((store) => store.authReducer.UserId);
    console.log("userId", UserId)
    const dispatch = useDispatch();
    const toast = useToast()
    const [data, setData] = useState(null);

    useEffect(() => {
        const movieData = movies.find((el) => el._id === _id);
        if (movieData) setData(movieData);
    }, [_id, movies]);

    const handleMySpace = async () => {
        if (!data) return;

        console.log("Movie ID:", data._id);

        try {
            const response = await fetch(`https://movies-data-fdb6.onrender.com/users/movie/${data._id}/add-to-my-space`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${yourAuthToken}`, // Uncomment and add your auth token if required
                },
                body: JSON.stringify({ accountId: `${UserId}` }) // Replace with actual account ID
            });

            if (response.ok) {
                const result = await response.json();
                dispatch({type:MYSPACE_UPDATE, payload:[...Account_info,_id]})
                console.log('Successfully added to My Space:', result);
            } else {
                console.error('Failed to add to My Space');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        toast({
            title: `Movie Added to My space Successfully`,
            position: "top",
            isClosable: true,
          })
    };

    if (!data) return <p>Loading...</p>; // Handle the loading state or data not found

    return (
        <Box as="main" height="auto" w={"98.5vw"} paddingLeft={"13%"} id='Maincontainer' bg={useColorModeValue('#000014', 'gray.800')} color={"white"}>
            <div id="container">
                <div id="img">
                    <iframe
                        width="100%"
                        height="600"
                        src={data.Trailer_URL}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </div>
                <div id="details" p={{ base: 4, md: 8 }}>
                    <h4>{data.Title}</h4>
                    <h5><span>RunTime:</span> {data.Runtime}</h5>
                    <h5><span>Release Date:</span> {data.Release_Date}</h5>
                    <h5>
                        <span>Rating:</span>
                        <Badge variant='solid' colorScheme='yellow' id="Star">
                            {data.Average_Rating} <span>★</span>
                        </Badge>
                    </h5>
                    <p><span>Description:</span> {data.Description}</p>
                    <button id="button" onClick={handleMySpace}>
                        Add to My Space
                    </button>
                </div>
            </div>

            <div id="movieDetails" p={{ base: 4, md: 8 }}>
                <p>
                    <h1>Information about {data.Title}</h1>
                    <br />
                    {data.Title} is an exciting movie with a runtime of {data.Runtime}. It was released on {data.Release_Date}. {data.Description}
                </p>
            </div>
        </Box>
    );
};
