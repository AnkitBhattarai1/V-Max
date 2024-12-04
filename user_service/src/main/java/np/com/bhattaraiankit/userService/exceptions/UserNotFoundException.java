package np.com.bhattaraiankit.userService.exceptions;

/**
 * UserNotFoundException
 */
public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(String message) {
        super(message);
    }
}
