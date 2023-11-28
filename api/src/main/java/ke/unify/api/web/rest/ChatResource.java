package ke.unify.api.web.rest;

import ke.unify.api.service.ChatService;
import ke.unify.api.service.dto.ChatDTO;
import ke.unify.api.web.rest.response.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api/chats")
public class ChatResource {

    private final Logger logger = LoggerFactory.getLogger(ChatResource.class);

    private final ChatService chatService;

    public ChatResource(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping
    public ResponseEntity<ChatDTO> saveChat(@RequestBody ChatDTO chatDTO) throws URISyntaxException {
        logger.info("REST request to save chat: {}", chatDTO);

        ChatDTO result = chatService.save(chatDTO);

        return ResponseEntity.created(new URI("/api/chats/"+result.getId())).body(result);
    }

    @PostMapping
    public ResponseEntity<List<ChatDTO>> getChats(@RequestParam() Long senderId, @RequestParam() Long receiverId, @RequestParam(required = false) Pageable pageable) throws URISyntaxException {
        logger.info("REST request to get chats between: {} and {}", senderId, receiverId);

        Page<ChatDTO> page = chatService.findPageBySenderIdAndRecipientId(senderId, receiverId, pageable);

        HttpHeaders headers = PaginationUtil.generatePaginationHeaders(page);

        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
}
