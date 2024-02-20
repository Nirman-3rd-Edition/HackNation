class Lane:
    def __init__(self,valid,invalid,currsignal,turning,noLane):
        self.valid = valid if(valid) else 0
        self.invalid = invalid if(invalid) else 0
        
        #green = 3, red = 1, yellow = 2
        self.currsignal = currsignal if(currsignal) else 2
        self.turning = True if(turning) else False
        self.noLane = noLane if(noLane) else 1
    
    def 