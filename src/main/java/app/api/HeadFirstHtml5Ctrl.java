package app.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class HeadFirstHtml5Ctrl {

    @GetMapping("/sales")
    public ResponseEntity<String> getSales() {
        return new ResponseEntity<>("[{\"name\":\"ARTESIA\",\"time\":1308774240669,\"sales\":8},{\"name\":\"LOS ANGELES\",\"time\":1308774240669,\"sales\":2},{\"name\":\"PASADENA\",\"time\":1308774240669,\"sales\":8},{\"name\":\"STOCKTON\",\"time\":1308774240669,\"sales\":2},{\"name\":\"FRESNO\",\"time\":1308774240669,\"sales\":2},{\"name\":\"SPRING VALLEY\",\"time\":1308774240669,\"sales\":9},{\"name\":\"ELVERTA\",\"time\":1308774240669,\"sales\":5},{\"name\":\"SACRAMENTO\",\"time\":1308774240669,\"sales\":7},{\"name\":\"SAN MATEO\",\"time\":1308774240669,\"sales\":1}]\n", HttpStatus.OK);
    }

    @GetMapping("/dog3")
    public ResponseEntity<String> getJsonP() {
        return new ResponseEntity<>("var animal = { \"type\": \"dog\", \"sound\": \"woof\" };\n" +
                "animalSays(animal);", HttpStatus.OK);
    }

}
