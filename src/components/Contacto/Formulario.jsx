import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Arrow from '../Layout/Arrow';

export default function Formulario() {
  const form = useRef();

  const [enviando, setEnviando] = useState(false);
  const [feedback, setFeedback] = useState({ tipo: '', mensaje: '' });

  const sendEmail = (e) => {
    e.preventDefault();

    if (enviando) return;

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
          form.current?.reset();
        },
        (error) => {
          setEnviando(false);
          setFeedback({
            tipo: 'error',
            mensaje: 'Ocurrió un error al enviar el mensaje. Por favor, intenta de nuevo.',
          });
          console.error('Error al enviar el formulario:', error);
        },
      );
  };

  return (
    <section className='contact-section' id='contact'>
      <form
        ref={form}
        onSubmit={sendEmail}
        className="contact-form"
        aria-describedby={feedback.mensaje ? 'contacto-feedback' : undefined}
      >
        <div className="form-group">
          <label className="form-label" htmlFor="contacto-nombre">Nombre</label>
          <input
            id="contacto-nombre"
            type="text"
            name="user_name"
            className="form-input"
            autoComplete="name"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="contacto-email">Email</label>
          <input
            id="contacto-email"
            type="email"
            name="user_email"
            className="form-input"
            autoComplete="email"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="contacto-mensaje">Mensaje</label>
          <textarea
            id="contacto-mensaje"
            name="message"
            className="form-input form-textarea"
            autoComplete="off"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary form-submit" disabled={enviando}>
          {enviando ? 'Enviando...' : 'Enviar Mensaje'}
        </button>
        {feedback.mensaje && (
          <div
            id="contacto-feedback"
            className={`form-feedback ${feedback.tipo === 'exito' ? 'feedback-success' : 'feedback-error'}`}
            role={feedback.tipo === 'error' ? 'alert' : 'status'}
            aria-live="polite"
          >
            {feedback.mensaje}
          </div>
        )}
      </form>
      <span className="about-kicker">Aca podes encontrarme</span>
      <Arrow isSecondary/>
    </section>
  );
}
