import styled from "styled-components"
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function HomePage() {

    const [filmes, setFilmes] = useState(null);
    useEffect(() =>{
        const requisicao = axios.get('https://mock-api.driven.com.br/api/v8/cineflex/movies');
        requisicao.then(resposta => {
            setFilmes(resposta.data);
        });
        requisicao.catch(erro => {
            console.log('erro!');
        })
    }, [])

    if(filmes === null){
        return(
            <PageContainer>
                Carregando...
            </PageContainer>
        );
    }
    
    return (
        <PageContainer>
            Selecione o filme

            <ListContainer>
                {filmes.map(filme => (
                <Link to={`/sessoes/${filme.id}`} key={filme.id}>
                    <MovieContainer data-test="movie">
                        <img src={filme.posterURL} alt="poster"/>
                    </MovieContainer>
                </Link>
                ))}
            </ListContainer>

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
    padding-top: 70px;
`
const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`
const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    img {
        width: 130px;
        height: 190px;
    }
`