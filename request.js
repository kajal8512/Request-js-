fs=require("fs")
let user=require("readline-sync")
const axios=require("axios");
axios.get("https://api.merakilearn.org/courses")

.then(resp=>{
    response=resp.data
    // console.log(response)
    file=JSON.stringify(response,null,3)
    data=fs.writeFileSync("CourseData.json",file)
    inc=0
    for(data_indx of response){
        console.log(inc+1,":",data_indx["name"],"Id:",data_indx["id"])
        inc++;
    }
    let user_input=user.question("Enter the DataId")
    console.log(response[user_input-1]["name"])
    let DataId=(response[user_input-1]["id"])
    // var id = response[DataId-1]["id"]
    // console.log(id)

    secLink=axios.get("https://api.merakilearn.org/courses/"+DataId+"/exercises")
    .then(resp=>{
        resps=resp.data
        // console.log(resps)
        file2=JSON.stringify(resps,null,3)
        data2=fs.writeFileSync("ChildernExercises.json",file2)
        resps_data=resps["course"]["exercises"]
        console.log(resps_data)
        serialNo=0
        for(exer in resps_data){
            console.log(serialNo+1,resps_data[exer]["name"])
            serialNo+=1
        }

        question=user.question("enter the exercises no.")
        var slug=resps_data[question]["content"]
        console.log(slug)

    })
    .catch(error=>{
        console.log("Error")
    })

})
.catch(Error=>{
    console.log("Error")
})