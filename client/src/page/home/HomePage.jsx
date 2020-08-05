import React, {useState, useEffect, useContext} from 'react';

import Container from '@material-ui/core/Container';
import { Grid, Box } from '@material-ui/core';
import OutlinedCard from '../../components/outlinedCard/OutlinedCard';
import Table from '../../components/table/Table';

import CurrentUserContext from "../../contexts/current-user/current-user.context";

import './homePage.scss'

const HomePage = () => {

    const currentUser = useContext(CurrentUserContext);
    const [items, setItems] = useState([]);

    useEffect(()=>{
        fetch('/api/drive')
        .then(res => res.json())
        .then(res => setItems(res))
        .catch(err=>console.log(err))
    }, [])

    return (
        <div className={ currentUser ? 'promo_wrapper_table':'promo_wrapper_main'} >
        { currentUser? (
            <Box mt={4}>
                <Container maxWidth='lg'>
                    <Table itemsArr={items} />
                </Container>    
            </Box>
        ) : (
            <Container maxWidth='lg'>
                <Grid container >
                    <Grid item xs={12} sm={6} >
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <OutlinedCard />
                    </Grid>
                </Grid>
            </Container>
        )}  
        </div>
    )
}

export default HomePage;
