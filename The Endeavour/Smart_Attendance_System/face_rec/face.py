import cv2
import os
import numpy as np
from PIL import Image
import threading
import win32com.client as wincl
from home.models import Student
import datetime

def speak(text, id = None):
    speak = wincl.Dispatch("SAPI.SpVoice")
    speak.Speak(text)
    if id:
        obj = Student.objects.get(id=id)
        obj.status = 'Present'
        obj.time = datetime.datetime.now().strftime("%I:%M %p")
        obj.save()


def create_user(face_id, face_name):
    cam = cv2.VideoCapture(0)
    cam.set(3, 640)  # set video width
    cam.set(4, 480)  # set video height

    face_detector = cv2.CascadeClassifier('face_rec\haarcascade_frontalface_default.xml')

    # For each person, enter one numeric face id
    fn_dir = 'face_rec\dataset'
    fn_name = face_name  # name of the person
    path = os.path.join(fn_dir, fn_name)
    if not os.path.isdir(path):
        os.mkdir(path)

    print("\n[INFO] Initializing face capture...")
    # Initialize individual sampling face count
    count = 0

    while (True):

        ret, img = cam.read()
        img = cv2.flip(img, 1)  # flip video image vertically
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        faces = face_detector.detectMultiScale(gray, 1.3, 5)

        for (x, y, w, h) in faces:
            cv2.rectangle(img, (x, y), (x + w, y + h), (255, 0, 0), 2)
            count += 1

            # Save the captured image into the datasets folder
            cv2.imwrite("{}/{}.{}.{}{}".format(path, face_name, face_id, count, ".jpg"), gray[y:y + h, x:x + w])
            cv2.imshow('image', img)

        k = cv2.waitKey(100) & 0xff  # Press 'ESC' for exiting video
        if k == 27:
            break
        elif count >= 30:  # Take 30 face sample and stop video
            break

    print("\n[INFO] Exiting Program...")
    cam.release()
    cv2.destroyAllWindows()


def train():
    database_path = "face_rec\dataset"
    img_dirs = [x[0] for x in os.walk(database_path)][1::]

    recognizer = cv2.face.LBPHFaceRecognizer_create()
    detector = cv2.CascadeClassifier("face_rec\haarcascade_frontalface_default.xml")

    # get the images and label data
    faceSamples=[]
    ids = []

    for path in img_dirs:
        path = str(path)
        imagePaths = [os.path.join(path,f) for f in os.listdir(path)]


        for imagePath in imagePaths:

            PIL_img = Image.open(imagePath).convert('L') # convert it to grayscale
            img_numpy = np.array(PIL_img,'uint8')

            id = int(os.path.split(imagePath)[-1].split(".")[1])
            faces = detector.detectMultiScale(img_numpy)

            for (x,y,w,h) in faces:
                faceSamples.append(img_numpy[y:y+h,x:x+w])
                ids.append(id)


    recognizer.train(faceSamples, np.array(ids))

    print ("\n[INFO] Training faces. It will take a few seconds. Wait ...")

    # Save the model into trainer/trainer.yml
    recognizer.write('face_rec/trainer/trainer.yml')

    # Print the numer of faces trained and end program
    print("\n[INFO] {0} faces trained. Exiting Program".format(len(np.unique(ids))))
    return len(np.unique(ids))

def recognige(names):
    recognizer = cv2.face.LBPHFaceRecognizer_create()
    recognizer.read('face_rec/trainer/trainer.yml')
    cascadePath = "face_rec/haarcascade_frontalface_default.xml"
    faceCascade = cv2.CascadeClassifier(cascadePath)

    font = cv2.FONT_HERSHEY_SIMPLEX

    #iniciate id counter
    id = 0
    name = ""
    face_count=0

    # Initialize and start realtime video capture
    cam = cv2.VideoCapture(0)
    cam.set(3, 640) # set video widht
    cam.set(4, 480) # set video height

    # Define min window size to be recognized as a face
    minW = 0.1*cam.get(3)
    minH = 0.1*cam.get(4)

    while True:

        ret, img =cam.read()
        img = cv2.flip(img, 1) # Flip vertically

        gray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)

        faces = faceCascade.detectMultiScale(
            gray,
            scaleFactor = 1.2,
            minNeighbors = 5,
            minSize = (int(minW), int(minH)),
           )

        for(x,y,w,h) in faces:

            cv2.rectangle(img, (x,y), (x+w,y+h), (0,255,0), 2)

            id, confidence = recognizer.predict(gray[y:y+h,x:x+w])
            # Check if confidence is less than 100 ==> "0" is perfect match
            if (confidence < 70):
                roll = str(id)
                if len(roll) == 1: roll = '0'+roll
                id = names[roll]
                confidence = "  {0}%".format(round(100 - confidence))
                text = "Hello "+id

            else:
                id = "unknown"
                roll = None
                confidence = "  {0}%".format(round(100 - confidence))
                text = "I can't recognise you."

            # Logic For Attendance...
            if name == id:
                face_count += 1
                if face_count > 21:
                    face_count = -100
            else:
                name=id
                face_count=0

            if face_count > 20:
                t1 = threading.Thread(target = speak, args=(text, roll))
                t1.setDaemon(True)
                t1.start()


            cv2.putText(img, str(id), (x+5,y-5), font, 1, (255,255,255), 2)
            cv2.putText(img, str(confidence), (x+5,y+h-5), font, 1, (255,255,0), 1)

        cv2.imshow('camera',img)

        k = cv2.waitKey(10) & 0xff # Press 'ESC' for exiting video
        if k == 27:
            break

    print("\n[INFO] Exiting Program...")
    cam.release()
    cv2.destroyAllWindows()
