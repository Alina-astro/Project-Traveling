let map;
let currentMarker = null;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 48.8566, lng: 2.3522 },
        zoom: 13
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const locations = document.querySelectorAll('.location');

    locations.forEach(location => {
        location.addEventListener('click', function() {
            const coords = this.getAttribute('data-coords').split(',');
            const name = this.getAttribute('data-name');
            const info = this.getAttribute('data-info');

            openModal(coords, name, info);
        });
    });

    function openModal(coords, name, info) {
        if (!map) {
            initMap();
        }

        if (currentMarker) {
            currentMarker.setMap(null);
        }

        const zoomLevel = 15; // Зум для места, на которое пользователь нажал

        const marker = new google.maps.Marker({
            position: { lat: parseFloat(coords[0]), lng: parseFloat(coords[1]) },
            map: map,
            title: name
        });

        const infowindow = new google.maps.InfoWindow({
            content: `<div><h3>${name}</h3><p>${info}</p></div>`
        });

        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });

        currentMarker = marker;

        // Установка центра карты и зума на место, на которое пользователь нажал
        map.setCenter({ lat: parseFloat(coords[0]), lng: parseFloat(coords[1]) });
        map.setZoom(zoomLevel);

        const modal = document.getElementById('myModal');
        modal.style.display = 'block';

        const closeButton = document.getElementsByClassName('close')[0];
        closeButton.onclick = function() {
            modal.style.display = 'none';
            map.setZoom(13); // Возвращаем исходный зум
            map.setCenter({ lat: 48.8566, lng: 2.3522 }); // Возвращаем исходный центр карты
            if (currentMarker) {
                currentMarker.setMap(null);
                currentMarker = null;
            }
        };
    }
});


