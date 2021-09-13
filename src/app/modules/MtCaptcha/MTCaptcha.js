import React, { useEffect } from 'react'
export const REACT_APP_MT_PUBLIC_KEY = `${process.env.REACT_APP_MT_PUBLIC_KEY}`;

const MTCaptcha = () => {
  useEffect(() => {
    const publicKey = REACT_APP_MT_PUBLIC_KEY;

    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.innerHTML = 'var mtcaptchaConfig = {' + '"sitekey": "'+publicKey+'",' + '"theme": "caribbean",' + '"lang": "es",' + '"autoFormValidate": true' + '};';

    document.body.appendChild(s);

    const mt_service = document.createElement("script");
    mt_service.src = "https://service.mtcaptcha.com/mtcv1/client/mtcaptcha.min.js";
    mt_service.async = true;
    document.body.appendChild(mt_service);

    const mt_service2 = document.createElement("script");
    mt_service2.src = "https://service2.mtcaptcha.com/mtcv1/client/mtcaptcha2.min.js";
    mt_service2.async = true;
    document.body.appendChild(mt_service2);

  }, [])
  return (<div className='mtcaptcha' />)
}

export default MTCaptcha;