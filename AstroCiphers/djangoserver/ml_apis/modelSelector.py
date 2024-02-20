class CostGenrator:
    def __init__(self,perCap,no,loaded,pointDistance):
        self.perCap = perCap
        self.no = no
        self.loaded = loaded
        self.pointDistance = pointDistance
    
    def getWagLoadVal(self,coalProdCap,maxCap):
        if self.loaded+coalProdCap<=maxCap:
            return coalProdCap
        else:
            return maxCap-self.loaded
        
    def generateCost(self):
        pointDistance = self.pointDistance
        finalRoute = []
        finalweight = []
        totalCost = 0
        initialCap = 0
        maxCap = self.perCap*self.no
        currPos = "0"
        ctr = 0
        while initialCap!=maxCap:
            selPoint = -1
            selCost = -1
            for x in pointDistance[currPos]:
                if x not in finalRoute and pointDistance[currPos][x]!="-1":
                    distCost = math.floor(((self.loaded/maxCap)*100)+int(pointDistance[currPos][x]))
                    wagCost = math.floor(100-((self.loaded+self.getWagLoadVal(minePoints[int(x)],maxCap))/maxCap)*100)
                    total = distCost+wagCost
                    if(selCost<0):
                        selCost = total
                        selPoint = x
                    else:
                        if total<selCost:
                            selCost = total
                            selPoint = x
            ctr+=1
            if(selPoint==-1):
                break
            currPos = str(selPoint)
            initialCap+=self.getWagLoadVal((minePoints[int(currPos)]),maxCap)
            prev = self.loaded
            self.loaded = initialCap
            totalCost+=selCost
            finalRoute.append(selPoint)
            finalweight.append(str(self.loaded-prev))
        stockFactor = 0
        for k in range(len(finalRoute)):
            xfactor = math.floor(int(finalweight[k])/self.perCap*self.no)
            ni = len(finalRoute)-k
            stockFactor+=(xfactor*ni)
        stockFactor = math.floor(stockFactor/len(finalRoute))
        print(finalRoute,totalCost,self.loaded,finalweight,stockFactor)
        return finalRoute,totalCost,self.loaded,finalweight,stockFactor

# int1 = int(input("Enter Capacity per Wagon = "))
# int2 = int(input("Enter No. of wagons = "))
from roboflow import Roboflow
# int3 = int(input("Enter initial load (for Testing keep it 0) = "))
# route,totalCost,initCap = CostGenrator(int1,int2,int3).generateCost()

# print("\n\nRoute map : ",end = "")
# for k in route:
#     print(k," =>",end=" ")
import cv2
# Load the pre-trained Haar Cascade classifier for face detection
# face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# Function to perform object detection
# def detect_objects(image_path):
#     # Read the input image
#     image = cv2.imread(image_path)from inference import get_roboflow_model
#     # Convert the image to grayscale
#     gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
from inference import get_roboflow_model
#     # Perform face detection
#     faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5)


#     # Draw rectangles around the detected faces
#     for (x, y, w, h) in faces:
#         cv2.rectangle(image, (x, y), (x+w, y+h), (0, 255, 0), 2)

#     # Display the result
#     cv2.imshow('Object Detection', image)
#     cv2.waitKey(0)
#     cv2.destroyAllWindows()

# # Replace 'path_to_your_image.jpg' with the path to the image you want to test
# image_path = 'path_to_your_image.jpg'
rf = Roboflow(api_key="ZL1FPZ5KWA67VOUO9Pzx")
import cv2
import numpy as np

# Load pre-trained MobileNet SSD model and its configuration
class OneTry:
    def __init__(self):
        net = cv2.dnn.readNetFromTensorflow('path/to/ssd_inception_v2_coco/frozen_inference_graph.pb',
                                            'path/to/ssd_inception_v2_coco/ssd_inception_v2_coco.pbtxt')

        # Open a video capture object (0 is usually the default camera)
        cap = cv2.VideoCapture(0)

        while True:
            # Read a frame from the camera
            ret, frame = cap.read()

            # Resize the frame for faster processing
            frame = cv2.resize(frame, (300, 300))

            # Prepare the frame for object detection
            blob = cv2.dnn.blobFromImage(frame, 0.007843, (300, 300), 127.5)

            # Set the input to the neural network
            net.setInput(blob)

            # Perform object detection
            detections = net.forward()

            # Loop over the detections
            for i in range(detections.shape[2]):
                confidence = detections[0, 0, i, 2]
                
                # If confidence is above a certain threshold (e.g., 0.5), draw bounding box
                if confidence > 0.5:
                    box = detections[0, 0, i, 3:7] * np.array([300, 300, 300, 300])
                    (startX, startY, endX, endY) = box.astype("int")

                    cv2.rectangle(frame, (startX, startY), (endX, endY), (0, 255, 0), 2)

                    # Display class label and confidence
                    label = f"Confidence: {confidence:.2f}"
                    cv2.putText(frame, label, (startX, startY - 10),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)

            # Display the frame with detections
            cv2.imshow("Object Detection", frame)

            # Break the loop if 'q' key is pressed
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        # Release the video capture object and close all windows
        cap.release()
        cv2.destroyAllWindows()

project = rf.workspace().project("test-2-g3mkp")
# detect_objects(image_path)

# print()
livemodel = get_roboflow_model(model_id="test-2-g3mkp/18",api_key="ZL1FPZ5KWA67VOUO9Pzx")
# print("Total Weight Fulfilled = ",initCap)
# print("Total cost Expend = ",totalCost)
import numpy as np
import cv2
import pafy
import time
import torch


