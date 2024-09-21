const getdata = () => {
   const data = JSON.parse(localStorage.getItem('EmployeeData')) ;
   if(!data){
    return[]
   }else{
    return data
   }
};

export default getdata;


