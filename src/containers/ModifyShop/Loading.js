import React from 'react';

const Loading = () => {
  return (
    <div style={styles.wrapper}>
      {/*<img src="/img/oval.svg" alt="" style={styles.icon} />*/}
      <h1>Loading</h1>
    </div>
  );
};

export default Loading;

const styles = {
  wrapper: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: '#34363d',
    opacity: '0.8',
    zIndex: '1',
  },
  icon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
  },
};
