package app.api;

import app.domain.Weather;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.mashape.unirest.http.ObjectMapper;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@CrossOrigin
@RestController
public class HeadFirstHtml5Ctrl {

    private String YANDEX_URI = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22chicago%2C%20il%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";

    @GetMapping("/api/sales")
    public ResponseEntity<String> getSales() {
        return new ResponseEntity<>("[{\"name\":\"ARTESIA\",\"time\":1308774240669,\"sales\":8},{\"name\":\"LOS ANGELES\",\"time\":1308774240669,\"sales\":2},{\"name\":\"PASADENA\",\"time\":1308774240669,\"sales\":8},{\"name\":\"STOCKTON\",\"time\":1308774240669,\"sales\":2},{\"name\":\"FRESNO\",\"time\":1308774240669,\"sales\":2},{\"name\":\"SPRING VALLEY\",\"time\":1308774240669,\"sales\":9},{\"name\":\"ELVERTA\",\"time\":1308774240669,\"sales\":5},{\"name\":\"SACRAMENTO\",\"time\":1308774240669,\"sales\":7},{\"name\":\"SAN MATEO\",\"time\":1308774240669,\"sales\":1}]\n", HttpStatus.OK);
    }

    @GetMapping("/api/dog3")
    public ResponseEntity<String> getJsonP() {
        return new ResponseEntity<>("var animal = { \"type\": \"dog\", \"sound\": \"woof\" };\n" +
                "animalSays(animal);", HttpStatus.OK);
    }

    @GetMapping("/api/weather")
    public ResponseEntity<String> getWeather() {
        try {
            Weather weather = Unirest.get(YANDEX_URI).asObject(Weather.class).getBody();
            System.out.println("result: " + weather.toString());
            return new ResponseEntity<>(weather.toString(), HttpStatus.OK);
        } catch (UnirestException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_ACCEPTABLE);
        }
    }

    static {
        // Only one time
        Unirest.setObjectMapper(new ObjectMapper() {
            private com.fasterxml.jackson.databind.ObjectMapper jacksonObjectMapper
                    = new com.fasterxml.jackson.databind.ObjectMapper();

            public <T> T readValue(String value, Class<T> valueType) {
                try {
                    return jacksonObjectMapper.readValue(value, valueType);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }

            public String writeValue(Object value) {
                try {
                    return jacksonObjectMapper.writeValueAsString(value);
                } catch (JsonProcessingException e) {
                    throw new RuntimeException(e);
                }
            }
        });

    }

}
