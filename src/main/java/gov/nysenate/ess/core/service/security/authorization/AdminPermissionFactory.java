package gov.nysenate.ess.core.service.security.authorization;

import com.google.common.collect.ImmutableList;
import com.google.common.collect.ImmutableSet;
import gov.nysenate.ess.core.model.auth.EssRole;
import gov.nysenate.ess.core.model.personnel.Employee;
import org.apache.shiro.authz.Permission;
import org.apache.shiro.authz.permission.WildcardPermission;
import org.springframework.stereotype.Component;

/**
 * Assigns the administrator permission if the employee has the required role
 */
@Component
public class AdminPermissionFactory implements PermissionFactory {

    @Override
    public ImmutableList<Permission> getPermissions(Employee employee, ImmutableSet<EssRole> roles) {
        return roles.contains(EssRole.ADMIN)
                ? ImmutableList.of(new WildcardPermission("admin"))
                : ImmutableList.of();
    }
}
