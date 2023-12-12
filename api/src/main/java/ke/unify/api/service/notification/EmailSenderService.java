package ke.unify.api.service.notification;

import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import ke.unify.api.config.AppConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Properties;

@Service
public class EmailSenderService {

    private static final Logger logger = LoggerFactory.getLogger(EmailSenderService.class);

    @Value("${spring.mail.username}")
    String senderEmailAddress;

    @Value("${spring.mail.password}")
    String senderEmailPassword;

    @Async
    public void sendEmail(String to, String subject, String body){
        logger.info("Email: {}, password: {}", senderEmailAddress, senderEmailPassword);

        // Create Session
        Session session = createSession();


        try
        {
            MimeMessage msg = new MimeMessage(session);
            //set message headers
            msg.addHeader("Content-type", "text/HTML; charset=UTF-8");
            msg.addHeader("format", "flowed");
            msg.addHeader("Content-Transfer-Encoding", "8bit");

            msg.setFrom(new InternetAddress(senderEmailAddress, AppConstants.DEFAULT_EMAIL_USERNAME));

            msg.setReplyTo(InternetAddress.parse(senderEmailAddress, false));

            msg.setSubject(subject, "UTF-8");

            msg.setText(body, "UTF-8", "html");

            msg.setSentDate(new Date());

            msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to, false));

            logger.info("Ready to send email");

            //ready to send email
            Transport.send(msg);
            logger.info("Email sent success");
        } catch (Exception e) {
            logger.error("Failed to send email "+ e);
            throw new IllegalStateException("Failed to send email to"+ to);
        }
    }

    private Session createSession() {
        Properties props = new Properties();
        props.put("mail.smtp.host", AppConstants.DEFAULT_MAIL_SMTP_HOST); //SMTP Host
        props.put("mail.smtp.port",  AppConstants.DEFAULT_MAIL_SMTP_PORT); //TLS Port
        props.put("mail.smtp.auth",  AppConstants.DEFAULT_MAIL_SMTP_AUTH); //enable authentication
        props.put("mail.smtp.starttls.enable", AppConstants.DEFAULT_MAIL_STARTTLS_ENABLE); //enable STARTTLS

        //create Authenticator object to pass in Session.getInstance argument
        Authenticator auth = new Authenticator() {
            //override the getPasswordAuthentication method
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(senderEmailAddress, senderEmailPassword);
            }
        };

        return Session.getInstance(props, auth);
    }
}
