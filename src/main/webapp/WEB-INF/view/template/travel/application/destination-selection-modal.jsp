<div class="padding-10">
  <h3 class="content-info">Enter destination info</h3>
  <div class="content-info">
    <div class="padding-10">
      <label>Destination: <input travel-autocomplete callback="addressCallback(address)" placeholder="Enter Address" type="text" size="30"></label>
    </div>
    <div class="padding-10">
      <label>Arrival Date: <input datepicker ng-model="destination.arrivalDate" size="13"></label>
      <label>Departure Date: <input datepicker ng-model="destination.departureDate" size="13"></label>
    </div>
    <div class="padding-10">
      <label>Mode of Transportation:
        <span title="How will you be traveling to this destination?" class="icon-help-with-circle"></span>
        <select ng-model="destination.modeOfTransportation"
                ng-options="mode for mode in MODES_OF_TRANSPORTATION"></select>
      </label>
    </div>
    <div>
      <label>Waypoint </label>
      <span title="Waypoints are temporary stops on the way to your primary destination. Waypoints are not eligible for meal or lodging reimbursements." class="icon-help-with-circle"></span>
      <input type="checkbox">
    </div>
  </div>
  <div class="padding-top-10 text-align-center">
    <input type="button" class="neutral-button"
           value="Cancel"
           ng-click="cancel()">
    <span class="padding-left-10">
      <input type="button" class="submit-button"
             value="Select"
             ng-disabled="!allFieldsEntered()"
             ng-click="submit()">
    </span>
  </div>

</div>
