from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
import json
from . import costGenerator
from . import modelSelector
import pickle
# model = pickle.load(open('model.pkl','rb'))

# Create your views here.
@api_view(['GET'])
def getData(request):
    return Response("my name is Aditya")

@api_view(['POST'])
def newData(request):
    gotDataDic = json.loads(request.body.decode("utf-8"))
    print(gotDataDic,type(gotDataDic))
    newTrain = costGenerator.CostGenrator(int(gotDataDic["wagcap"]),int(gotDataDic["wagno"]),0,gotDataDic["graphPlot"])
    result = newTrain.generateCost()
    # print(result)
    returnData = {"routePoints":result[0],"totalCost":result[1],"weightFull":result[2],"weightsEach":result[3],"stockFactor":result[4]}
    print(returnData)
    return Response(json.dumps(returnData))

@api_view(['POST'])
def imagePredict(request):
    gotDataDic = json.loads(request.body.decode("utf-8"))
    print(gotDataDic,type(gotDataDic))
    workspace = modelSelector.ModelSelector(1)
    finalRet = {}
    for k in gotDataDic['sendData']:
        retRes = workspace.ImageAnnotor(gotDataDic['sendData'][k]['imageUrl'],gotDataDic['sendData'][k]['imageType'])
        finalRet[k] = {"predictedUrl":retRes[0],"actualVehicles":retRes[1],"invalidVehicles":retRes[2]}
    return Response(json.dumps(finalRet))

@api_view(['POST'])
def numberPredict(request):
    gotDataDic = json.loads(request.body.decode("utf-8"))
    # print(gotDataDic,type(gotDataDic))
    workspace = modelSelector.ModelSelector(1)
    retRes = workspace.vehicleNumberReturn(gotDataDic['imageUrl'],gotDataDic['imageType'])
    print(retRes)
    return Response(json.dumps(retRes))

def videoPredict(request):
    workspace = modelSelector.ModelSelector(1)
    workspace.VideoandLiveAnnotor()
    return Response("my name is Aditya") 