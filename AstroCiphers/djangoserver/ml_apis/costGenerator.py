import math
trainDetails = {"dist":0,"perCap":30,"no":6,"loaded":0}
minePoints = {1:100,2:150,3:200,4:250,5:100,6:150,7:200,8:250,9:100,10:150,11:200,12:250,13:100,14:150,15:200,16:250,17:100,18:150,19:200,20:250,21:100,22:150,23:200,24:250,25:100,26:150,27:200,28:250,29:100,30:150,31:200,32:250,33:100,34:150,35:200,36:250,37:100,38:150,39:200,40:250,41:100,42:150,43:200,44:250,45:100,46:150,47:200,48:250,49:100,50:150,51:200,52:250,53:100,54:150,55:200,56:250,57:100,58:150,59:200,60:250,61:100,62:150,63:200,64:250,65:100,66:150,67:200,68:250,69:100,70:150,71:200,72:250,73:100,74:150,75:200,76:250,77:100,78:150,79:200,80:250,81:100,82:150,83:200,84:250,85:100,86:150,87:200,88:250,89:100,90:150,91:200,92:250,93:100,94:150,95:200,96:250,97:100,98:150,99:200,100:250,101:100,102:150,103:200,104:250,105:100,106:150,107:200,108:250,109:100,110:150,111:200,112:250,113:100,114:150,115:200,116:250,117:100,118:150,119:200,120:250,121:100,122:150,123:200,124:250,125:100,126:150,127:200,128:250,129:100,130:150,131:200,132:250,133:100,134:150,135:200,136:250,137:100,138:150,139:200}
# routeMap = [[1,1,1,1,1],
#             [1,0,1,0,1]
#             [1,1,0,1,0]
#             [1,0,1,0,1]
#             [1,1,0,1,0]]
# routeMap = {0:[1,2,3,4,5],1:[2,3,4,5],2:[1,3,5],3:[1,2,4],4:[1,3,5],5:[1,2,4]}
# pointDistance = {1:{2:50,3:50,4:50,5:50,6:50},
#                  2:{1:50,3:50,4:50,5:50,6:50},
#                  3:{1:50,2:50,4:50,5:50,6:50},
#                  4:{1:50,2:50,3:50,5:50,6:50},
#                  5:{1:50,2:50,3:50,4:50,6:50},
#                  6:{1:50,2:50,3:50,4:50,5:50}}

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
# int3 = int(input("Enter initial load (for Testing keep it 0) = "))
# route,totalCost,initCap = CostGenrator(int1,int2,int3).generateCost()

# print("\n\nRoute map : ",end = "")
# for k in route:
#     print(k," =>",end=" ")
# print()
# print("Total Weight Fulfilled = ",initCap)
# print("Total cost Expend = ",totalCost)


                
                
