import { defineComponent } from "vue";

export default defineComponent({
  name: "MapExample",
  mounted() {
    const { google } = window;
    let map = document.getElementById("map-canvas");
    const infoWindow = new google.maps.InfoWindow();
    const lat = map!.getAttribute("data-lat");
    const lng = map!.getAttribute("data-lng");
    const myLatlng = new google.maps.LatLng(lat, lng);
    const mapOptions = {
      zoom: 12,
      scrollwheel: false,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        {
          featureType: "administrative",
          elementType: "labels.text.fill",
          stylers: [{ color: "#444444" }],
        },
        {
          featureType: "landscape",
          elementType: "all",
          stylers: [{ color: "#f2f2f2" }],
        },
        {
          featureType: "poi",
          elementType: "all",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "road",
          elementType: "all",
          stylers: [{ saturation: -100 }, { lightness: 45 }],
        },
        {
          featureType: "road.highway",
          elementType: "all",
          stylers: [{ visibility: "simplified" }],
        },
        {
          featureType: "road.arterial",
          elementType: "labels.icon",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "transit",
          elementType: "all",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "water",
          elementType: "all",
          stylers: [{ color: "#5e72e4" }, { visibility: "on" }],
        },
      ],
    };

    map = new google.maps.Map(map, mapOptions);

    const marker = new google.maps.Marker({
      position: myLatlng,
      map,
      animation: google.maps.Animation.DROP,
      title: "Hello World!",
    });

    const contentString =
      '<div class="info-window-content"><h2>Vue Dashboard</h2>' +
      "<p>A beautiful UI Kit and Admin for Tailwind CSS</p></div>";

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    google.maps.event.addListener(marker, "click", () => {
      infowindow.open(map, marker);
    });
    const locationButton = document.createElement("button");
    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");
    // @ts-ignore
    map!.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent("Location found.");
            infoWindow.open(map);
            // @ts-ignore
            map!.setCenter(pos);
          },
          () => {
            // @ts-ignore
            handleLocationError(true, infoWindow, map!.getCenter());
          }
        );
      } else {
        // Browser doesn't support Geolocation
        // @ts-ignore
        handleLocationError(false, infoWindow, map!.getCenter());
      }
    });

    function handleLocationError(
      browserHasGeolocation: boolean,
      // @ts-ignore
      infoWindow: google.maps.InfoWindow,
      // @ts-ignore
      pos: google.maps.LatLng
    ) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(
        browserHasGeolocation
          ? "Error: The Geolocation service failed."
          : "Error: Your browser doesn't support geolocation."
      );
      infoWindow.open(map);
    }
  },
});
