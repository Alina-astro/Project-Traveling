document.addEventListener("DOMContentLoaded", function () {
  const spans = [
    { id: "trocadero", name: "Trocadéro, Paris" },
    { id: "carette", name: "Carette, Paris" },
    { id: "place_trocadero", name: "Place du Trocadéro, Paris" },
    { id: "pont_iena", name: "Pont d'Iéna, Paris" },
    { id: "rue_universite", name: "École élémentaire privée Fidès, Paris" },
    { id: "garden", name: "Champ de Mars, Paris" },
    { id: "mars", name: "Champ de Mars, Paris" },
    { id: "tour_eiffel", name: "Tour Eiffel, Paris" },
    { id: "saint_dominique", name: "Pharmacie du Champs de Mars, Paris" },
    { id: "maison", name: "Hôtel des Invalides, Paris" },
    { id: "bridge", name: "Pont Alexandre III, Paris" },
    { id: "grand_pale", name: "Grand Palais, Paris" },
    { id: "place_concorde", name: "Place de la Concorde, Paris" },
    { id: "jardin", name: "Jardin des Tuileries, Paris" },
    { id: "jardin_champs_elysees", name: "Jardin des Champs-Elysées, Paris" },
    { id: "elysee_palace", name: "Palais de l'Élysée, Paris" },
    { id: "rue_elysee", name: "Rue de l'Élysée, Paris" },
    { id: "galery", name: "Galeries Lafayette, Paris" },
    { id: "arc_triumf", name: "Arc de Triomphe, Paris" },
  ];

  spans.forEach(span => {
    const element = document.getElementById(span.id);
    if (element) {
      element.addEventListener("click", function () {
        fetchPlaceInfo(span.name);
      });
    }
  });

  // Функция для запроса информации о месте с использованием Mapbox API
  function fetchPlaceInfo(placeName) {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        placeName
      )}.json?access_token=pk.eyJ1IjoiYnVraHRhcmV2aWNoLWRldmVsb3BlciIsImEiOiJjbHh5d2NjZmkwNXFzMmpxdTlnaGx4azZqIn0.6Ud1JuiPQM-M1_IzpoLiuQ`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        const placeInfo = data.features[0];
        const placeName = placeInfo.place_name;
        const coordinates = placeInfo.geometry.coordinates;
        showPopup(placeName, coordinates);
      })
      .catch(error => console.error("Error fetching data:", error));
  }

  // Функция для отображения popup
  function showPopup(name, coordinates) {
    const popup = document.getElementById("popup");
    const popupText = document.getElementById("popup-text");
    const popupMap = document.getElementById("popup-map");
    const closeBtn = document.getElementsByClassName("close")[0];

    popupText.textContent = name;
    popup.style.display = "block";

    mapboxgl.accessToken =
      "pk.eyJ1IjoiYnVraHRhcmV2aWNoLWRldmVsb3BlciIsImEiOiJjbHh5d2NjZmkwNXFzMmpxdTlnaGx4azZqIn0.6Ud1JuiPQM-M1_IzpoLiuQ";
    const map = new mapboxgl.Map({
      container: popupMap,
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
