package gov.nysenate.ess.travel.application.view;

import gov.nysenate.ess.core.client.view.EmployeeView;
import gov.nysenate.ess.core.client.view.base.ViewObject;
import gov.nysenate.ess.travel.application.model.ModeOfTransportation;
import gov.nysenate.ess.travel.application.model.TravelApplication;
import gov.nysenate.ess.travel.application.model.TravelApplicationStatus;
import org.apache.commons.lang3.StringUtils;

import java.time.format.DateTimeFormatter;

/**
 * Represents a newly submitted travel application
 */
public class NewTravelApplicationView implements ViewObject {

    private int applicantEmpId;
    private TravelAppAllowancesView allowances;
    private String modeOfTransportation;
    private ItineraryView itinerary;
    private String purposeOfTravel;

    public NewTravelApplicationView() {
    }

    public TravelApplication.Builder toTravelApplicationBuilder() {
        return TravelApplication.Builder()
                .setAllowances(allowances.toTravelAppAllowances())
                .setItinerary(itinerary.toItinerary())
                .setModeOfTransportation(ModeOfTransportation.of(modeOfTransportation))
                .setPurposeOfTravel(purposeOfTravel);
    }


    public int getApplicantEmpId() {
        return applicantEmpId;
    }

    public TravelAppAllowancesView getAllowances() {
        return allowances;
    }

    public String getModeOfTransportation() {
        return modeOfTransportation;
    }

    public ItineraryView getItinerary() {
        return itinerary;
    }

    public String getPurposeOfTravel() {
        return purposeOfTravel;
    }

    @Override
    public String getViewType() {
        return "new-travel-application-view";
    }
}
