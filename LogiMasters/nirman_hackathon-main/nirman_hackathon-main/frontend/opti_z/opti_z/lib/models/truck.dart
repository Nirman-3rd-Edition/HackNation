class Truck {
  final String truckName;
  final String raspberryPiId;
  final String registrationNumber;

  Truck({
    required this.truckName,
    required this.raspberryPiId,
    required this.registrationNumber,
  });

  factory Truck.fromJson(Map<String, dynamic> json) {
    return Truck(
      truckName: json['truckName'],
      raspberryPiId: json['raspberryPiId'],
      registrationNumber: json['registrationNumber'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'truckName': truckName,
      'raspberryPiId': raspberryPiId,
      'registrationNumber': registrationNumber,
    };
  }
}
