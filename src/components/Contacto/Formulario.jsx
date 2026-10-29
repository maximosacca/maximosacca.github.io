import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function Formulario() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_k4t1h9n', 'template_8bqhalk', form.current, {
        publicKey: 'e3ooj7IBqUH4zRKAc',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          e.target.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
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
      
      <button type="submit" className="btn btn-primary form-submit">
        Enviar Mensaje
      </button>
    </form>
  );
}