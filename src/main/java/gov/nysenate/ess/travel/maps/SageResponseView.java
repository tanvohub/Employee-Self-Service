package gov.nysenate.ess.travel.maps;

import gov.nysenate.ess.core.client.response.base.ViewObjectResponse;
import gov.nysenate.ess.core.client.view.AddressView;
import gov.nysenate.ess.core.client.view.base.ViewObject;
import gov.nysenate.ess.core.model.unit.Address;

public class SageResponseView implements ViewObject {
    private String status;
    private String source;
    private String[] messages;
    private AddressView address;
    private boolean validated;
    private int statusCode;
    private String description;

    public SageResponseView() {}

    public SageResponseView(SageResponse sageResponse) {
        this.status = sageResponse.getStatus();
        this.source = sageResponse.getSource();
        this.messages = sageResponse.getMessages();
        this.address = new AddressView(sageResponse.getAddress());
        this.validated = sageResponse.isValidated();
        this.statusCode = sageResponse.getStatusCode();
        this.description = sageResponse.getDescription();
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String[] getMessages() {
        return messages;
    }

    public void setMessages(String[] messages) {
        this.messages = messages;
    }

    public AddressView getAddress() {
        return address;
    }

    public void setAddress(AddressView address) {
        this.address = address;
    }

    public boolean isValidated() {
        return validated;
    }

    public void setValidated(boolean validated) {
        this.validated = validated;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String getViewType() {
        return "Sage-Response-View";
    }
}
