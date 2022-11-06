import { Row, Text, Pressable } from 'native-base';
import { useNavigation } from '@react-navigation/native';

export function EmptyPoolList() {
  const { navigate } = useNavigation();

  return (
    <Row flexWrap="wrap" justifyContent="center">
      <Text color="white" fontSize="sm" textAlign="center">
        Você ainda não está participando de {'\n'} nenhum bolão, que tal
      </Text>

      <Pressable>
          <Text 
            textDecorationLine="underline" 
            color="yellow.500" 
            textDecoration="underline"
            onPress={() => navigate('find')}
          >
            buscar um por código
          </Text>
      </Pressable>

      <Text color="white" fontSize="sm" textAlign="center" mx={1}>
        ou
      </Text>

      <Pressable>
        <Text 
          textDecorationLine="underline"
          color="yellow.500"
          onPress={() => navigate('new')}
        >
          criar um novo
        </Text>
      </Pressable>

      <Text color="white" fontSize="sm" textAlign="center">
        ?
      </Text>
    </Row>
  );
}