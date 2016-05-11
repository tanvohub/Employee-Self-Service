<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div ng-controller="SupplyOrderController">
  <div class="supply-order-hero inline-block width-100">
    <h2 class="requisition-title">Supply Requisition Form</h2>
    <a href="${ctxPath}/supply/order/cart">
      <cart-summary class="cart-widget"></cart-summary>
    </a>
  </div>

  <div loader-indicator class="loader" ng-show="state === states.SHOPPING && !itemSearch.response.$resolved"></div>

  <%--Location Selection--%>
  <div ng-show="state === states.SELECTING_DESTINATION">
    <div class="content-container">
      <div class="content-info">
        <form name="selectDestinationForm" novalidate>
          <h4 style="display: inline-block;">Please select a destination: </h4>
          <input name="destination"
                 type="text"
                 ng-model="destinationCode"
                 ui-autocomplete="getLocationAutocompleteOptions()"
                 destination-validator
                 ng-model-options="{debounce: 300}"
                 style="width: 80px;"/>
          <input type="button" value="Confirm" class="submit-button"
                 ng-disabled="selectDestinationForm.destination.$error.destination"
                 ng-click="setDestination()">
          <div ng-show="selectDestinationForm.destination.$error.destination"
               class="warning-text">
            Invalid location
          </div>
        </form>
      </div>
    </div>
  </div>

  <%--Ordering--%>
  <div class="content-container" ng-show="itemSearch.response.$resolved && state == states.SHOPPING">
    <dir-pagination-controls class="text-align-center" on-page-change="onPageChange()" pagination-id="item-pagination"
                             boundary-links="true" max-size="10"></dir-pagination-controls>
    <div class="grid grid-pad">
      <div class="col-3-12 text-align-center"
           dir-paginate="item in itemSearch.matches | itemsPerPage: itemSearch.paginate.itemsPerPage"
           current-page="itemSearch.paginate.currPage"
           total-items="itemSearch.paginate.totalItems"
           pagination-id="item-pagination">
        <img ng-src="${ctxPath}/assets/img/supply/no_photo_available.png" class="supply-item-image">
        <div>
          <p class="dark-gray bold" style="height: 40px;">{{item.description}}</p>
          <p class="dark-gray">{{item.standardQuantity}}/Pack</p>
        </div>
        <div style="">
          <label class="custom-select">
            <select requisition-quantity-selector item="item" warn-qty="item.suggestedMaxQty + 1"
                    ng-model="quantity" ng-options="qty for qty in orderQuantityRange(item)"></select>
          </label>
          <input class="submit-button add-to-cart-btn" ng-click="addToCart(item, quantity)" type="button"
                 value="Add to Cart">
        </div>
        <div ng-class="{'visibility-hidden': !isInCart(item)}" class="green padding-top-5 bold">
          &#x2713; Added to cart.
        </div>
      </div>
    </div>
    <dir-pagination-controls class="text-align-center" on-page-change="onPageChange()" pagination-id="item-pagination"
                             boundary-links="true" max-size="10"></dir-pagination-controls>
  </div>
</div>
