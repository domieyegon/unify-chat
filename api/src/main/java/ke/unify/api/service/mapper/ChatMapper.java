package ke.unify.api.service.mapper;

import ke.unify.api.domain.Chat;
import ke.unify.api.service.dto.ChatDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {})
public interface ChatMapper extends EntityMapper<ChatDTO, Chat> {

}
