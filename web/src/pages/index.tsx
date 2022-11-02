import { FormEvent, useState } from 'react';
import Image from 'next/image';
import appPreviewImg from '../assets/app-nlw-copa.png';
import logoImg from '../assets/logo.svg';
import avatarImg from '../assets/avatares.png';
import iconCheckImg from '../assets/icon-check.svg';
import { api } from '../lib/axios';

interface HomeProps {
  poolCount: number,
  guessCount: number,
  userCount: number,
}

export default function Home({poolCount, guessCount, userCount}: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('');

  async function createPool(ev: FormEvent) {
    ev.preventDefault();

    try {
      const response = await api.post('/pools', {
        title: poolTitle
      })

      const { code } = response.data;
      
      await navigator.clipboard.writeText(code);

      setPoolTitle('');
      poolCount ++;
      alert('Bolão criado com sucesso, o código foi copiado para a área de transferência!');
    } 
    catch (err) {
      console.warn(err);
      alert('Falha ao criar o bolão, tente novamente')
    }
  }

  return (
    <div className={`
      max-w-[1124px] mx-auto h-screen grid grid-cols-2 gap-28 items-center
    `}>
      <main>
        <Image src={logoImg} alt="NLW-Copa" />

        <h1 className='mt-14 text-5xl font-bold leading-tight'>
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className='mt-10 flex items-center gap-2'>
          <Image src={avatarImg} alt="Avatares" />
          <strong className='text-gray-100 text-xl'>
            <span className='text-ignite-500'>+{userCount} </span> 
            pessoas já estão usando
          </strong>
        </div>

        <form onSubmit={createPool} className='mt-10 flex gap-2'>
          <input 
            type="text" 
            required 
            placeholder='Qual o nome do seu bolão?' 
            value={poolTitle}
            onChange={ev => setPoolTitle(ev.target.value)}
            className={`
              flex-1 px-6 py-4 rounded text-sm text-gray-100
              bg-gray-800 border border-gray-600
            `}
          />
          <button 
            type="submit"
            className={`
              bg-yellow-500 px-6 py-4 rounded text-gray-900
              font-bold text-sm uppercase hover:bg-yellow-700
            `}
          >
            Criar meu bolão
          </button>
        </form>

        <p className='mt-4 text-sm text-gray-300 leading-relaxed'>
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
        </p>

        <div className={`
          mt-10 pt-10 border-t border-gray-600 text-gray-100 
          flex justify-between items-center
        `}>
          <div className='flex items-center gap-6'>
            <Image src={iconCheckImg} alt="" />
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{poolCount} </span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className='w-px h-14 bg-gray-600'></div>

          <div className='flex items-center gap-6'>
            <Image src={iconCheckImg} alt="" />
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{guessCount} </span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>        
      </main>

      <Image src={appPreviewImg} alt="Banner" quality={100} />
    </div>
  )
}

export const getServerSideProps = async () => {

  const [poolResponse, guessResponse, userResponse] = await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count'),
    api.get('users/count'),
  ])

  return {
    props: {
      poolCount: poolResponse.data.count,
      guessCount: guessResponse.data.count,
      userCount: userResponse.data.count,
    }
  }
}