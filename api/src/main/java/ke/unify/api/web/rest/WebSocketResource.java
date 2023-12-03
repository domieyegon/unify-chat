package ke.unify.api.web.rest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
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

    private final ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());
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
    public void saveAndSendMessage(@Payload String message) throws JsonProcessingException {
        logger.info("WebSocket request to save and send chat: {}", message);

        ChatDTO result = chatService.save(objectMapper.readValue(message, ChatDTO.class));

        String messageBody = objectMapper.writeValueAsString(result);
        logger.info("userId: {}", result.getReceiver().getId());

        //Broadcast to all subscribers
        messagingTemplate.convertAndSend("/topic/"+ result.getReceiver().getId()+"/messages", messageBody);
    }
}
