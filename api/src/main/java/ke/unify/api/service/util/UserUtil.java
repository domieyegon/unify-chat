package ke.unify.api.service.util;

import ke.unify.api.domain.User;
import ke.unify.api.web.rest.request.RegistrationRequest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.regex.Pattern;

public class UserUtil {

    public static boolean validateEmail(String emailAddress) {
        String EMAIL_REGEX = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";
        return Pattern.compile(EMAIL_REGEX)
                .matcher(emailAddress)
                .matches();
    }

    public static User createUserObj(RegistrationRequest request, PasswordEncoder passwordEncoder){
        User user = new User();
        user.setFullName(request.getFullName());
        user.setUsername(request.getEmail());
        user.setEmail(request.getEmail());
        user.setMsisdn(request.getMsisdn());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setActive(false);
        user.setRoles(request.getRoles());
        user.setLogoUrl(request.getLogoUrl());
        user.setSlogan(request.getSlogan());
        user.setUuid(Base62ConverterUtil.generateUuid());
        return user;
    }
}
