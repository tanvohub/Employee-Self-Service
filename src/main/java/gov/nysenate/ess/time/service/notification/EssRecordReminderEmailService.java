package gov.nysenate.ess.time.service.notification;

import com.google.common.collect.ImmutableMap;
import com.google.common.collect.Multimap;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import gov.nysenate.ess.core.model.personnel.Employee;
import gov.nysenate.ess.core.service.mail.SendMailService;
import gov.nysenate.ess.core.service.personnel.EmployeeInfoService;
import gov.nysenate.ess.core.service.template.EssTemplateException;
import gov.nysenate.ess.time.model.attendance.TimeRecord;
import gov.nysenate.ess.time.service.attendance.TimeRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.io.StringWriter;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toSet;

/**
 * {@inheritDoc}
 * Uses Freemarker {@link Template templates} and {@link SendMailService}
 * to implement functionality of {@link RecordReminderEmailService}
 */
@Service
public class EssRecordReminderEmailService implements RecordReminderEmailService {

    @Autowired private SendMailService sendMailService;
    @Autowired private Configuration freemarkerCfg;
    @Autowired private EmployeeInfoService empInfoService;
    @Autowired private TimeRecordService timeRecordService;

    @Value("${freemarker.time.templates.time_record_reminder:time_record_reminder.ftlh}")
    private String emailTemplateName;

    private static final String reminderEmailSubject = "Time and Attendance records need to be submitted";

    /** {@inheritDoc} */
    @Override
    public void sendEmailReminders(Integer supId, Multimap<Integer, LocalDate> recordDates) throws InactiveEmployeeEmailEx {
        // Group records by employee
        Multimap<Integer, TimeRecord> timeRecordMultimap = timeRecordService.getTimeRecords(recordDates);

        Set<Employee> inactiveEmployees = getInactiveEmployees(recordDates);
        if (!inactiveEmployees.isEmpty()) {
            throw new InactiveEmployeeEmailEx(inactiveEmployees);
        }

        // Generate messages for each employee
        ArrayList<MimeMessage> messages =
                timeRecordMultimap.asMap().entrySet().stream()
                        .map(entry -> generateReminderEmail(supId, entry.getKey(), entry.getValue()))
                        .collect(Collectors.toCollection(ArrayList::new));
        // Send messages
        sendMailService.sendMessages(messages);
    }

    /** --- Internal Methods --- */

    /**
     * Generate a {@link MimeMessage} to remind an employee to submit a time record.
     * Uses supervisor and employee data, the employee's time records,
     * and the email reminder template
     *
     * @param supId Integer - supervisor id
     * @param empId Integer - employee id
     * @param timeRecords {@link Collection<TimeRecord>} - employee's time records
     * @return {@link MimeMessage} - Time record submission reminder email
     */
    private MimeMessage generateReminderEmail(Integer supId, Integer empId, Collection<TimeRecord> timeRecords) {
        Employee employee = empInfoService.getEmployee(empId);
        Employee supervisor = empInfoService.getEmployee(supId);
        String to = employee.getEmail();
        String subject = reminderEmailSubject;
        String body = getEmailBody(employee, timeRecords);

        return sendMailService.newHtmlMessage(to, subject, body);
    }

    /**
     * Generate a templated HTML email body.  Use the employee and time records as data
     * @param employee {@link Employee} - target employee
     * @param timeRecords {@link Collection<TimeRecord>} - employee's time records
     * @return String - html email reminder message
     */
    private String getEmailBody(Employee employee, Collection<TimeRecord> timeRecords) {
        StringWriter out = new StringWriter();
        // Ensure the records are ordered by date
        List<TimeRecord> sortedTimeRecords = new ArrayList<>(timeRecords);
        sortedTimeRecords.sort(Comparator.comparing(TimeRecord::getBeginDate));
        Map dataModel = ImmutableMap.of("employee", employee, "timeRecords", sortedTimeRecords);
        try {
            Template emailTemplate = freemarkerCfg.getTemplate(emailTemplateName);
            emailTemplate.process(dataModel, out);
        } catch (IOException | TemplateException ex) {
            throw new EssTemplateException(emailTemplateName, ex);
        }
        return out.toString();
    }

    /**
     * Detects any inactive employees in the map of empId -> record date and returns them as a set.
     *
     * @param recordDates Multimap<Integer, LocalDate>
     * @return {@link Set<Employee>}
     */
    private Set<Employee> getInactiveEmployees(Multimap<Integer, LocalDate> recordDates) {
        return recordDates.keySet().stream()
                .map(empInfoService::getEmployee)
                .filter(emp -> !emp.isActive())
                .collect(toSet());
    }
}
