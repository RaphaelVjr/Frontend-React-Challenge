import { useTypewriter, Cursor } from 'react-simple-typewriter';

function TypeWriter() {
  const [text] = useTypewriter({
    words: ['Hi!', 'My name is Raphael Vitorio!', 'That is my project for the apply ',],
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