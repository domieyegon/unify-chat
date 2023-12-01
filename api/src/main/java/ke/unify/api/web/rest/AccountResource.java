package ke.unify.api.web.rest;

import ke.unify.api.security.jwt.JwtService;
import ke.unify.api.service.UserService;
import ke.unify.api.web.rest.advice.exception.BadRequestException;
import ke.unify.api.web.rest.request.AuthRequest;
import ke.unify.api.web.rest.request.RegistrationRequest;
import ke.unify.api.web.rest.response.AppResponse;
import ke.unify.api.web.rest.response.AuthResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RestController
@RequestMapping("/api/accounts      ")
public class AccountResource {

    private final Logger logger = LoggerFactory.getLogger(AccountResource.class);
    private final UserService userService;
    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;

    public AccountResource(UserService userService, AuthenticationManager authenticationManager, JwtService jwtService) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<AppResponse> registerAccount(@RequestBody RegistrationRequest request) throws BadRequestException {
        logger.info("REST request to register account for: {}", request.getFullName());
        userService.createAccount(request);
        AppResponse response = new AppResponse();
        response.setStatus("OK");
        response.setReason("Account registered successfully");

        return ResponseEntity.ok().body(response);
    }


    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest authRequest) throws UsernameNotFoundException {
        logger.info("REST request to login user: {}", authRequest.getUsername());

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtService.generateToken(authRequest.getUsername());

        return ResponseEntity.ok().body(new AuthResponse(token));
    }
}
