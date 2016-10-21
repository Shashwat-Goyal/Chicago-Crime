
var fs=require('fs');  // importing the file system module
var readLine = require('readline'); // importing the readline module

//creating an interface to define the input & output variables.
var rd=readLine.createInterface({	
	input:fs.createReadStream('crimes2001onwards.csv'),
	output:fs.createWriteStream('Requirement2.json')
});

// initializing the variables required
var jsonObj=[];
var flag=0;

var arr=[];

//reading data from the csv file using the 'on' line event
rd.on('line', function(line){

	arr=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
	if(flag==0){
		flag=1;
			}
	else if(arr[17]<2001 || arr[17]>2016){
		;
	}
	else{
			var a=jsonObj.findIndex(fnValidate); // checking if an year already exists in our final object 
			if(a==-1){
				
				var myObj={};
				myObj.Year=arr[17];
				myObj.Arrests=0;
				myObj.NonArrests=0;
				jsonObj.push(myObj);
				a=jsonObj.length-1;
			}
			
				
				if(arr[5]==='ASSAULT' && arr[8]=='false'){
					++jsonObj[a].NonArrests; //increae the count of Non-Arrests if found
					
				}

				 if(arr[5]==='ASSAULT' && arr[8]=='true'){
					
					++jsonObj[a].Arrests;  //increae the count of Arrests if found
				}
			
		}
});

//a function returning true if an Year is already present in our JSon object.
function fnValidate(a){
	return a.Year===arr[17];
}

// End of file using the 'on' close event
rd.on('close',function()
{

// writng the file through our output variable to abc.json
rd.output.write(JSON.stringify(jsonObj));
console.log(jsonObj);
console.log("done");
});

