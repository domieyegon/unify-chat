package ke.unify.api.service.mapper;

import ke.unify.api.domain.User;
import ke.unify.api.service.dto.UserDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {})
public interface UserMapper extends EntityMapper<UserDTO, User> {

}