class ObjectDetection:
    #Yolov5 model using open cv
    
    def __init__(self):

        self.model = project.version(18).model
        self.classes = ['Vehicle','invalid']
        # self.device = 'cuda' if torch.cuda.is_available() else 'cpu'
        # print("\n\nDevice Used:",self.device)
    
    def load_model(self):
        #loading a pretrained model
        rf = "ZL1FPZ5KWA67VOUO9Pzx"
        project = rf.workspace().project("test-2-g3mkp")
        model = project.version(18).model
        return model
    def score_frame(self,frame):
        #Making a frame
        self.model.to(self.device)
        frame = [frame]
        results = self.model(frame)
        labels,cord = results.xyxyn[0][:,-1],results.xyxyn[0][:,:-1]
        return labels,cord
    def class_to_label(self,x):
        return self.classes[int(x)]
    
    def plot_boxes(self,results,frame):
        #Plotting box around image
        labels,cord = results
        n = len(labels)
        x_shape,y_shape = frame.shape[1], frame.shape[0]
        for i in range(n):
            row = cord[i]
            if row[4] >=0.2:
                x1,y1,x2,y2 = int(row[0]*x_shape), int(row[1]*y_shape), int(row[2]*x_shape), int(row[3]*y_shape)
                bgr = (0,255,0)
                cv2.rectangle(frame,(x1,y1),(x2,y2),bgr,2)
                cv2.putText(frame,self.class_to_label(labels[i]),(x1,y1), cv2.FONT_HERSHEY_SIMPLEX,0.9,bgr,2)
        return frame
    
    def __call__(self):
        cap = cv2.VideoCapture(0)
        while cap.isOpened():
            start_time = time.perf_counter()
            ret,frame = cap.read()
            if not ret:
                break
            results = self.score_frame(frame)
            frame = self.plot_boxes(results,frame)
            end_time = time.perf_counter()
            fps = 1/np.round(end_time-start_time,3)
            cv2.putText(frame,f'FPS: {int(fps)}',(20,70),cv2.FONT_HERSHEY_SIMPLEX,1.5,(255,0,0),3)
            cv2.imshow('img',frame)
            
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break


class ModelSelector:
    def __init__(self,modelNumber):
        self.modelNumber = modelNumber
        self.noRetModel = ObjectDetection().model
        self.imgModel = livemodel

    def ImageAnnotor(self,imageString,imgType):
        import io, base64,os
        from PIL import Image

        # Assuming base64_str is the string value without 'data:image/jpeg;base64,'
        img = Image.open(io.BytesIO(base64.decodebytes(bytes(imageString, "utf-8"))))
        imgName = "server."+imgType
        img.save(imgName)
        import supervision as sv
        # import cv2 to helo load our image
        import cv2

        # define the image url to use for inference
        image_file = imgName
        image = cv2.imread(image_file)


        # load a pre-trained yolov8n model
        modelimg = self.imgModel

        # run inference on our chosen image, image can be a url, a numpy array, a PIL image, etc.
        results = modelimg.infer(image)

        # load the results into the supervision Detections api
        detections = sv.Detections.from_roboflow(results[0].dict(by_alias=True, exclude_none=True))

        # create supervision annotators
        bounding_box_annotator = sv.BoundingBoxAnnotator()
        label_annotator = sv.LabelAnnotator()

        # annotate the image with our inference results
        annotated_image = bounding_box_annotator.annotate(
            scene=image, detections=detections)
        annotated_image = label_annotator.annotate(
            scene=annotated_image, detections=detections)

        # display the image
        # sv.plot_image(annotated_image)

        cv2.imwrite("annnot.jpg", annotated_image)
        print("i am here")
        image_file = open("annnot.jpg", "rb")
        image_binary = image_file.read()
        image_file.close()
        base64_encoded = base64.b64encode(image_binary).decode('utf-8')
        print(base64_encoded)

        data_url = f"data:image/jpeg;base64,{base64_encoded}"
        if os.path.isfile("annnot.jpg"):
            os.remove("annnot.jpg")
        data = self.noRetModel.predict(imgName, confidence=40, overlap=30).json()

        vehicle = 0
        invalid = 0
        for k in data['predictions']:
            if k['class'] == 'Vehicle':
                vehicle+=1
            elif k['class'] == 'invalid':
                invalid+=1
        print("Actual Vehicles = {}...Invalid Vehicles = {}".format(vehicle,invalid))

        if os.path.isfile(imgName):
            os.remove(imgName)
            
        return data_url,vehicle,invalid

        
    def VideoandLiveAnnotor(self):
        from inference import InferencePipeline
        # Import the built-in render_boxes sink for visualizing results
        from inference.core.interfaces.stream.sinks import render_boxes
        # Initialize a pipeline object with the built-in webcam (video_reference=0)
        pipeline = InferencePipeline.init(
            model_id="test-2-g3mkp/18",  # Roboflow model to use
            video_reference=0,  # Use the built-in webcam
            on_prediction=render_boxes,  # Function to run after each prediction
        )
        pipeline.start()
        pipeline.join()

    def vehicleNumberReturn(self,imageString,imgType):
        import io, base64,os
        from PIL import Image

        # Assuming base64_str is the string value without 'data:image/jpeg;base64,'
        img = Image.open(io.BytesIO(base64.decodebytes(bytes(imageString, "utf-8"))))
        imgName = "server."+imgType
        img.save(imgName)
        data = self.noRetModel.predict(imgName, confidence=40, overlap=30).json()

        vehicle = 0
        invalid = 0
        for k in data['predictions']:
            if k['class'] == 'Vehicle':
                vehicle+=1
            elif k['class'] == 'invalid':
                invalid+=1
        print("Actual Vehicles = {}...Invalid Vehicles = {}".format(vehicle,invalid))

        if os.path.isfile(imgName):
            os.remove(imgName)
        return vehicle,invalid