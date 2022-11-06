import { useState, useEffect } from 'react';
import { useToast, FlatList, Text } from 'native-base';
import { api } from "../services/api";
import { Game, GameProps } from '../components/Game';
import { Loading } from './loading';

interface Props {
  poolId: string;
}

export function Guesses({ poolId }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState<GameProps[]>([]);
  const [team1Points, setTeam1Points] = useState('');
  const [team2Points, setTeam2Points] = useState('');
  const toast = useToast();

  async function fetchGames() {
    try {
      setIsLoading(true);

      const response = await api.get(`/pools/${poolId}/games`);
      setGames(response.data.games);
    }
    catch (error) {
      console.warn(error);
      toast.show({
        title: 'Não foi possível carregar os jogos',
        placement: 'top',
        bgColor: 'red.500'
      })
    }
    finally {
      setIsLoading(false);
    }
  }

  async function handleGuessConfirm(gameId: string) {
    try {
      if (!team1Points.trim() || !team2Points.trim()) {
        return toast.show({
          title: 'Informe o placar do palpite',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      setIsLoading(true);
      console.log(`/pools/${poolId}/games/${gameId}/guesses`)
      console.log(team1Points, team2Points)

      await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
        team1Points: Number(team1Points),
        team2Points: Number(team2Points),
      });

      toast.show({
        title: 'Palpite enviado com sucesso',
        placement: 'top',
        bgColor: 'green.500'
      })

      fetchGames();
    }
    catch (error) {
      console.warn(error);
      toast.show({
        title: 'Não foi possível enviar o palpite',
        placement: 'top',
        bgColor: 'red.500'
      })
    }
    finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGames();
  }, [poolId]);

  if (isLoading) {
    return <Loading />
  }

  return (
    <FlatList 
      data={games}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Game
          data={item}
          setFirstTeamPoints={setTeam1Points}
          setSecondTeamPoints={setTeam2Points}
          onGuessConfirm={() => handleGuessConfirm(item.id)}
        />
      )}
    />
  );
}
