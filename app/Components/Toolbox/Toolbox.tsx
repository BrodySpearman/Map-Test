import React from 'react';
import styles from './Toolbox.module.css';

export default function Toolbox() {
  return (
    <div className={styles.toolbox}>
        <div className={styles.toolItem}>
            <button>Tool 1</button>
        </div>
        <div className={styles.toolItem}>
            <button>Tool 2</button>
        </div>
    </div>
  );
}