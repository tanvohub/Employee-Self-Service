package gov.nysenate.ess.travel.application.model;

import gov.nysenate.ess.core.model.personnel.Employee;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class TravelApplication {

    private int id;
    private Employee applicant;
    private TravelAppAllowances allowances;
    private Itinerary itinerary;
    private ModeOfTransportation modeOfTransportation;
    private TravelApplicationStatus status;

    private Employee createdBy;
    private LocalDateTime createdDateTime;
    private Employee modifiedBy;
    private LocalDateTime modifiedDateTime;

    private TravelApplication(Builder builder) {
        this.id = builder.id;
        this.applicant = builder.applicant;
        this.allowances = builder.allowances;
        this.itinerary = builder.itinerary;
        this.status = builder.status;
        this.createdBy = builder.createdBy;
        this.createdDateTime = builder.createdDateTime;
        this.modifiedBy = builder.modifiedBy;
        this.modifiedDateTime = builder.modifiedDateTime;
        this.modeOfTransportation = builder.modeOfTransportation;
    }

    /**
     * The total allowance available to the applicant.
     * @return
     */
    public BigDecimal totalAllowance() {
        return null;
    }

    /**
     * The date the applicant will arrive at their first destination.
     * Used in the UI as an identifier for a trip.
     */
    public LocalDate travelStartDate() {
        return itinerary.getTravelDestinations().get(0).getArrivalDate();
    }

    public LocalDate travelEndDate() {
        return itinerary.getTravelDestinations().get(itinerary.getTravelDestinations().size() - 1)
                .getDepartureDate();
    }

    public int getId() {
        return id;
    }

    public Employee getApplicant() {
        return applicant;
    }

    public TravelAppAllowances getAllowances() {
        return allowances;
    }

    public Itinerary getItinerary() {
        return itinerary;
    }

    public ModeOfTransportation getModeOfTransportation() {
        return modeOfTransportation;
    }

    public TravelApplicationStatus getStatus() {
        return status;
    }

    public Employee getCreatedBy() {
        return createdBy;
    }

    public LocalDateTime getCreatedDateTime() {
        return createdDateTime;
    }

    public Employee getModifiedBy() {
        return modifiedBy;
    }

    public LocalDateTime getModifiedDateTime() {
        return modifiedDateTime;
    }

    public static Builder Builder() {
        return new Builder();
    }

    public static class Builder {
        private int id;
        private Employee applicant;
        private TravelAppAllowances allowances;
        private Itinerary itinerary;
        private ModeOfTransportation modeOfTransportation;
        private TravelApplicationStatus status;
        private Employee createdBy;
        private LocalDateTime createdDateTime;
        private Employee modifiedBy;
        private LocalDateTime modifiedDateTime;

        public TravelApplication build() {
            return new TravelApplication(this);
        }

        public Builder setId(int id) {
            this.id = id;
            return this;
        }

        public Builder setApplicant(Employee applicant) {
            this.applicant = applicant;
            return this;
        }

        public Builder setAllowances(TravelAppAllowances allowances) {
            this.allowances = allowances;
            return this;
        }

        public Builder setItinerary(Itinerary itinerary) {
            this.itinerary = itinerary;
            return this;
        }

        public Builder setModeOfTransportation(ModeOfTransportation modeOfTransportation) {
            this.modeOfTransportation = modeOfTransportation;
            return this;
        }

        public Builder setStatus(TravelApplicationStatus status) {
            this.status = status;
            return this;
        }

        public Builder setCreatedBy(Employee createdBy) {
            this.createdBy = createdBy;
            return this;
        }

        public Builder setCreatedDateTime(LocalDateTime createdDateTime) {
            this.createdDateTime = createdDateTime;
            return this;
        }

        public Builder setModifiedBy(Employee modifiedBy) {
            this.modifiedBy = modifiedBy;
            return this;
        }

        public Builder setModifiedDateTime(LocalDateTime modifiedDateTime) {
            this.modifiedDateTime = modifiedDateTime;
            return this;
        }
    }
}
