package app.domain.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.time.LocalDate;

@Data
public class Order {

    public enum Place {
        CHICAGO, OHARE, MIDWAY;
        @JsonCreator
        public static Place fromtext(String text) {
            switch (text) {
                case "Chicago":
                    return CHICAGO;
                case "O'Hare":
                    return OHARE;
                case "Midway":
                    return MIDWAY;
                default:
                    return null;
            }
        }
    }

    @Id
    private String id;
    private String vehicle;
    private Place place;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate date;
    private boolean depart;
    private String airline, flightNumber, phoneNumber, company;
}
