package gov.nysenate.ess.supply.item.dao;

import gov.nysenate.ess.core.dao.base.SqlBaseDao;
import gov.nysenate.ess.core.util.LimitOffset;
import gov.nysenate.ess.core.util.OrderBy;
import gov.nysenate.ess.core.util.SortOrder;
import gov.nysenate.ess.supply.item.SupplyItem;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class OracleSupplyItemDao extends SqlBaseDao implements SupplyItemDao {

    @Override
    public List<SupplyItem> getSupplyItems(LimitOffset limOff) {
        String sql = OracleSupplyItemQuery.GET_ALL_SUPPLY_ITEMS.getSql(schemaMap(), new OrderBy("CDCOMMODITY", SortOrder.ASC), limOff);
        return remoteNamedJdbc.query(sql, new SupplyItemRowMapper());
    }

    @Override
    public SupplyItem getItemById(Integer id) {
        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("id", id);
        String sql = OracleSupplyItemQuery.GET_SUPPLY_ITEM_BY_ID.getSql(schemaMap());
        return remoteNamedJdbc.queryForObject(sql, params, new SupplyItemRowMapper());
    }
}