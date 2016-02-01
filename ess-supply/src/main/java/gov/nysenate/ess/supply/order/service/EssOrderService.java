package gov.nysenate.ess.supply.order.service;

import com.google.common.collect.Range;
import gov.nysenate.ess.core.model.personnel.Employee;
import gov.nysenate.ess.core.model.unit.Location;
import gov.nysenate.ess.core.service.personnel.EmployeeInfoService;
import gov.nysenate.ess.core.util.LimitOffset;
import gov.nysenate.ess.supply.item.LineItem;
import gov.nysenate.ess.supply.order.Order;
import gov.nysenate.ess.supply.order.OrderStatus;
import gov.nysenate.ess.supply.order.dao.OrderDao;
import gov.nysenate.ess.supply.sfms.SfmsOrder;
import gov.nysenate.ess.supply.sfms.dao.SfmsOrderDao;
import gov.nysenate.ess.supply.order.exception.WrongOrderStatusException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.EnumSet;
import java.util.List;
import java.util.Set;

@Service
public class EssOrderService implements OrderService {

    @Autowired
    private OrderDao orderDao;

    @Autowired
    private SfmsOrderDao sfmsDao;

    @Autowired
    private EmployeeInfoService employeeInfoService;

    @Override
    public Order getOrderById(int orderId) {
        return orderDao.getOrderById(orderId);
    }

    @Override
    public List<Order> getOrders(EnumSet<OrderStatus> statuses, Range<LocalDate> dateRange, LimitOffset limOff) {
        return getOrders("all", "all", "all", statuses, dateRange, limOff);
    }

    @Override
    public List<Order> getOrders(String locCode, String locType, String issuerEmpId, EnumSet<OrderStatus> statuses,
                                    Range<LocalDate> dateRange, LimitOffset limOff) {
        return orderDao.getOrders(locCode, locType, issuerEmpId, statuses, dateRange, limOff);
    }

    @Override
    public List<SfmsOrder> getSfmsOrders(Range<LocalDate> dateRange, LimitOffset limOff) {
        return getSfmsOrders("all", "all", "all", dateRange, limOff);
    }

    @Override
    public List<SfmsOrder> getSfmsOrders(String locCode, String locType, String issueEmpName, Range<LocalDate> dateRange, LimitOffset limOff) {
        return sfmsDao.getOrders(locCode, locType, issueEmpName, dateRange, limOff);
    }

    @Override
    public synchronized Order submitOrder(Set<LineItem> lineItems, int empId) {
        Employee customer = employeeInfoService.getEmployee(empId);
        Location location = customer.getWorkLocation();
        Order order = new Order.Builder(orderDao.getUniqueId(), customer, LocalDateTime.now(), location, OrderStatus.PENDING)
                .lineItems(lineItems).build();
        saveOrder(order);
        return order;
    }

    @Override
    public Order processOrder(int orderId, int issuingEmpId) {
        Employee issuingEmployee = employeeInfoService.getEmployee(issuingEmpId);
        Order order = orderDao.getOrderById(orderId);
        if (order.getStatus() != OrderStatus.PENDING) {
            throw new WrongOrderStatusException("Can only process orders with status of " + OrderStatus.PENDING +
                                                ". Tried to process order with status of " + order.getStatus().toString());
        }
        order = order.setIssuingEmployee(issuingEmployee);
        order = order.setStatus(OrderStatus.PROCESSING);
        order = order.setProcessedDateTime(LocalDateTime.now());
        saveOrder(order);
        return order;
    }

    @Override
    public Order completeOrder(int orderId) {
        Order order = orderDao.getOrderById(orderId);
        if (order.getStatus() != OrderStatus.PROCESSING) {
            throw new WrongOrderStatusException("Can only complete orders with status of " + OrderStatus.PROCESSING +
                                                ". Tried to complete order with status of " + order.getStatus().toString());
        }
        order = order.setStatus(OrderStatus.COMPLETED);
        order = order.setCompletedDateTime(LocalDateTime.now());
        // TODO: both these saves should be in same transaction.
        saveOrder(order);
        sfmsDao.saveOrder(order);
        return order;
    }

    // TODO: are we keeping this functionality?
    @Override
    public Order undoCompletion(int id) {
        Order order = orderDao.getOrderById(id);
        orderDao.undoCompletion(order);
//        sfmsDao.undoCompletion(order);
        order = order.setStatus(OrderStatus.PROCESSING);
        order = order.setCompletedDateTime(null);
        saveOrder(order);
        return order;
    }

    @Override
    public Order rejectOrder(int orderId) {
        Order order = orderDao.getOrderById(orderId);
        if (!statusIsPendingOrProcessing(order)) {
            throw new WrongOrderStatusException("Can only reject orders with status of " + OrderStatus.PENDING +
                                                ". Tried to reject order with status of " + order.getStatus().toString());
        }
        order = order.setStatus(OrderStatus.REJECTED);
        saveOrder(order);
        return order;
    }

    @Override
    public Order updateOrderLineItems(int id, Set<LineItem> newLineItems) {
        Order original = orderDao.getOrderById(id);
        Order updated = original.setLineItems(newLineItems);
        saveOrder(updated);
        return updated;
    }

    /**
     * Persist the order to the database.
     */
    private void saveOrder(Order order) {
        orderDao.saveOrder(order);
    }

    private boolean statusIsPendingOrProcessing(Order order) {
        return order.getStatus() == OrderStatus.PENDING || order.getStatus() == OrderStatus.PROCESSING;
    }
}
