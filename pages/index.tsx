import ImageCarousel from '../components/imagecarousel';
import styles from '../styles/Home.module.css';


const images = [
  { id: 1, url: '/plantas1.jpg', alt: 'Planta 1' },
  { id: 2, url: '/plantas2.jpeg', alt: 'Planta 2' },
  { id: 3, url: '/plantas3.jpg', alt: 'Planta 3' },
  { id: 4, url: '/plantas4.jpg', alt: 'Planta 4' },
];

export default function Home() {
  return (
    <div className={styles.container}>
      <h2>Sistema de gestión para el proyecto Generación Sustentable</h2>
      <br />
      <ImageCarousel images={images} />
      {/* <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style> */}
    </div>
  );
}
