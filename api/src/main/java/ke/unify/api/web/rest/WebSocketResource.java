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
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@Controller
public class WebSocketResource {

    private final Logger logger = LoggerFactory.getLogger(WebSocketResource.class);

    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;

    public WebSocketResource(ChatService chatService, SimpMessagingTemplate messagingTemplate) {
        this.chatService = chatService;
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/chat")
    public void saveAndSendMessage(@Payload ChatDTO chatDTO) {
        logger.info("WebSocket request to save and send chat: {}", chatDTO);

        ChatDTO result = chatService.save(chatDTO);

        //Broadcast to all subscribers
        messagingTemplate.convertAndSend("/topic/messages", result);
    }
}
