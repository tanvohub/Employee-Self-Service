<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<section ng-controller="AckDocViewCtrl">
  <div class="my-info-hero">
    <h2 ng-bind="state.document.title"></h2>
  </div>

  <div loader-indicator class="loader" ng-show="isLoading()"></div>

  <div class="content-container ack-doc-container" ng-if="!isLoading()">

    <p class="content-info" ng-hide="state.acknowledged">
      Please review this policy/document and click the button to acknowledge it.
      <br/><span class="bold-text">You must scroll to the end of the page for the button to become available.</span>
      <br/>If desired, click "Open Printable View" to open a separate tab to print the document.
    </p>
    <p class="content-info" ng-show="state.acknowledged">
      You acknowledged this policy/document on {{state.ackTimestamp | moment:'LL'}}
    </p>

    <div class="ack-doc-view-nav">
      <a ng-href="{{ackDocPageUrl}}">
        Return to Acknowledgments page
      </a>
      <a ng-href="{{ctxPath + state.document.path}}" target="_blank">
        Open Printable View
      </a>
    </div>

    <div id="ack-doc-embed-container">
      <!-- Some browsers require an overlay
           or else they cannot mouse wheel scroll the container while hovering the embedded pdf -->
      <div id="ack-doc-scroll-cover" ng-if="useOverlay()" ng-style="{'height': state.docHeight + 'px' }"></div>

      <!-- Use an iframe tag for certain browsers that need it.  Others perform better with embed -->
      <iframe class="ack-doc-embed" ng-style="{'height': state.docHeight + 'px' }"
              ng-if="useIframe()"
              ng-src="{{getDocUrl()}}">
      </iframe>
      <embed class="ack-doc-embed" type="application/pdf" ng-style="{'height': state.docHeight + 'px' }"
             ng-if="!useIframe()" ng-hide="hideEmbed()"
             ng-src="{{getDocUrl()}}">
      </embed>
    </div>

    <div class="ack-doc-button-frame">
      <div class="ack-doc-button-container content-container" ng-hide="state.acknowledged">
        <span class="acknowledge-button" ng-class="{'disabled': !state.docRead}">
          <input type="button" class="submit-button"
                 title="{{state.docRead ? 'Acknowledge' : 'You must read the entire document to acknowledge'}}"
                 value="Acknowledge"
                 ng-disabled="!state.docRead"
                 ng-click="acknowledgeDocument()">
        </span>
      </div>
      <iframe class="iframe-cover" src="about:blank" style></iframe>
    </div>

  </div>
  <div modal-container>
    <modal modal-id="acknowledge-prompt">
      <div confirm-modal rejectable="true" title="Acknowledge Policy/Document"
           resolve-button="I Agree"
           reject-button="Cancel" reject-class="time-neutral-button">
        <p class="content-info acknowledgment-text">
          I hereby acknowledge receipt of the New York State Senate
          <span ng-bind="state.document.title" class="ack-doc-title"></span>
          and state that I have read the same.  I
          understand that compliance is a condition of employment and that violation
          of any policy could subject me to penalties including, but not limited to,
          loss of privileges to use Senate technologies, demotion, suspension or
          termination.<br>
          <br>
          In addition for purposes of submitting this acknowledgment, the username
          and password is the electronic signature of the employee. As liability
          attaches, the employee should ensure that his or her username and password
          is securely kept and used.
        </p>
      </div>
    </modal>
    <modal modal-id="acknowledge-success">
      <div confirm-modal rejectable="true" title="Acknowledgment Complete"
           confirm-message="You have successfully acknowledged this policy/document."
           resolve-button="Return to Acknowledgments" resolve-class="time-neutral-button"
           reject-button="Remain Here" reject-class="time-neutral-button">
      </div>
    </modal>
  </div>
</section>
