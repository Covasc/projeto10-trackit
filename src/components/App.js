import styled from 'styled-components';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './Login';
import SignIn from './SignIn';
import Habits from './Habits';
import History from './History';
import Today from './Today';
import UserContext from '../contexts/UserContext';
import { useState } from 'react';


export default function App () {

    const [userInfo, setUserInfo] = useState({})

    return (
        <UserContext.Provider value={{userInfo, setUserInfo}}>
            <BrowserRouter>
                <Container>
                    <Routes>    
                        <Route path='/' element={<Login />} />
                        <Route path='/signin' element={<SignIn />} />
                        <Route path='/habits' element={<Habits />} />
                        <Route path='/history' element={<History />} />
                        <Route path='/today' element={<Today />} />
                    </Routes>
                </Container>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
`