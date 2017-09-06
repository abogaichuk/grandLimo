package app.api;

import app.domain.entity.Order;
import app.domain.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.*;

//@CrossOrigin
@RestController
public class ReservationCtrl {

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping(value = "/api/orders")
    public ResponseEntity<List<Order>> orders() {
        List<Order> all = orderRepository.findAll();
        return new ResponseEntity<>(all, OK);
    }

    @GetMapping("/api/orders/{id}")
    public ResponseEntity<Order> orderById(@PathVariable String id) {
        return new ResponseEntity<>(orderRepository.findOne(id), OK);
    }

    @PostMapping(value = "/api/orders")
    public ResponseEntity<Order> save(@RequestBody Order order) {
        return new ResponseEntity<>(orderRepository.save(order), CREATED);
    }

    @DeleteMapping("/api/orders/{id}")
    public ResponseEntity delete(@PathVariable String id) {
        orderRepository.delete(id);
        return new ResponseEntity(NO_CONTENT);
    }
}
