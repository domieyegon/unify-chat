package ke.unify.api.service;

import ke.unify.api.domain.User;
import ke.unify.api.repository.UserRepository;
import ke.unify.api.security.SecurityUtils;
import ke.unify.api.service.dto.UserDTO;
import ke.unify.api.service.mapper.UserMapper;
import ke.unify.api.service.notification.EmailSenderService;
import ke.unify.api.service.notification.util.EmailUtil;
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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

    private final Logger logger = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    private final EmailSenderService emailSenderService;

    public UserService(UserRepository userRepository, @Lazy PasswordEncoder passwordEncoder, UserMapper userMapper, EmailSenderService emailSenderService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
        this.emailSenderService = emailSenderService;
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

        String activationUrl = ServletUriComponentsBuilder.fromCurrentContextPath().path("/activate/"+user.getUuid()).toUriString();

        if (activationUrl.contains("localhost")){
            activationUrl = "http://localhost:4200/activate/"+user.getUuid();
        }

        emailSenderService.sendEmail(user.getEmail(), "Account Activation", EmailUtil.activateAccount(user.getFullName(), activationUrl));
    }

    public Map<String, String> activateAccount(String uuid) throws BadRequestException {
        logger.info("Request to get User by uuid: {}", uuid);
        User user = userRepository.findByUuid(uuid).orElseThrow(()->new BadRequestException("User not found"));
        user.setActive(true);
        userRepository.save(user);
        Map<String, String> result = new HashMap<>();
        result.put("status", "SUCCESS");
        result.put("statusReason", "Account Activated successfully");

        return result;
    }

    @Transactional(readOnly=true)
    public UserDTO findById(Long userId) throws BadRequestException {
        return userRepository.findById(userId).map(userMapper::toDto).orElseThrow(()->new BadRequestException("User not found"));
    }

    @Transactional(readOnly=true)
    public UserDTO findByUsername(String username) throws BadRequestException {
        logger.info("Request to get User by username: {}", username);
        return userRepository.findByUsername(username).map(userMapper::toDto).orElseThrow(()->new BadRequestException("User not found"));
    }

    @Transactional(readOnly = true)
    public List<UserDTO> findAll() {
        logger.info("Request to get all users");
        return userRepository.findByUsernameNotAndActive(SecurityUtils.getCurrentUsername(), true).stream().map(userMapper::toDto).collect(Collectors.toList());
    }
}
