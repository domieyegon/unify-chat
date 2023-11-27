package ke.unify.api.web.rest.advice;

import ke.unify.api.web.rest.advice.exception.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ApplicationExceptionHandler {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(BadRequestException.class)
    public Map<String, Object> handleBadRequestException(BadRequestException ex){
        Map<String, Object> errorMap = new HashMap<>();
        errorMap.put("message", ex.getMessage());
        errorMap.put("status", HttpStatus.BAD_REQUEST.name());
        errorMap.put("code", HttpStatus.BAD_REQUEST.value());
        return errorMap;
    }
}
