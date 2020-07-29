import React, {useState, useEffect, useContext} from 'react';

import Container from '@material-ui/core/Container';
import { Grid, Box } from '@material-ui/core';
import OutlinedCard from '../../components/outlinedCard/OutlinedCard';
import Table from '../../components/table/Table';

import UserProvider from "../../contexts/userProvider";
import BackPhoto from '../../assets/viking.png';
import fireImage from '../../assets/FlatFancyBufflehead-size_restricted.gif'

const HomePage = () => {
    const userData = useContext(UserProvider.context);
    const [items, setItems] = useState([]);
    console.log('HomePage', userData)
    useEffect(()=>{
        fetch('/api/drive')
        .then(res => res.json())
        .then(res => setItems(res))
        .catch(err=>console.log(err))
    }, [])

    return (
        <>
        { Object.entries(userData).length !== 0 ? (
            <Box mt={4}>
                <Container maxWidth='lg'>
                    <Table itemsArr={items} />
                </Container>    
            </Box>
        ) : (
            <div style={{backgroundImage:`url(${BackPhoto}), url(${fireImage})`,height:'100vh', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
                <Container maxWidth='lg'>
                    <Grid container >
                        <Grid item xs={12} sm={6} >
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <OutlinedCard />
                        </Grid>
                    </Grid>
                </Container>      
            </div>
        )}  
        </>
    )
}

export default HomePage;
