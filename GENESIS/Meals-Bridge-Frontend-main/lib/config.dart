class Config {
  static const String baseUrl = 'http://192.168.137.167:3000/';
  static const String sendOtpEndpoint = 'api/otp/sendotp';
  static const String verifyOtpEndpoint = 'api/otp/verifyotp';
  static const String saveUserDataEndpoint = 'api/profile/addProfile';
  static const String donateEndpoint = 'api/order/addUserOrder';
  static const String allOrdersEndpoint = 'api/order/allOrder';
  static const String fetchUserEndpoint = 'api/profile/fetchallProfile';
  static String get allOrdersUrl => baseUrl + allOrdersEndpoint;
  static String get sendOtpUrl => baseUrl + sendOtpEndpoint;
  static String get verifyOtpUrl => baseUrl + verifyOtpEndpoint;
  static String get saveUserUrl => baseUrl + saveUserDataEndpoint;
  static String get donateUrl => baseUrl + donateEndpoint;
  static String get fetchUserUrl => baseUrl + fetchUserEndpoint;
}
// final login = url + 'login';
// final addtodo = url + 'storeTodo';
// final getToDoList = url + 'getUserTodoList';
// final deleteTodo = url + 'deleteTodo';