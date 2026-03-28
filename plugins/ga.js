if (process.client && process.env.NODE_ENV === 'prod') {
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-SRS53HF281');
}
