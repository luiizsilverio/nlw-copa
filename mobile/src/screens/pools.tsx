import { useState, useCallback } from 'react';
import { VStack, Icon, useToast, FlatList } from "native-base";
import { Octicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { api } from "../services/api";
import { Button } from "../components/button";
import { Header } from "../components/Header";
import { Loading } from '../components/loading';
import { PoolCard, PoolProps } from '../components/PoolCard';
import { EmptyPoolList } from '../components/EmptyPoolList';

export function Pools() {
  const [isLoading, setIsLoading] = useState(true);
  const [pools, setPools] = useState<PoolProps[]>([]);
  const { navigate } = useNavigation();
  const toast = useToast();

  async function fetchPools() {

    try {
      setIsLoading(true);
      const response = await api.get('/pools');
      setPools(response.data.pools)
    }
    catch (error) {
      console.warn(error);
      toast.show({
        title: 'Não foi possível carregar os bolões',
        placement: 'top',
        bgColor: 'red.500'
      })
    }
    finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(useCallback(() => {
    fetchPools();
  }, []));

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus bolões" />
      <VStack mt={6} mx={5} pb={4} mb={4} borderBottomWidth={1} borderBottomColor="gray.600">
        <Button 
          title="BUSCAR BOLÃO POR CÓDIGO" 
          leftIcon={<Icon as={Octicons} name="search" color="black" size="md" />}
          onPress={() => navigate('find')}
        />
      </VStack>

      {
        isLoading 
          ? <Loading />
          : <FlatList
              data={pools}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <PoolCard 
                  data={item} 
                  onPress={() => navigate('details', { id: item.id })}
                />
              )}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => <EmptyPoolList />}
              _contentContainerStyle={{ pb: 20 }}
              px={5}
            />
      }
    </VStack>
  )
}