package ke.unify.api.service;

import jakarta.transaction.Transactional;
import ke.unify.api.domain.User;
import ke.unify.api.repository.UserRepository;
import ke.unify.api.service.util.UserUtil;
import ke.unify.api.web.rest.advice.exception.BadRequestException;
import ke.unify.api.web.rest.request.RegistrationRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

    private final Logger logger = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    public UserService(UserRepository userRepository, @Lazy PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        logger.info("Request to get user by username: {}", username);
        return userRepository.findByUsername(username)
                .orElseThrow(()-> new UsernameNotFoundException("User not found "+ username));
    }

    @Transactional
    public void createAccount(RegistrationRequest request) throws BadRequestException {

        if (!UserUtil.validateEmail(request.getEmail())){
            throw new BadRequestException("Please provide a valid email address");
        }
        if (userRepository.existsByUsername(request.getEmail())){
            throw new BadRequestException("Email already in use");
        }
        User user = UserUtil.createUserObj(request, passwordEncoder);
        userRepository.save(user);
    }
}
