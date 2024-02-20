class Config {
  static const String baseUrl = 'http://192.168.105.62:3000/';
  static const String sendOtpEndpoint = 'api/otp/sendotp';
  static const String verifyOtpEndpoint = 'api/otp/verifyotp';
  static const String saveUserDataEndpoint = 'api/profile/addProfile';
  static String get sendOtpUrl => baseUrl + sendOtpEndpoint;
  static String get verifyOtpUrl => baseUrl + verifyOtpEndpoint;
  static String get saveUserUrl => baseUrl + saveUserDataEndpoint;


}
// final login = url + 'login';
// final addtodo = url + 'storeTodo';
// final getToDoList = url + 'getUserTodoList';
// final deleteTodo = url + 'deleteTodo';