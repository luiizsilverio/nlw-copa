import { useState } from "react";
import { Heading, useToast, VStack } from "native-base";
import { useNavigation } from '@react-navigation/native';

import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/button";
import { api } from "../services/api";

export function Find() {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState('');
  const { navigate } = useNavigation();
  const toast = useToast();

  async function handleFind() {
    try {
      setIsLoading(true);

      if (!code.trim()) {
        return toast.show({
          title: 'Informe o código do bolão',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      const response = await api.post('/pools/join', { code });

      toast.show({
        title: 'Você entrou no bolão com sucesso',
        placement: 'top',
        bgColor: 'green.500'
      })

      setIsLoading(false);
      setCode('');
      navigate('pools');
    }
    catch (error) {
      console.warn(error);
      setIsLoading(false);
      toast.show({
        title: error.response?.data?.message || 'Não foi possível buscar o bolão',
        placement: 'top',
        bgColor: 'red.500'
      })
    }    
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton />
      <VStack mt={8} mx={5} alignItems="center">

        <Heading fontFamily="heading" color="white" fontSize="xl" mb={8} textAlign="center">
          Encontre um bolão através de {'\n'}
          seu código único
        </Heading>

        <Input
          mb={2}
          placeholder="Qual o código do bolão?"
          onChangeText={setCode}
          autoCapitalize="characters"
        />

        <Button
          title="BUSCAR BOLÃO"
          isLoading={isLoading}
          onPress={handleFind}
        />
        
      </VStack>
    </VStack>
  )
}