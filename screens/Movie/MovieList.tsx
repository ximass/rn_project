import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const MovieItem = styled.Text`
  font-size: 18px;
  margin-bottom: 8px;
`;

const MovieList: React.FC = () => {
  const movies = ['Movie 1', 'Movie 2', 'Movie 3']; // Exemplo de dados da lista

  return (
    <Container>
      <Title>Movie List</Title>
      {movies.map((movie, index) => (
        <MovieItem key={index}>{movie}</MovieItem>
      ))}
    </Container>
  );
};

export default MovieList;
