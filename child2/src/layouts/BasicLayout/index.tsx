import styles from './index.module.css';

export default (props) => {
  return (
    <div className="icestark-child-app">
      <h3 className={styles.title}>微应用 child2</h3>
      {props.children}
    </div>
  );
};
