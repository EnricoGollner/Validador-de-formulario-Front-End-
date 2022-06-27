const selector = (el) => document.querySelector(el)

let validator ={
    handleSubmit: (event)=>{
        event.preventDefault()  // Para o evento padrão, impedindo-o de acontecer

        let send = true

        let inputs = form.querySelectorAll('input')  // Pega todos os inputs(campos) os colocando em um array
        
        validator.clearErrors()  // Limpa os erros que tiveram antes para refazer a validação
        
        for(let i = 0; i < inputs.length; i++){  // percorrendo para verificar cada input/campo
            let input = inputs[i]
            let check = validator.checkInput(input)
            if(check !== true){  // Significa que deu algum erro
                send = false
                // Exibir o erro:
                validator.showError(input, check)
            }
        }

        if(send){  // 'Se a variável send for true'
            form.submit()  // Envia o formulário se o send for true
        }

    },
    checkInput: (input) => {
        let rules = input.getAttribute('data-rules')
        if(rules !== null){  // Significa que tem alguma regra
            rules = rules.split('|')  // Fatia a variável em quem separa as palavras | Se não tiver '|', vai aparecer um item só
            for(let k in rules){  // Verificando cada uma das regras
                let detalhes_regra = rules[k].split('=')  // Se não tiver '=', vai aparecer um item só
                
                switch(detalhes_regra[0]){  // Verificar cada uma das regras
                    case 'required': 
                        if(input.value == ''){  // Se o campo estiver vazio
                            return 'Preencha este campo!'
                        }
                    break
                    case 'min':
                        if(input.value.length < detalhes_regra[1]){  // Lê-se: 'Se a quantidade de caracteres digitados forem menor que o segundo detalhe da regra(no caso, menor que 2):'
                            return `Mínimo de ${detalhes_regra[1]} caracteres`
                        }
                    break
                    case 'email':
                        if(input.value != ''){ // Se está preenchido
                            let regex =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/  // regex (expressões regulares) com todos os requisitos de um e-mail para verificarmos abaixo se é ou não e-mail
                            if( !regex.test(input.value.toLowerCase() )){  // 'Se não passar no teste' (REPARE QUE ANTES DE 'regex' estamos negando com o operador lógico '!')
                                return 'Só é permitido e-mail!'
                            }
                        }
                    break
                }

            }
        }

        return true
    },
    showError: (input, error) =>{
        input.style.borderColor = '#F00'

        let errorElement = document.createElement('div')
        errorElement.classList.add('error')
        errorElement.innerHTML = error

        // Adicionando a informação do erro no local certo:
        // A função em sí adicionaria o errorElement embaixo do elemento anterior ao atual(input) 
        input.parentElement.insertBefore(errorElement, input.nextElementSibling)  
        // mas ai temos a propriedade atrelada ao input(  .nextElementSibling ) que jogaria para cima do próximo input, ficando abaixo do atual na lógica
    },
    clearErrors: ()=>{
        let inputs = form.querySelectorAll('input')  // Retorna e armazena na variável um vetor com os elementos 'input' de dentro do elemento form
        for(let i = 0; i < inputs.length; i++)[
            inputs[i].style = ''  // Removo o style do input que deu erro
        ]

        let errorElements = document.querySelectorAll('.error')  // Retorna e armazena na variável um vetor com todos as divs criadas com classList 'error'
        for(let i = 0; i < errorElements.length; i++){
            errorElements[i].remove()  // Remove o(s) elemento(s)
        }
    }
}

let form = selector('.validator')
form.addEventListener('submit', validator.handleSubmit)
