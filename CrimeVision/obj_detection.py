import cv2
from ultralytics import YOLO
import cvzone
import math

cap = cv2.VideoCapture(0)
cap.set(3, 480)
cap.set(4, 1280)

model = YOLO("../Yolo-Weights/yolov8l.pt")

# this class is defined in YOLO to define the object names which is detected in camera
classNames = ["person", "bicycle", "car", "motorbike", "aeroplane", "bus", "train", "truck", "boat",
              "traffic light", "fire hydrant", "stop sign", "parking meter", "bench", "bird", "cat",
              "dog", "horse", "sheep", "cow", "elephant", "bear", "zebra", "giraffe", "backpack", "umbrella",
              "handbag", "tie", "suitcase", "frisbee", "skis", "snowboard", "sports ball", "kite", "baseball bat",
              "baseball glove", "skateboard", "surfboard", "tennis racket", "bottle", "wine glass", "cup",
              "fork", "knife", "spoon", "bowl", "banana", "apple", "sandwich", "orange", "broccoli",
              "carrot", "hot dog", "pizza", "donut", "cake", "chair", "sofa", "pottedplant", "bed",
              "diningtable", "toilet", "tvmonitor", "laptop", "mouse", "remote", "keyboard", "cell phone",
              "microwave", "oven", "toaster", "sink", "refrigerator", "book", "clock", "vase", "scissors",
              "teddy bear", "hair drier", "toothbrush"
              ]

while True:
    success, img = cap.read()
    results = model(img, stream=True)
    for r in results:
        boxes = r.boxes
        for box in boxes:



            # Confidence Level
            conf = math.ceil((box.conf[0] * 100))  # will show confidence level in between 0 - 100
            print(conf)

            # class creation
            cls = int(box.cls[0])
            currentClass = classNames[cls]


            if currentClass == "knife" or currentClass == "scissors" and conf > 30:
                x3, y3, x4, y4 = box.xyxy[0]
                x3, y3, x4, y4 = int(x3), int(y3), int(x4), int(y4)

                cv2.rectangle(img, (x3, y3), (x4, y4), (0, 255, 0), 4)

                cvzone.putTextRect(img, f'{currentClass, "Detected"}{conf}', (max(0, x3), max(35, y3)))

    cv2.imshow("Image", img)

    cv2.waitKey(1)