package gov.nysenate.ess.supply.integration.item;

import com.google.common.collect.ImmutableSet;
import com.google.common.collect.Sets;
import gov.nysenate.ess.core.annotation.IntegrationTest;
import gov.nysenate.ess.core.BaseTest;
import gov.nysenate.ess.supply.item.dao.SupplyItemDao;
import gov.nysenate.ess.supply.item.model.*;
import org.junit.Ignore;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Set;

import static org.hamcrest.Matchers.*;
import static org.junit.Assert.*;

@Ignore
@org.junit.experimental.categories.Category(IntegrationTest.class)
public class SupplyItemDaoIT extends BaseTest {

    @Autowired
    private SupplyItemDao itemDao;

    private void assertItemRestrictionsInitialized(Set<SupplyItem> items) {
        for (SupplyItem item: items) {
            if (item.getId() == 1542) {
                assertTrue(item.isRestricted());
            }
        }
    }

    @Test
    public void canGetItems() {
        Set<SupplyItem> items = itemDao.getSupplyItems();
        assertTrue(items.size() > 0);
        assertItemRestrictionsInitialized(items);
    }

    @Test
    public void canGetItemsById() {
        Set<SupplyItem> items = itemDao.getItemsByIds(Sets.newHashSet(1542, 111));
        assertTrue(items.size() > 0);
        assertItemRestrictionsInitialized(items);
    }

    @Test
    public void getByIdShouldInitializeItemRestriction() {
        SupplyItem item = itemDao.getItemById(1542);
        assertTrue(item.isRestricted());
    }

    @Test
    public void canGetExpendableItem() {
        SupplyItem actual = itemDao.getItemById(111);
    }

    @Test
    public void canGetNonExpendableItem() {
        SupplyItem item = itemDao.getItemById(1815);
    }

    @Test
    public void canGetInactiveItem() {
        SupplyItem item = itemDao.getItemById(904);
    }

    @Test
    public void descriptionShouldPrefer_DeCommdtyEssSupply_field() {
        // Item 111 has both decommdty and decommdtyesssupply description fields.
        SupplyItem item = itemDao.getItemById(111);
        assertThat(item.getDescription(), is("LABELING AND COVER UP TAPE"));
    }

    @Test
    public void descriptionShouldUse_Decommodityf_If_DeCommdtyEssSupply_IsNull() {
        SupplyItem item = itemDao.getItemById(904);
        assertThat(item.getDescription(), is("COPYHOLDER METAL (STENO BOOK)"));
    }

    @Test
    public void if_cdsensuppieditem_isNullDefaultToOrderedBySupply() {
        SupplyItem item = itemDao.getItemById(4700);
        assertThat(item.isExpendable(), is(true));
        assertThat(item.requiresSynchronization(), is(true));
    }

    @Test
    public void if_cdspecpermvisible_isNullDefaultToVisible() {
        SupplyItem item = itemDao.getItemById(4700);
        assertThat(item.isVisible(), is(true));
    }

    @Test
    public void if_cdspecpermreq_isNullDefaultToNotSpecialRequest() {
        SupplyItem item = itemDao.getItemById(4700);
        assertThat(item.isSpecialRequest(), is(false));
    }

    @Test
    public void reconciliationPageNum_defaultsTo2() {
        SupplyItem item = itemDao.getItemById(4700);
        assertThat(item.getReconciliationPage(), is(2));
    }

    // Cant test default value when cdstockitem is null, no values in the database.
}
