package gov.nysenate.ess.core.model.policy;

import java.time.LocalDateTime;

public class Policy {

    private String title;
    private String filename;
    private Boolean active;
    private Integer policyId;
    private LocalDateTime effectiveDateTime;

    public Policy() {}

    public Policy(String title, String filename, Boolean active, Integer policyId, LocalDateTime effectiveDateTime) {
        this.title = title;
        this.filename = filename;
        this.active = active;
        this.policyId = policyId;
        this.effectiveDateTime = effectiveDateTime;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Integer getPolicyId() {
        return policyId;
    }

    public void setPolicyId(Integer policyId) {
        this.policyId = policyId;
    }

    public LocalDateTime getEffectiveDateTime() {
        return effectiveDateTime;
    }

    public void setEffectiveDateTime(LocalDateTime effectiveDateTime) {
        this.effectiveDateTime = effectiveDateTime;
    }
}
