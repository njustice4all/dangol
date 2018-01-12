// @flow

export type Coords = {
  distance: number,
  duration: number,
};

const SHOP = {
  lat: 37.503854,
  lng: 127.055077,
};

export default (lat1: number, lng1: number, lat2: number, lng2: number): Coords => {
  const toRad = (rad: number): number => {
    return rad * Math.PI / 180;
  };

  const R = 6371; // km
  const SPEED = 30; // 배달오토바이의 평균속도 30km로 계산

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  const distance = parseFloat(d.toFixed(1));
  const duration = Math.ceil(distance / SPEED * 60) + 4; // 분으로 올림 계산하고 4분정도 추가함

  return { distance, duration };
};
