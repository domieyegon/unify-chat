package ke.unify.api.service.dto;

import jakarta.persistence.*;
import ke.unify.api.domain.User;

import java.time.LocalDateTime;

public class ChatDTO {
    private Long id;
    private String message;
    private LocalDateTime sentAt;
    private LocalDateTime readAt;
    private UserDTO sender;
    private UserDTO receiver;
    private Boolean read;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getSentAt() {
        return sentAt;
    }

    public void setSentAt(LocalDateTime sentAt) {
        this.sentAt = sentAt;
    }

    public LocalDateTime getReadAt() {
        return readAt;
    }

    public void setReadAt(LocalDateTime readAt) {
        this.readAt = readAt;
    }

    public UserDTO getSender() {
        return sender;
    }

    public void setSender(UserDTO sender) {
        this.sender = sender;
    }

    public UserDTO getReceiver() {
        return receiver;
    }

    public void setReceiver(UserDTO receiver) {
        this.receiver = receiver;
    }

    public Boolean getRead() {
        return read;
    }

    public void setRead(Boolean read) {
        this.read = read;
    }

    @Override
    public String toString() {
        return "ChatDTO{" +
                "id=" + id +
                ", message='" + message + '\'' +
                ", sentAt=" + sentAt +
                ", readAt=" + readAt +
                ", sender=" + sender +
                ", receiver=" + receiver +
                ", read=" + read +
                '}';
    }
}
