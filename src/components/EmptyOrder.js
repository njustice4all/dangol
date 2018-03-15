import React from 'react';

const styles = {
  wrapper: {
    // position: 'relative',
    marginTop: '35%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // top: '25%',
    // right: 0,
    // bottom: 0,
    // left: 0,
    // zIndex: '-1',
  },
  containers: {
    fontSize: '30px',
    textAlign: 'center',
    color: '#505050',
  },
  highlights: {
    color: '#fe931f',
  },
  iconWrapper: {
    marginBottom: '45px',
    img: {
      width: '68px',
    },
  },
};

const EmptyOrder = ({ title }) => (
  <div style={styles.wrapper}>
    <div style={styles.containers}>
      <div style={styles.iconWrapper}>
        <img src="/img/logo-color.svg" style={styles.iconWrapper.img} />
      </div>
      {title}이
      <span style={styles.highlights}> 없어요.</span>
    </div>
  </div>
);

export default EmptyOrder;
