const c = (el)=>document.querySelector(el);        // Para não usar toda hora o query Selector.
const cs = (el)=>document.querySelectorAll(el);                                   

pizzaJson.map((item, index)=>{         // Pegar o Arquivo de pizzas.js {Item é cada pizza, e index é a posição}.
    let pizzaItem = c('.models .pizza-item').cloneNode(true);  // Preecher informações em pizzaItem.

//EXIBINDO INFORMAÇÔES NA TELA PRINCIPAL
    pizzaItem.setAttribute('data-key',index);    //Atibuir a chave da pizza especifica (1/2)
    pizzaItem.querySelector('.pizza-item--img img').src = item.img; // Adicionado imagem das Pizzas na tela.
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`; // Adicionado Preço da pizza na tela  {Template String [`R$ ${}`]} {Para colocar casas decimais [toFixed(2)]}.
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;  // Adicionado nome nas Pizzas na tela.
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;  // Adicionado Descrição da pizza na tela.
    
//QUANDO CLICAR NA PIZZA
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{    // Criando evento para o link (a).
        e.preventDefault();  // Ação para quando clicar na tela não atualizar. { [preventDefault()] ==> Previna a ação padrão}
        let key = e.target.closest('.pizza-item').getAttribute('data-key');   // Atibuir a chave da pizza especifica (2/2)      closest ==> Procure o elemento mais proximo.

//EXIBINDO INFORMAÇÔES NA JANELA DE COMPRA
        c('.pizzaBig img').src = pizzaJson[key].img; // // Adiconar imagem da Pizza na Janela de compra.
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;  // Adiconar o nome da Pizza na Janela de compra.
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;  // Adiconar descrição da Pizza na Janela de compra.



        c('.pizzaWindowArea').style.opacity = 0;          // colocar efeito quando abrir a janela. (1/2)
        c('.pizzaWindowArea').style.display = 'flex'; // Adicionar a Janela de compra ==> de display none para flex.
        setTimeout(()=>{
             c('.pizzaWindowArea').style.opacity = 1;  // Adicionando efeito de transição setando um tempo entre 0 e 1. (2/2)
        }, 200);
    });
   

    c('.pizza-area').append(pizzaItem);            // {Exibir na tela}.

});