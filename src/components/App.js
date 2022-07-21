import styled from 'styled-components';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './Login';
import SignIn from './SignIn';
import Habits from './Habits';
import History from './History';
import Today from './Today';
import UserContext from '../contexts/UserContext';
import { useState } from 'react';
import PercentageContext from '../contexts/PercentageContext';


export default function App () {

    const [userInfo, setUserInfo] = useState({});
    const [percentage, setPercentage] = useState(0);

    return (
        <UserContext.Provider value={{userInfo, setUserInfo}}>
        <PercentageContext.Provider value= {{percentage, setPercentage}}>
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
        </PercentageContext.Provider>
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