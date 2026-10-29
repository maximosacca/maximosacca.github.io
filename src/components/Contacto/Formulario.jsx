import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Arrow from '../Layout/Arrow';

export default function Formulario() {
  const form = useRef();

  const [enviando, setEnviando] = useState(false);
  const [feedback, setFeedback] = useState({ tipo: '', mensaje: '' });

  const sendEmail = (e) => {
    e.preventDefault();

    setEnviando(true);
    setFeedback({ tipo: '', mensaje: '' });
    emailjs
      .sendForm('service_k4t1h9n', 'template_8bqhalk', form.current, {
        publicKey: 'e3ooj7IBqUH4zRKAc',
      })
      .then(
        () => {
          setEnviando(false)
          setFeedback({
            tipo: 'exito',
            mensaje: '¡Mensaje enviado con éxito! Me pondré en contacto con vos en breve',
          });
          e.target.reset();
        },
        (error) => {
          setEnviando(false);
          setFeedback({
            tipo: 'error',
            mensaje: 'Ocurrió un error al enviar el mensaje. Por favor, intenta de nuevo.',
          });
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <section className='contact-section' id='contact'>
      <form ref={form} onSubmit={sendEmail} className="contact-form">
        <div className="form-group">
          <label className="form-label">Nombre</label>
          <input type="text" name="user_name" className="form-input" required />
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input type="email" name="user_email" className="form-input" required />
        </div>

        <div className="form-group">
          <label className="form-label">Mensaje</label>
          <textarea name="message" className="form-input form-textarea" required />
        </div>

        <button type="submit" className="btn btn-primary form-submit" disabled={enviando}>
          {enviando ? 'Enviando...' : 'Enviar Mensaje'}
        </button>
        {feedback.mensaje && (
          <div className={`form-feedback ${feedback.tipo === 'exito' ? 'feedback-success' : 'feedback-error'}`}>
            {feedback.mensaje}
          </div>
        )}
      </form>
      <span className="about-kicker">Aca podes encontrarme</span>
      <Arrow isSecondary/>
    </section>
  );
}