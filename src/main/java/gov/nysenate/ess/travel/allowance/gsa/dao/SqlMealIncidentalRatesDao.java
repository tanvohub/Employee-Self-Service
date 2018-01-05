package gov.nysenate.ess.travel.allowance.gsa.dao;

import gov.nysenate.ess.core.dao.base.BaseRowMapper;
import gov.nysenate.ess.core.dao.base.BasicSqlQuery;
import gov.nysenate.ess.core.dao.base.DbVendor;
import gov.nysenate.ess.core.dao.base.SqlBaseDao;
import gov.nysenate.ess.travel.allowance.gsa.model.MealRate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Repository
@Transactional(value = "localTxManager")
public class SqlMealIncidentalRatesDao extends SqlBaseDao implements MealIncidentalRatesDao {

    @Override
    public MealRate[] getMealIncidentalRates() {
        String sql = SqlMealIncidentalRateQuery.GET_RATES.getSql(schemaMap());

        List<MealRate> rates = localNamedJdbc.query(sql, new MealIncidentalRateRowMapper());
        MealRate[] mealRates = new MealRate[rates.size()];
        for (int i = 0; i < rates.size(); i++) {
            mealRates[i] = rates.get(i);
        }
        return mealRates;
    }

    @Override
    public void insertMealIncidentalRates(MealRate[] mealRates) {
//        List<SqlParameterSource> paramList = new ArrayList<>();
//        for (MealRate mealRate : mealRates) {
//            MapSqlParameterSource params = new MapSqlParameterSource()
//                    .addValue("totalCost", mealRate.getTotalCost())
//                    .addValue("breakfastCost", mealRate.getBreakfast())
//                    .addValue("dinnerCost", mealRate.getDinner())
//                    .addValue("incidentalCost", mealRate.getIncidental());
//            paramList.add(params);
//        }
//
//        String sql = SqlMealIncidentalRateQuery.INSERT_RATE.getSql(schemaMap());
//        SqlParameterSource[] batchParams = new SqlParameterSource[paramList.size()];
//        batchParams = paramList.toArray(batchParams);
//        localNamedJdbc.batchUpdate(sql, batchParams);
    }

    @Override
    @Transactional(value = "localTxManager")
    public synchronized void updateMealIncidentalRates(MealRate[] mealRates) {
        String sql = SqlMealIncidentalRateQuery.TRUNCATE_TABLE.getSql(schemaMap());
        localJdbc.execute(sql);

        insertMealIncidentalRates(mealRates);
    }

    private enum SqlMealIncidentalRateQuery implements BasicSqlQuery {
        GET_RATES(
                "SELECT * FROM ${travelSchema}.meal_incidental_rates"),

        INSERT_RATE(
                "INSERT INTO ${travelSchema}.meal_incidental_rates \n" +
                        "VALUES (:totalCost, :breakfastCost, :dinnerCost, :incidentalCost)"
        ),
        TRUNCATE_TABLE(
                "TRUNCATE TABLE ${travelSchema}.meal_incidental_rates"
        );

        private String sql;

        SqlMealIncidentalRateQuery(String sql) {
            this.sql = sql;
        }

        @Override
        public String getSql() {
            return this.sql;
        }

        @Override
        public DbVendor getVendor() {
            return DbVendor.POSTGRES;
        }
    }

    private class MealIncidentalRateRowMapper extends BaseRowMapper<MealRate> {

        @Override
        public MealRate mapRow(ResultSet rs, int rowNum) throws SQLException {
//            return new MealRate(rs.getInt("total_cost"), rs.getInt("breakfast_cost"),
//                    rs.getInt("dinner_cost"), rs.getInt("incidental_cost"));
            return null;
        }
    }
}
