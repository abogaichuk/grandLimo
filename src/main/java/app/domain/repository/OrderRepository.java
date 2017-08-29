package app.domain.repository;

import app.domain.entity.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OrderRepository extends MongoRepository<Order, String> {
    //List<Order> findByPlace(Order.Place place);
}
