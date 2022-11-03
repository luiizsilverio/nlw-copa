import { Text, Button as ButtonNB, IButtonProps } from 'native-base';

interface Props extends IButtonProps {
  title: string;
  type?: 'PRIMARY' | 'SECONDARY';
}

export function Button({ title, type='PRIMARY', ...rest }: Props) {
  return (
    <ButtonNB 
      w="full"
      h={14}
      rounded="sm"
      fontSize="md"
      textTransform="uppercase"
      bg={type === 'SECONDARY' ? 'red.500' : 'yellow.500'}
      _pressed={{
        bg: type === 'SECONDARY' ? 'red.700' : 'yellow.700'
      }}
      isLoading={false}
      _loading={{
        _spinner: { color: 'black' }
      }}
      {...rest}
    >
      <Text 
        fontSize="sm" 
        fontFamily="heading"
        color={type === 'SECONDARY' ? 'white' : 'black'}
      >
        { title }
      </Text>
    </ButtonNB>
  )
}