document.addEventListener('DOMContentLoaded', function() {
    
    let currentMarker = null; 
  
    const places = document.querySelectorAll('.main__way_medieval');
  
    places.forEach(place => {
      place.addEventListener('click', function() {
        const coords = this.getAttribute('data-coords').split(',');
        const name = this.getAttribute('data-name');
        const info = this.getAttribute('data-info');
  
        
        openModal(coords, name, info);
      });
    });
  
    function openModal(coords, name, info) {
     
      const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: parseFloat(coords[0]), lng: parseFloat(coords[1]) },
        zoom: 15
      });
  
     
      if (currentMarker) {
        currentMarker.setMap(null);
      }
  
    
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
  
    
      const modal = document.getElementById('myModal');
      modal.style.display = 'block';
  
      const closeButton = document.getElementsByClassName('close')[0];
      closeButton.onclick = function() {
        modal.style.display = 'none';
        map.setZoom(0);
        map.setCenter({ lat: 0, lng: 0 });
        if (currentMarker) {
          currentMarker.setMap(null);
          currentMarker = null;
        }
      };
    }
  });
  