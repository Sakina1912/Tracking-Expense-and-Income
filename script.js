const amount = document.getElementById('amount')
// const add = document.getElementById('btn-add')
const form = document.getElementById('form')
const text = document.getElementById('text')
const list = document.getElementById('list')
const balance = document.getElementById('balance')
const money_plus = document.getElementById('money-plus')
const money_minus = document.getElementById('money-minus')


const getLocalStorageTransactions = JSON.parse(localStorage.getItem('transactions'))

let transactions = localStorage.getItem('transactions') !== null ? getLocalStorageTransactions : []

function addTransactions(e){
    e.preventDefault()

    if(text.value.trim() === '' || amount.value.trim() === ''){
        alert('Please add transaction values to be added')
    }else{
        const transaction = {
            id : generateId(),
            text : text.value,
            amount: +amount.value
        }

        transactions.push(transaction)
        addTransactionsToDOM(transaction)
        updateValues()
        updateLocalStorage()
        text.value=''
        amount.value=''
    }
}

function updateLocalStorage(){
    localStorage.setItem('transactions',JSON.stringify(transactions))
}

function generateId(){
    return Math.floor(Math.random()*1000000)
}

function addTransactionsToDOM(transaction){
    const sign = transaction.amount < 0 ? '-' : '+'

    const item = document.createElement('li')

    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')

    item.innerHTML=`${transaction.text} <span>${sign}&#8377;${Math.abs(transaction.amount)}<i class="far fa-window-close fa-2x" onclick="removeTransaction(${transaction.id})"></i></span>`

    list.appendChild(item)
}

function init(){
    list.innerHTML=``

    transactions.forEach(addTransactionsToDOM)
    updateValues()
}

init()

function removeTransaction(id){
    transactions = transactions.filter(item =>item.id !== id)
    updateLocalStorage()
    init()
}

function updateValues(){
    const amount = transactions.map(item => item.amount)

    const total = (amount.reduce((acc,item) => (acc+=item),0)).toFixed(2)
    console.log(total)
    const income = (amount.filter(item => item > 0).reduce((acc,item) => (acc+=item) ,0)).toFixed(2)
    const expense = (amount.filter(item => item < 0).reduce((acc,item) => (acc+=item) ,0) * -1).toFixed(2)

    console.log(expense)

    balance.innerText=`₹${total}`
    money_plus.innerText=`₹${income}`
    money_minus.innerText=`₹${expense}`
}

form.addEventListener('submit',addTransactions)
