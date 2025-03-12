
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai";
const genAI = new GoogleGenerativeAI("AIzaSyAaFGO4sPh_ZteiSyyrh6NjaXxsvpBy5ZY");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
document.getElementById("chatForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    const userInput = document.getElementById("userInput").value.trim();
    const userInput2 = document.getElementById("userInput2").value.trim();
    let userText = document.createElement("p");
    userText.innerText = `User: ${userInput} to ${userInput2}`;
    let userdiv = document.createElement("div");
    userdiv.appendChild(userText);
    userdiv.style.width = "fit-content";
    userdiv.style.height = "fit-content";
    userdiv.style.background = "black";
    userdiv.style.display = "flex";
    userdiv.style.justifyContent = "center";
    userdiv.style.padding = "5px";
    userdiv.style.borderRadius = "12px";
    userdiv.style.marginTop = "15px";
    document.getElementById("main").append(userdiv);
    const result = await model.generateContent(`I need help finding the best route from my ${userInput} to ${userInput2}. I drive an electric vehicle, so it’s important to include power stations or EV charging points along the way. Could you suggest a route that maximizes efficiency, ensuring there are enough charging stations for a smooth trip? Also, please indicate where I can charge along the route, and estimate the total travel time, including any charging stops and mention some quality cafe to visit near power.`);
    let result2 = result.response.text();
    result2 = result2.replace(/\*\**/g, '');
    let aitext = document.createElement("p");
    aitext.innerText = result2;
    let aidiv = document.createElement("div");
    aidiv.appendChild(aitext);
    aidiv.style.width = "fit-content";
    aidiv.style.height = "fit-content";
    aidiv.style.background = "black";
    aidiv.style.display = "flex";
    aidiv.style.justifyContent = "center";
    aidiv.style.padding = "8px";
    aidiv.style.borderRadius = "12px";
    aidiv.style.marginTop = "15px";
    aidiv.style.marginLeft = "30vh";
    aidiv.style.marginBottom = "14px";
    let mapDiv = document.createElement("div");
    mapDiv.id = "map";
    mapDiv.style.width = "500px";
    mapDiv.style.height = "400px";
    mapDiv.style.marginLeft = "43vh";
    mapDiv.style.marginBottom = "70px";
    mapDiv.style.borderRadius = "30px";
    document.getElementById("main").append(aidiv, mapDiv);
    initMap(userInput, userInput2, mapDiv);
});
src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&libraries=places"
async
function initMap(loc, des, mapDiv) {
    const map = new google.maps.Map(mapDiv, {
        zoom: 10,
        center: { lat: 12.5211, lng: 76.8951 }
    });
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({ map: map });

    directionsService.route({
        origin: `${loc}`,
        destination: `${des}`,
        travelMode: google.maps.TravelMode.DRIVING
    }, (result) => {
        directionsRenderer.setDirections(result);
        const placesService = new google.maps.places.PlacesService(map);
        const routePath = result.routes[0].overview_path;
        const stepSize = Math.max(1, Math.floor(routePath.length / 10));
        for (let i = 0; i < routePath.length; i += stepSize) {
            placesService.nearbySearch({
                location: routePath[i],
                radius: 2000,
                keyword: "electric vehicle charging station"
            }, (places) => {
                places.forEach(place => {
                    new google.maps.Marker({
                        position: place.geometry.location,
                        map: map,
                        title: place.name,
                        icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                    });
                });
            });
            placesService.nearbySearch({
                location: routePath[i],
                radius: 500,
                keyword: "cafe"
            }, (places) => {
                places.forEach(place => {
                    new google.maps.Marker({
                        position: place.geometry.location,
                        map: map,
                        title: place.name,
                        icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                    });
                });
            });
        }
    });
    document.getElementById("userInput").value = "";
    document.getElementById("userInput2").value = "";
}
let a = Math.floor(Math.random() * 101)
let battery = document.getElementById("battery")
para = document.createElement("p")
para.innerText = `${a}%`;
battery.appendChild(para)
console.log(a)
if (a < 20) {
    alert("⚠️ Warning: Battery level is below 20%! Please charge your EV soon.")
}
if (a < 40) {
    alert("🔋 Battery level is below 40%. Consider charging soon to avoid low power.")
}