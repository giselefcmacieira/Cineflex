import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom"
import styled from "styled-components"
import SeatItem from "./Seat";

export default function SeatsPage(props) {

    const {seatsSelected, setSeatsSelected} = props;

    console.log(seatsSelected);

    const {sessaoid} = useParams();

    const [seats, setSeats] = useState(null)

    useEffect(() => {
        const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${sessaoid}/seats`;
        const requisicao = axios.get(url);
        requisicao.then(resposta => {
            console.log(resposta);
            console.log(resposta.data.seats);
            setSeats(resposta.data.seats);
        })
        requisicao.catch(erro => {
            console.log(erro);
        })
    }, [])

    function bookSeats(){
        const url = 'https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many';
        const requisicao = axios.post()
    }

    if(seats === null){
        return(
            <PageContainer>
                Carregando ...
            </PageContainer>
        )
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {seats.map(seat =>(
                <SeatItem key = {seat.id} seat = {seat} seatsSelected={seatsSelected} setSeatsSelected={setSeatsSelected}/>)
                )}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle type={'selecionado'}>
                    </CaptionCircle>
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle type={'disponível'}>
                    </CaptionCircle>
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle type={'indisponível'}>
                    </CaptionCircle>
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                Nome do Comprador:
                <input placeholder="Digite seu nome..." />

                CPF do Comprador:
                <input placeholder="Digite seu CPF..." />
                    <button onClick={bookSeats}>Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer>
                <div>
                    <img src={"https://br.web.img2.acsta.net/pictures/22/05/16/17/59/5165498.jpg"} alt="poster" />
                </div>
                <div>
                    <p>Tudo em todo lugar ao mesmo tempo</p>
                    <p>Sexta - 14h00</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    // border: 1px solid #0E7D71;
    border: ${props => {
        switch (props.type){
            case 'selecionado':
                return '1px solid #0E7D71';
            case 'disponível':
                return '1px solid #7B8B99';
            case 'indisponível':
                return '1px solid #F7C52B';
        }
    }};         // Essa cor deve mudar
    background-color: ${props => {
        switch (props.type){
            case 'selecionado':
                return '#1AAE9E';
            case 'disponível':
                return '#C3CFD9';
            case 'indisponível':
                return '#FBE192';
        }
    }};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`