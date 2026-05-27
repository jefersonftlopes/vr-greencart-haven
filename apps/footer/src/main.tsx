import '@greencart/ui/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Footer from './Footer';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Footer />
  </StrictMode>,
);
