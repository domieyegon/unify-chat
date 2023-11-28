package ke.unify.api.service;

import ke.unify.api.domain.Chat;
import ke.unify.api.domain.User;
import ke.unify.api.repository.ChatRepository;
import ke.unify.api.service.dto.ChatDTO;
import ke.unify.api.service.dto.UserDTO;
import ke.unify.api.service.mapper.ChatMapper;
import ke.unify.api.service.util.UserUtil;
import ke.unify.api.web.rest.advice.exception.BadRequestException;
import ke.unify.api.web.rest.request.RegistrationRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class ChatService {

    private final Logger logger = LoggerFactory.getLogger(ChatService.class);
    private final ChatRepository chatRepository;
    private final ChatMapper chatMapper;

    public ChatService(ChatRepository chatRepository, ChatMapper chatMapper) {
        this.chatRepository = chatRepository;
        this.chatMapper = chatMapper;
    }


    @Caching(
            evict = {
                    @CacheEvict(value = "chats", allEntries = true),
                    @CacheEvict(value = "chats", key = "#result.id")
            }
    )
    @Transactional
    public ChatDTO save(ChatDTO chatDTO)  {
        if (chatDTO.getRead()){
            chatDTO.setReadAt(LocalDateTime.now());
        } else {
            chatDTO.setRead(false);
            chatDTO.setSentAt(LocalDateTime.now());
        }

        Chat chat = chatMapper.toEntity(chatDTO);
        chat = chatRepository.save(chat);

        return chatMapper.toDto(chat);
    }


    @Cacheable("chats")
    @Transactional(readOnly=true)
    public Page<ChatDTO> findPageBySenderIdAndRecipientId(Long senderId, Long recipientId, Pageable pageable) {
        return chatRepository.findBySenderIdAndReceiverId(senderId, recipientId, pageable).map(chatMapper::toDto);
    }
}
