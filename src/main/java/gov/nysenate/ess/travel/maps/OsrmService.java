package gov.nysenate.ess.travel.maps;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import gov.nysenate.ess.core.model.unit.Address;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class OsrmService implements MapInterface {

    @Override
    public TripDistance getTripDistance(List<Address> tripRoute) {
        TripDistance tripDistance = new TripDistance();

        List<String> tripRouteCoordinates = addressesToCoordinates(tripRoute);

        RestTemplate restTemplate = new RestTemplate();
        String url = "http://router.project-osrm.org/route/v1/driving/";
        for (int i = 0; i < tripRouteCoordinates.size(); i++) {
            url += tripRouteCoordinates.get(i);
            if (i < tripRouteCoordinates.size()-1) {
                url += ";";
            }
        }
        url += "?overview=false";
        try {
            String resp = restTemplate.getForObject(url, String.class);
            JsonParser parser = new JsonParser();
            JsonObject jsonObject = parser.parse(resp).getAsJsonObject();

            // returns distance in meters
            // divide by 1609.344 to get miles
            double totalDist = jsonObject.get("routes").getAsJsonArray().get(0).getAsJsonObject().get("distance").getAsDouble() / 1609.344;
            tripDistance.setTripDistanceTotal(totalDist);

            // get distance between last destination and the trip origin
            JsonArray legs = jsonObject.get("routes").getAsJsonArray().get(0).getAsJsonObject().get("legs").getAsJsonArray();
            double distOut = totalDist - legs.get(legs.size()-1).getAsJsonObject().get("distance").getAsDouble() / 1609.344;
            tripDistance.setTripDistanceOut(distOut);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return tripDistance;
    }

    private List<String> addressesToCoordinates(List<Address> addresses) {
        RestTemplate restTemplate = new RestTemplate();
        ArrayList<String> coordinates = new ArrayList<>();
        for (Address address: addresses) {
            String url = "https://pubgeo.nysenate.gov/api/v2/geo/geocode?";
            url += "addr1=" + address.getAddr1();
            url += "&city=" + address.getCity();
            url += "&state=" + address.getState();

            String lngLat = "";

            try {
                String resp = restTemplate.getForObject(url, String.class);
                JsonParser parser = new JsonParser();
                JsonObject jsonObject = parser.parse(resp).getAsJsonObject().get("geocode").getAsJsonObject();
                String lng = jsonObject.get("lon").getAsString();
                String lat = jsonObject.get("lat").getAsString();
                lngLat = lng + "," + lat;
            } catch (Exception e) {
                e.printStackTrace();
            }
            coordinates.add(lngLat);
        }
        return coordinates;
    }
}