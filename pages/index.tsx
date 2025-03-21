import styles from '../styles/Home.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageCarousel from '../components/imagencarousel';


const images = [
  { id: 1, url: '/foto1.jpeg', alt: 'Foto 1' },
  { id: 2, url: '/foto2.jpeg', alt: 'Foto 2' },
  { id: 3, url: '/foto3.jpeg', alt: 'Foto 3' },
  { id: 4, url: '/foto4.jpeg', alt: 'Foto 4' }
];

export default function Home() {
  return (
    <div className={styles.container}>
      <h2>Sistema de gestión de indicadores para el proyecto Generación Sustentable</h2>
      <br />
      <br />
      <br />
      <ImageCarousel images={images} />
      
      <div className={styles.infoSection}>
        <h3>Acerca del proyecto</h3>
        <p>
          El proyecto Generación Sustentable busca promover prácticas sostenibles y 
          fortalecer el desarrollo comunitario a través de iniciativas 
          medioambientales y sociales en diversas localidades.
        </p>
        
        <div className={styles.statsContainer}>
          <div className={styles.statCard}>
            <h4>Iniciativas</h4>
            <div className={styles.statNumber}>25+</div>
            <p>Actividades realizadas en comunidades</p>
          </div>
          
          <div className={styles.statCard}>
            <h4>Participantes</h4>
            <div className={styles.statNumber}>500+</div>
            <p>Personas beneficiadas por el programa</p>
          </div>
          
          <div className={styles.statCard}>
            <h4>Localidades</h4>
            <div className={styles.statNumber}>12</div>
            <p>Zonas impactadas positivamente</p>
          </div>
        </div>
      </div>
    </div>
  );
}
