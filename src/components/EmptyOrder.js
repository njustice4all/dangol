import React from 'react';

const styles = {
  containers: {
    fontSize: '30px',
    textAlign: 'center',
    marginTop: '80px',
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
  <div style={styles.containers}>
    <div style={styles.iconWrapper}>
      <img src="/img/logo-color.svg" style={styles.iconWrapper.img} />
    </div>
    {title}이
    <span style={styles.highlights}> 없어요.</span>
  </div>
);

export default EmptyOrder;
