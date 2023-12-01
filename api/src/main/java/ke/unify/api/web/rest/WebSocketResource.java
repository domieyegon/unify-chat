package ke.unify.api.web.rest;

import ke.unify.api.service.ChatService;
import ke.unify.api.service.dto.ChatDTO;
import ke.unify.api.service.dto.UserDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin
public class WebSocketResource {

    private final Logger logger = LoggerFactory.getLogger(WebSocketResource.class);

    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;

    public WebSocketResource(ChatService chatService, SimpMessagingTemplate messagingTemplate) {
        this.chatService = chatService;
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/register")
    public void register(UserDTO userDTO){
        messagingTemplate.convertAndSend("/topic/registrations", userDTO);
    }

    @MessageMapping("/chat")
    public void saveAndSendMessage(@Payload ChatDTO chatDTO) {
        logger.info("WebSocket request to save and send chat: {}", chatDTO);

        ChatDTO result = chatService.save(chatDTO);

        //Broadcast to all subscribers
        messagingTemplate.convertAndSend("/topic/messages", result);
    }
}
