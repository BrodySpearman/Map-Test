import { Coordinate } from 'ol/coordinate';
import styles from './LocModal.module.css';

export default function LocModal({ coordinates }: { coordinates: Coordinate }) { 
    return (
        <div className={styles.modal}>
            <h2 className={styles.title}>You are at:</h2>
            <p className={styles.lat}>Longitude: {coordinates[0].toFixed(6)}</p>
            <p className={styles.lon}>Latitude: {coordinates[1].toFixed(6)}</p>
        </div>
    );
}