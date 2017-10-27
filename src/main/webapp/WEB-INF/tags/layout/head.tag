<%@tag description="ESS Base Template" pageEncoding="UTF-8"%>
<%@attribute name="pageTitle" fragment="true" required="true" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>

<!doctype html>
<html id="ng-app" ng-app="ess">
<head>
    <title><jsp:invoke fragment="pageTitle"/></title>
    <base href="<c:out value="${empty ctxPath ? '/' : ctxPath}" />"/>
    <link rel="shortcut icon" type="image/png" href="${ctxPath}/assets/favicon.ico"/>
    <script type="text/javascript" src='http://maps.google.com/maps/api/js?libraries=places&key=AIzaSyA6nqou60P5vC9huazLGEPQVd5rmPYPRIc'></script>
    <script>
        window.globalProps = {
            ctxPath: '${ctxPath}',
            apiPath: '${ctxPath}/api/v1',
            runtimeLevel: '${runtimeLevel}',
            loginUrl: '${loginUrl}',
            imageUrl: '${imageUrl}',
            sessionId: '${sessionId}',
            releaseVersion: '${releaseVersion}',
            timeoutExempt: '${timeoutExempt}',
            miscLeaves: ${miscLeaves}
        };
        <c:if test="${not empty principalJson}">
            window.globalProps.user = ${principalJson};
        </c:if>
        <c:if test="${principalIsSenator}">
            window.globalProps.userIsSenator = true;
        </c:if>
        <c:if test="${principalIsSupervisor}">
            window.globalProps.userIsSupervisor = true;
        </c:if>
        <c:if test="${not empty empActiveYears}">
            window.globalProps.empActiveYears = ${empActiveYears};
        </c:if>
    </script>
    <jsp:doBody/>
</head>