const KEY = 'AIzaSyB9Nbz49ELlVYNq9XcU837h4Yy1ixGgxWQ';

export default info =>
  fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${
      info.address
    }&language=ko&location_type=ROOFTOP&key=${KEY}`
  );
