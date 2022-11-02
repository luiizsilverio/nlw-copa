import Image from 'next/image';
import appPreviewImg from '../assets/app-nlw-copa.png';
import logoImg from '../assets/logo.svg';
import avatarImg from '../assets/avatares.png';
import iconCheckImg from '../assets/icon-check.svg';

interface HomeProps {
  count: number
}

export default function Home() {
  return (
    <div>
      <main>
        <Image src={logoImg} alt="NLW-Copa" />
        <h1>Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>
        <div>
          <Image src={avatarImg} alt="Avatares" />
          <strong>
            <span>+12.592</span> pessoas já estão usando
          </strong>
        </div>

        <form>
          <input type="text" required placeholder='Qual o nome do seu bolão?' />
          <button type="submit">Criar meu bolão</button>
          <p>Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀</p>
        </form>

        <div>
          <div>
            <Image src={iconCheckImg} alt="" />
            <div>
              <span>+2.834 </span>
              <span>Bolões criados</span>
            </div>
          </div>
          <div>
            <Image src={iconCheckImg} alt="" />
            <div>
              <span>+192.847 </span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>        
      </main>

      <Image src={appPreviewImg} alt="Banner" quality={100} />
    </div>
  )
}

// export const getServerSideProps = async () => {
//   const response = await fetch('http://localhost:3333/pools/count');
//   const data = await response.json();

//   return {
//     props: {
//       count: data.count,
//     }
//   }
// }