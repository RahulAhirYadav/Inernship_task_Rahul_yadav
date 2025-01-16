new_list=[]
def add_news():
   print("Details of news")
   Title=input("Enter the titel: ")
   details=input("enter the details: ")
   photo=input("enter the path or url: ")
   ls=(Title,details,photo)
   new_list.append(ls)
   print("add data susscefully")
def show_news():
   
   for i in new_list:
      output="Title is :{}, detail is:{}, photo is:{}".format(i[0],i[1],i[2])
     #print(f"titel is:{i[0]}, detail is:{i[0]}, photo is{i[0]}")
      print(output)
def main():
 
 print("************ Select your choiche ***************")
 print("Add new Details then enter : 1")
 print("show all  News List then enter : 2")
 print("Exits App s0 enter :3")
 print("****************************************************************************************************")
 n1=input(" we want to continue to press ,yes wise no: ")
 n1=n1.lower()
 while (n1=='yes'):

   
   choiche=int(input("Enter the Choiche:"))
   if choiche== 1:
      add_news()
   elif choiche==2:
      show_news()
   elif choiche==3:
      break
   else:
      print("select your right choiche")
      
   n1=input(" we want to continue to press ,yes wise no: ")
main()
