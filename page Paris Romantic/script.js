document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("trocadero").addEventListener("click", function () {
    // Fetch the information for Trocadéro from Mapbox or another API
    fetch(
      "https://api.mapbox.com/geocoding/v5/mapbox.places/Trocadéro, Paris.json?access_token=pk.eyJ1IjoiYnVraHRhcmV2aWNoLWRldmVsb3BlciIsImEiOiJjbHh5d2NjZmkwNXFzMmpxdTlnaGx4azZqIn0.6Ud1JuiPQM-M1_IzpoLiuQ"
    )
      .then((response) => response.json())
      .then((data) => {
        const placeInfo = data.features[0];
        const placeName = placeInfo.place_name;
        const placeDescription =
          "Описание места, которое можно получить из другого API или базы данных.";
        const coordinates = placeInfo.geometry.coordinates;
        showPopup(placeName, placeDescription, coordinates);
      })
      .catch((error) => console.error("Error fetching data:", error));
  });

  function showPopup(name, description, coordinates) {
    const popup = document.getElementById("popup");
    const popupText = document.getElementById("popup-text");
    const popupDescription = document.getElementById("popup-description");
    const closeBtn = document.getElementsByClassName("close")[0];

    popupText.textContent = name;
    popupDescription.textContent = description;
    popup.style.display = "block";

    mapboxgl.accessToken =
      "pk.eyJ1IjoiYnVraHRhcmV2aWNoLWRldmVsb3BlciIsImEiOiJjbHh5d2NjZmkwNXFzMmpxdTlnaGx4azZqIn0.6Ud1JuiPQM-M1_IzpoLiuQ";
    const map = new mapboxgl.Map({
      container: "popup-map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: coordinates,
      zoom: 15,
    });

    new mapboxgl.Marker().setLngLat(coordinates).addTo(map);

    closeBtn.onclick = function () {
      popup.style.display = "none";
      map.remove();
    };

    window.onclick = function (event) {
      if (event.target == popup) {
        popup.style.display = "none";
        map.remove();
      }
    };
  }
});
