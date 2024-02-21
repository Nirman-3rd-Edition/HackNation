from flask import Flask, render_template, Response
import cv2
from ultralytics import YOLO
import cvzone
import math

app = Flask(__name__)

cap = cv2.VideoCapture(0)
cap.set(3, 480)
cap.set(4, 1280)

model = YOLO("../Yolo-Weights/yolov8l.pt")

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


def detect_objects():
    while True:
        success, img = cap.read()
        results = model(img, stream=True)
        for r in results:
            boxes = r.boxes
            for box in boxes:
                conf = math.ceil((box.conf[0] * 100))
                cls = int(box.cls[0])
                currentClass = classNames[cls]

                if currentClass == "knife" or currentClass == "scissors" and conf > 30:
                    x3, y3, x4, y4 = box.xyxy[0]
                    x3, y3, x4, y4 = int(x3), int(y3), int(x4), int(y4)

                    cv2.rectangle(img, (x3, y3), (x4, y4), (0, 255, 0), 4)
                    cvzone.putTextRect(img, f'{currentClass, "Detected"}{conf}', (max(0, x3), max(35, y3)))

        ret, jpeg = cv2.imencode('.jpg', img)
        frame = jpeg.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/video_feed')
def video_feed():
    return Response(detect_objects(), mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__ == '__main__':
    app.run(debug=True)
