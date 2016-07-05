package gov.nysenate.ess.supply.permission;

import com.google.common.collect.ImmutableList;
import gov.nysenate.ess.core.model.permission.EssRole;
import gov.nysenate.ess.core.model.personnel.Employee;
import gov.nysenate.ess.core.model.unit.Location;
import gov.nysenate.ess.core.service.permission.PermissionFactory;
import gov.nysenate.ess.core.service.unit.LocationService;
import org.apache.shiro.authz.Permission;
import org.apache.shiro.authz.permission.WildcardPermission;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Component
public class SupplyPermissionFactory implements PermissionFactory {

    @Autowired private LocationService locationService;

    @Override
    public ImmutableList<Permission> getPermissions(Employee employee, ImmutableList<EssRole> roles) {
        Location location = locationService.getLocation(employee.getWorkLocation().getLocId());
        List<Permission> permissions = new ArrayList<>();
        for (EssRole role : roles) {
            permissions.addAll(permissionsForRole(employee, location, role));
        }
        return ImmutableList.copyOf(permissions);
    }

    private Collection<Permission> permissionsForRole(Employee employee, Location location, EssRole role) {
        List<Permission> permissions = new ArrayList<>();
        if (role == EssRole.SENATE_EMPLOYEE) {
            permissions.addAll(senateEmployeePermissions(employee, location));
        }
        if (role == EssRole.SUPPLY_EMPLOYEE) {
            permissions.addAll(supplyEmployeePermissions());
        }
        if (role == EssRole.SUPPLY_MANAGER) {
            permissions.addAll(supplyManagerPermissions());
        }
        return permissions;
    }

    /**
     * Senate employees have permissions to view their own orders and orders from their work location.
     */
    private Collection<Permission> senateEmployeePermissions(Employee employee, Location location) {
        List<Permission> permissions = new ArrayList<>();
        permissions.add(new WildcardPermission("supply:order:view:" + String.valueOf(employee.getEmployeeId())));
        permissions.add(new WildcardPermission("supply:order:view:" + location.getLocId().toString()));
        return permissions;
    }

    private Collection<Permission> supplyEmployeePermissions() {
        List<Permission> permissions = new ArrayList<>();
        permissions.add(new WildcardPermission("supply:order:view"));
        permissions.add(new WildcardPermission("supply:order:edit"));
        permissions.add(new WildcardPermission("supply:shipment:manage"));
        permissions.add(new WildcardPermission("supply:shipment:view"));
        permissions.add(new WildcardPermission("supply:shipment:edit"));
        permissions.add(new WildcardPermission("supply:shipment:process"));
        permissions.add(new WildcardPermission("supply:shipment:complete"));
        permissions.add(new WildcardPermission("supply:shipment:reject"));
        return permissions;
    }

    private Collection<Permission> supplyManagerPermissions() {
        List<Permission> permissions = new ArrayList<>();
        permissions.add(new WildcardPermission("supply:shipment:approve"));
        return permissions;
    }
}
