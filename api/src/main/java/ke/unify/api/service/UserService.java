package ke.unify.api.service;

import ke.unify.api.domain.User;
import ke.unify.api.repository.UserRepository;
import ke.unify.api.service.dto.UserDTO;
import ke.unify.api.service.mapper.UserMapper;
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

@Service
public class UserService implements UserDetailsService {

    private final Logger logger = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, @Lazy PasswordEncoder passwordEncoder, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
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

    @Transactional(readOnly=true)
    public UserDTO findById(Long userId) throws BadRequestException {
        return userRepository.findById(userId).map(userMapper::toDto).orElseThrow(()->new BadRequestException("User not found"));
    }

    @Transactional(readOnly=true)
    public UserDTO findByUsername(String username) throws BadRequestException {
        logger.info("Request to get User by username: {}", username);
        return userRepository.findByUsername(username).map(userMapper::toDto).orElseThrow(()->new BadRequestException("User not found"));
    }
}
