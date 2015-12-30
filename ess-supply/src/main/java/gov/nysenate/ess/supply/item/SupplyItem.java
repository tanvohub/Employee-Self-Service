package gov.nysenate.ess.supply.item;

public final class SupplyItem {

    private final int id;
    private final String commodityCode;
    private final String name;
    private final String description;
    private final int unitSize;
    private final String category;
    private final int suggestedMaxQty;

    public SupplyItem(int id, String commodityCode, String name, String description, int unitSize,
                      String category, int suggestedMaxQty) {
        this.id = id;
        this.commodityCode = commodityCode;
        this.name = name;
        this.description = description;
        this.unitSize = unitSize;
        this.category = category;
        this.suggestedMaxQty = suggestedMaxQty;
    }

    public int getId() {
        return id;
    }

    public String getCommodityCode() {
        return commodityCode;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public int getUnitSize() {
        return unitSize;
    }

    public String getCategory() {
        return category;
    }

    public int getSuggestedMaxQty() {
        return suggestedMaxQty;
    }
}