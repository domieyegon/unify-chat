package ke.unify.api.service.notification.util;

public class EmailUtil {
    public static String activateAccount (String name, String link) {
        return "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Verify Email</title></head><body style=\"background-color:#f1f2f3;padding:40px 10px\"><div style=\"width:100%;max-width:400px;margin:40px auto;background-color:#fff;box-shadow:0 0 10px rgba(0,0,0,.1);border-radius:8px;overflow:hidden\"><div style=\"background-color:#0747a6;padding:30px 30px 25px;color:#fff\"><h2 style=\"margin:0;text-align:center;font-size:24px;font-weight:700\">Confirm your email</h2></div><div style=\"padding:0 30px 30px 30px\"><p style=\"font-size:16px;color:#333\">Hi "+name+",</p><p style=\"font-size:16px;color:#333\">Thank you for registering. We're excited to have you on board. Please click on the below link to activate your account.</p><a href=\""+link+"\" style=\"background-color:#0747a6;display:inline-block;margin-top:16px;padding:10px 12px;border:none;border-radius:5px;color:#fff;font-size:16px;cursor:pointer;text-decoration:none\">Activate now</a></div></div></body></html>";
    }
}
