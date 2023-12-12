package ke.unify.api.repository;

import ke.unify.api.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);
    Optional<User> findByUuid(String uuid);
    boolean existsByUsername(String username);

    List<User> findByUsernameNotAndActive(String username, Boolean active);
}
