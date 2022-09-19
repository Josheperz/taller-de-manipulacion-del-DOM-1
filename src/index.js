
const baseUrl = "https://platzi-avo.vercel.app";

//web api
//conctatnos al server
//Intl -api de internacionalizacion
  //1- formato para fechas
  //2- formato para monedas

const appNode = document.querySelector('#app');
appNode.className = 'justify-evenly';
appNode.style = 'display:grid; grid-template-columns: repeat(auto-fit, 288px); margin-top:20px';

const formatPrice = (price) =>{
  const newPrice = new window.Intl.NumberFormat("es-US",{
    style:"currency",
    currency: "USD",
  }).format(price); 

  return newPrice;
};

window
  .fetch(`${baseUrl}/api/avo`)
  //procesar la respuesta, convertirla en JSON
  .then((respuesta) => respuesta.json())
  //JSON -> Data -> renderizar info browser
  .then((responseJson) => {
    const todosLosItems = []
    responseJson.data.forEach((item) => {
    //crear ima
      const image = document.createElement('img');
      image.src = `${baseUrl}${item.image}`;
      image.className = 'w-14 rounded-full mr-2 ';
    // crear div container-title-price
    const containerTitlePrice = document.createElement('div');
   
    //crear title
      const title = document.createElement('h2');
      title.textContent = item.name;
      title.style.fontSize = '1rem';
      title.className = 'w-max font-semibold ';
     

      //crear price
      const price = document.createElement('div');
      price.textContent = formatPrice(item.price);
      price.className = 'text-xl text-red-900 w-max col-start-2 -mt-2 myClass';
      
      const container = document.createElement('div');
      container.className = 'hover:bg-green-200 rounded-xl grid grid-flow-col p-2 justify-start' ;
     container.style = 'width:250px';

      containerTitlePrice.append(title,price);
      container.append(image,containerTitlePrice);
      
       
      todosLosItems.push(container);

 //para obtener  informacion especifica de los objetos
     /* console.log(item.price); */
    }); 

 appNode.append(...todosLosItems);
 

  });
