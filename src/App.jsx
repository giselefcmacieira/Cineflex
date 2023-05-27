import styled from "styled-components";
import HomePage from "./pages/HomePage/HomePage";
import SeatsPage from "./pages/SeatsPage/SeatsPage";
import SessionsPage from "./pages/SessionsPage/SessionsPage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

export default function App() {

    axios.defaults.headers.common['Authorization'] = 'KdtB2nZlh0so1u45Z79YkD3J';

    const [seatsSelected, setSeatsSelected] = useState([]);

    const [nome, setNome] = useState('');

    const [cpf, setCPF] = useState('');

    const[date, setDate] = useState('');

    const[time, setTime] = useState('');

    const[title, setTitle] = useState('');

    return (
        <>
            <BrowserRouter>
                <NavContainer>CINEFLEX</NavContainer>
                <Routes>
                    <Route path = '/' element={<HomePage />}></Route>
                    <Route path = '/sessoes/:filmeid' element={<SessionsPage />}></Route>
                    <Route path = '/assentos/:sessaoid' element={<SeatsPage seatsSelected = {seatsSelected} setSeatsSelected={setSeatsSelected} nome={nome} setNome={setNome} cpf={cpf} setCPF={setCPF} date={date} setDate={setDate} time={time} setTime={setTime} title={title} setTitle={setTitle}/>}></Route>
                    <Route path = '/sucesso' element={<SuccessPage nome={nome} setNome={setNome} cpf={cpf} setCPF={setCPF} seatsSelected = {seatsSelected} setSeatsSelected={setSeatsSelected} date={date} setDate={setDate} time={time} setTime={setTime} title={title} setTitle={setTitle}/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
