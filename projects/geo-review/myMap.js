export default class MyMap {
  constructor(el, onClick) {
    this.el = el;
    this.onClick = onClick;
  }

  async init() {
    await this.createMapScript();
    await this.loadYMaps();
    this.initMap();
  }

  createMapScript() {
    return new Promise((resolve) => {
      const mapScript = document.createElement('script');
      mapScript.src =
        'https://api-maps.yandex.ru/2.1?apikey=9384fc18-05eb-426e-a375-37270613a479&lang=RU_ru';
      document.body.appendChild(mapScript);
      mapScript.addEventListener('load', resolve);
    });
  }

  loadYMaps() {
    return new Promise((resolve) => ymaps.ready(resolve));
  }

  initMap() {
    this.clusterer = new ymaps.Clusterer({
      groupByCoordinates: true,
      clusterDisableClickZoom: true,
      clusterOpenBalloonOnClick: false,
    });
    this.clusterer.events.add('click', (e) => {
      const coords = e.get('target').geometry.getCoordinates();
      this.onClick(coords);
    });
    this.map = new ymaps.Map(this.el, {
      center: [55.76, 37.64],
      zoom: 10,
    });
    this.map.events.add('click', (e) => this.onClick(e.get('coords')));
    this.map.geoObjects.add(this.clusterer);
  }

  openBalloon(coords, content) {
    this.map.balloon.open(coords, content);
  }

  setBalloonContent(content) {
    this.map.balloon.setData(content);
  }

  closeBalloon() {
    this.map.balloon.close();
  }

  createPlacemark(coords) {
    const placemark = new ymaps.Placemark(coords);
    placemark.events.add('click', (e) => {
      const coords = e.get('target').geometry.getCoordinates();
      this.onClick(coords);
    });
    this.clusterer.add(placemark);
  }
}
