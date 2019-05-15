export default class Service {

  static  get(url){
    return   fetch(url,{
      mode:"cors"
    })
    .then((data)=>{
      return data.json();
    })
    .then((data)=>{
      return data;
    })
    .catch(error=>{
      throw new Error(error.toString());
    })
  }

  static update(url,data=[],methode='POST'){
    return  fetch(url,{
      mode:"cors",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(data),
      method:methode
    }).then(data=>{
      return data.json();
    })
    .then(data=>{
      return data;
    })
    .catch(e=> {
      console.log(e);
    });
  }



}
