import { useTypewriter, Cursor } from 'react-simple-typewriter';

function TypeWriter() {
  const [text] = useTypewriter({
    words: ['Hi, my name is Raphael Vitorio!', 'And im applying for this role as a Fullstack Developer.',],
    loop: {},
    typeSpeed: 50,

  })


  return (
    <div className='type-writer'>
      <span style={{ fontWeight: '700', color: '#015ABA', fontSize: '32px' }}>{text}</span>
      <span style={{ color: 'grey', fontSize: '48px' }}>
        <Cursor cursorStyle='_' />
      </span>
    </div>
  )
}

export default TypeWriter;