initMap();

async function initMap() {
  await ymaps3.ready;

  const { YMap, YMapDefaultSchemeLayer } = ymaps3;

  const map = new YMap(document.getElementById("map"), {
    location: {
      center: [37.588144, 55.733842],
      zoom: 10,
    },
  });

  map.addChild(new YMapDefaultSchemeLayer());
}
fetch(
  "http://api.openweathermap.org/data/2.5/weather?id=2968815&lang=ru&appid=1adb2913bcf2d859d29cdf8f88076f65"
)
  .then(function (resp) {
    return resp.json();
  })
  .then(function (data) {
    document.querySelector(".weather__city").textContent = data.name;
    document.querySelector(".weather__forecast").innerHTML =
      Math.round(data.main.temp - 273) + "&deg;";
    document.querySelector(".weather__desc").textContent =
      data.weather[0]["description"];
    document.querySelector(
      ".weather__icon"
    ).innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]["icon"]}@2x.png">`;
  })
  .catch(function () {});
