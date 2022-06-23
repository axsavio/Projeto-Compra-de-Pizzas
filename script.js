let modalQt = 1;  // Deixar a quantidade padrao de 1 pizza quando abrir o modal.(1/2)
let cart = []; // Variavel do carrinho
let modalKey = 0; // para armazenar qual pizza , mesmo quando o modal estiver fechado, serve para o carinho.

const c = (el)=>document.querySelector(el);        // Para não usar toda hora o query Selector.
const cs = (el)=>document.querySelectorAll(el);                                   

//*LISTAGENS DAS PIZZAS*
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
        modalQt = 1;  //Zerar quantidade de pizza o modal
        modalKey = key; // para armazenar qual pizza , mesmo quando o modal estiver fechado, serve para o carinho.

//EXIBINDO INFORMAÇÔES NA JANELA DE COMPRA (MODAL')
        c('.pizzaBig img').src = pizzaJson[key].img; // // Adiconar imagem da Pizza na Janela de compra.
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;  // Adiconar o nome da Pizza na Janela de compra.
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;  // Adiconar descrição da Pizza na Janela de compra.
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${ pizzaJson[key].price.toFixed(2)}`; // Adiconar preço atual na pizza.
        c('.pizzaInfo--size.selected').classList.remove('selected'); //Tirar a seleção do intem pizza grande por padrão.
        cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{         //Adicionar peso da pizza desejada.
            if(sizeIndex == 2){
                size.classList.add('selected');    // Colocar a seleçao no index 2 na pizza grande.
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];

        });

        c('.pizzaInfo--qt').innerHTML = modalQt;   // Deixar a quantidade padrao de 1 pizza quando abrir o modal.(2/2)

        c('.pizzaWindowArea').style.opacity = 0;          // colocar efeito quando abrir a janela. (1/2)
        c('.pizzaWindowArea').style.display = 'flex'; // Adicionar a Janela de compra ==> de display none para flex.
        setTimeout(()=>{
             c('.pizzaWindowArea').style.opacity = 1;  // Adicionando efeito de transição setando um tempo entre 0 e 1. (2/2)
        }, 200);
    });
   

    c('.pizza-area').append(pizzaItem);            // {Exibir na tela}.

});

//*EVENTOS DO MODAL*
function closeModal (){ //Funçao para fechar o modal
    c('.pizzaWindowArea').style.opacity = 0; //Transiçao ao fechar
    setTimeout(()=>{
        c('.pizzaWindowArea').style.display = 'none'; //Remover a janela de modal da tela.
    },500 );
}
cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{  //Açao para quando clicar nos botões de voltar e fechar.
    item.addEventListener('click',closeModal);
});

c('.pizzaInfo--qtmenos').addEventListener('click', ()=>{  // Evento de clique para  diminuir a quantidade.
    if(modalQt > 1){ // Criou o if pq o padrão já é 1 , desse if não permite diminir quando estiver só com um. (só diminue quando (modalQt > 1))
        modalQt--; // Diminuir a qt usando a  modalQt
    c('.pizzaInfo--qt').innerHTML = modalQt;  // Novo valor da variavel do modal
    }
    
});

c('.pizzaInfo--qtmais').addEventListener('click', ()=>{  // Evento de clique para aumentar  a quantidade.
    modalQt++; // Aumentar a qt usando a  modalQt
    c('.pizzaInfo--qt').innerHTML = modalQt;  // Novo valor da variavel do modal
});

cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{         // Adicionar ação quando for escolher o tamanho da pizza.
    size.addEventListener('click',(e)=>{
        c('.pizzaInfo--size.selected').classList.remove('selected'); // Tirando a seleção.
        size.classList.add('selected'); // Adicionar seleção no icone clicado.
    })
});
c('.pizzaInfo--addButton').addEventListener('click',()=>{ // Adicionar ao carrinho
     let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key')); //Pegar o tamanho da pizza. // parseInt = Transformar String em inteiro.

    let identifier = pizzaJson[modalKey].id +'@'+ size;   //Juntar id da pizza com seu tamanho (indentificador)

    let key = cart.findIndex((item)=> item.identifier == identifier);  //Fazer a incrementação correnta nos ites no carrinho. // se nao achar fica com -1 {== -> Verificar}

            if(key > -1){  // Se achou só muda a quantidade.
               cart[key].qt += modalQt; 

            }else{ // Se não achou faz o processo de inserção normalmente.
                    cart.push({      // {}-> adiciona objeto dentro do array
                    identifier,
                    id: pizzaJson[modalKey].id, //Pegar Qual é a pizza pelo id.
                    size, // Pegar o tamanho da pizza.
                    qt:modalQt //Pegar a quantitade.
                  });
                }
     updateCart(); //Atulizar o carrinho antes de fechar           
     closeModal(); // Fechar o modal quando tiver com a pizza escolhida
});

//CARRINHO
function updateCart() {  //Funçao para atulizar o carrinho
    if (cart.length > 0) { // caso tenha ites no carrinho mostre
        c('aside').classList.add('show');
        c('.cart').innerHTML = ''; //Para zerar o item

        let subtotal = 0; //Variaveis para calculos
        let desconto = 0;
        let total = 0;


        for(let i in cart){ // for pra exibir item a item na tela

            let pizzaItem = pizzaJson.find((item)=> item.id == cart[i].id); // Procurar o id dentro da pizzaJason - Retorna os itens da pizza mesmo.
            subtotal += pizzaItem.price * cart[i].qt; // calculo subtotal

            let cartItem = c('.models .cart--item').cloneNode(true); // Pegar todo mundo. Clonar

            let pizzaSizeName;
            switch(cart[i].size){ //Para exibir P M G para o Usuario
                case 0:
                    pizzaSizeName ='P'
            break;
                case 1:
                    pizzaSizeName ='M'
            break;
                case 2:
                    pizzaSizeName ='G'
            break;

            } 
            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`; // concatenação de nome com Tamanho

            cartItem.querySelector('img').src = pizzaItem.img; //Exibir a imagem
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName  // Exibir o nome e tamanho da pizza
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt; //Exibir a Quantidade
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{   // Permitir o usuario remover itens direto no carrinho
                    if(cart[i].qt > 1){ // so diminue se ate no maximo 1
                        cart[i].qt--

                    } else {
                        cart.splice( i, 1); //Função que remove (splice)
                    }
                    updateCart(); // reatualizar o carrinho para mostrar a quantidade ou fechar caso seja 0.
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{   // Permitir o usuario a adicionar mais itens direto no carrinho
                    cart[i].qt++; // adicionar
                    updateCart(); 
            });



            c('.cart').append(cartItem); // Adicionar todo mundo no clone
            
        }

        desconto = subtotal * 0.1; // Calculo desconto.
        total = subtotal - desconto; // Calculo TOTAL..

        c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}` ; //pegar ultimo item do span
        c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}` ; 
        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}` ; 

    } else {
        c('aside').classList.remove('show');
    }
} 