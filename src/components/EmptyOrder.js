import React from 'react';

const styles = {
  containers: {
    fontSize: '30px',
    textAlign: 'center',
    marginTop: '25%',
    color: '#505050',
  },
  highlights: {
    color: '#fe931f',
  },
};

const EmptyOrder = ({ title }) => (
  <div style={styles.containers}>
    <span style={styles.highlights}>{title}</span>이 없어요!
  </div>
);

export default EmptyOrder;
