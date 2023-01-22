export const getData = async(url) => {
   try{
    const {data, status} = await axios.get(url);
    //console.log(data);
    return data;
   } catch (error){
    console.log(error)
   }
}

// const getData2 = (url)  => {
//    axios.get(url).then(({data}) => {
//       console.log(data)
//    }).catch((error) => {
//       console.log(error)
//    })

// }


// const getData3 = async(url) =>{
//    try{
//     const response = await fetch();
//     const resp = await response.json();
//     return resp;
//    } catch (error){
//     console.log(error)
//    }
// }


// const getData4 = () => {
//   fetch(url).then((response) => {
//         response.json().then((resp) => {
//            console.log(resp)
//         })
//   }).catch((error) => {
//     console.log(error)
//  })
// }