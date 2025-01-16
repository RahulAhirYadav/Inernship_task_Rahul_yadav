import mysql.connector
from mysql.connector import Error

class Todo_list:
    def __init__(self):
        self.connection = mysql.connector.connect(
            host="localhost",
            user="root",
            password="",
            database="dbmyclass"
        )
        self.cursor = self.connection.cursor()
    def Add_task(self):
        try:
            id=int(input("Enter the id"))
            title = input("Enter the Task: ")
            status=input("enter the status:")
        
            sql = "INSERT INTO todo (id,title,status) VALUES (%s,%s, %s)"
            values = (id,title,status)
            
            self.cursor.execute(sql,values)
            self.connection.commit()
            print("Record inserted")
        except:
            print("exeption")

    def  Show_task(self):
         try:
            sql="select* from Todo"
            self.cursor.execute(sql)
            rec=self.cursor.fetchall()
            

            for i in rec:
              output=" id:{} ,Title is :{}, Status:{}".format(i[0],i[1],i[2])
              print(output)
         except:
            print("Exeption")
    def Edit_task(self):

         try:
            id=int(input("enter the id:"))
           
            title = input("Enter the Task: ")
            status=input("enter the status:")
           

            sql = "update Todo set title=%s,status=%s where id=%s "
            
            self.cursor.execute(sql,(title,status,id,),)
            
            self.connection.commit()
            print("Record update")
         except:
            print("exeption")
    def Remove_task(self):
        try:
           id=int(input("enter the id"))
           sql="delete from Todo where id=%s"
           self.cursor.execute(sql,(id,))
            
           self.connection.commit()
           print("delete your record")
        except:
            print("exeption")   
        

    def main(self):           
        print("----------------------------------------------------------Welcome to ToDo List--------------------------------------------------------------------")
        n1=input("you perform any opertion so press yes and exit no:")
        n1=n1.lower()
        while (n1=='yes'):
          print(" **************------------------------------------------------------------------------------------------------------------------------------------------*************")
          print("                    --------------------------------- Select your choice----------------------------------------")
          print("                                         Add New Task so press: 1")
          print("                                         show  all List of Task so press: 2")
          print("                                         update the Task so press: 3")
          print("                                         delete the Task  so press: 4")
          choice=int(input("Enter the chosse the number:"))
          if(choice==1):
            ob=Todo_list()
            ob.Add_task()
            print("inesrt your record succesfull")
          elif(choice==2):
             ob=Todo_list()
             ob.Show_task()
          elif(choice==3):
             ob=Todo_list()
             ob.Edit_task()
           
          
          elif(choice==4):
            ob=Todo_list()
            ob.Remove_task()
          else:
              print("Enter correct number")
          n1=input("you want to continue to press, yes wise no: ")

ob1=Todo_list()
ob1.main()    



