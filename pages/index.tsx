import styles from '../styles/Home.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageCarousel from '../components/imagencarousel';


const images = [
  { id: 1, url: '/foto1.jpeg', alt: 'Foto 1' },
  { id: 2, url: '/foto2.jpeg', alt: 'Foto 2' },
  { id: 3, url: '/foto3.jpeg', alt: 'Foto 3' },
  { id: 4, url: '/foto4.jpeg', alt: 'Foto 4' },
];

export default function Home() {
  return (
    <div className={styles.container}>
      <h2>Sistema de gestión de indicadores para el proyecto Generación Sustentable</h2>
      <br />
      <ImageCarousel images={images} />
      <style jsx>{`
      .slick-slide {
        width: calc(100% + 1px);
      }
      `
      }
      </style>
    </div>
  );
}
