package ke.unify.api.web.rest;

import ke.unify.api.service.UserService;
import ke.unify.api.service.dto.UserDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserResource {

    private final Logger logger = LoggerFactory.getLogger(UserResource.class);

    private final UserService userService;

    public UserResource(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> getUsers(Principal principal){
        logger.info("REST request to get all users: {}", principal);
        List<UserDTO> result = userService.findAll();

        return ResponseEntity.ok().body(result);
    }
}
