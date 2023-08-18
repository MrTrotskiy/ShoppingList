const input = document.getElementById('input');
const addButton = document.getElementById('addButton');
const listItemContainer = document.querySelector('.list-items');
const totalAmountElement = document.getElementById('totalAmount');

const listItems = [];

function addItem() {
    const itemName = input.value.trim();

    if (itemName !== '') {
        const newItem = {
            name: itemName,
            quantity: 1
        };

        listItems.push(newItem);
        input.value = '';
        renderList();
    }
}

function renderList() {
    listItemContainer.innerHTML = '';
    let totalAmount = 0;

    listItems.forEach((item, index) => {
        const itemContainer = document.createElement('div');
        itemContainer.classList.add('list-item-container');

        const itemHTML = ` <div class="item-container">
                        <label>
                            <div class="item-container">
                                <input type="checkbox" class="item-checkbox" id="item-${index + 1}">
                                    <label class="checkbox-label" for="item-${index + 1}">
                                    <span class="checkmark"></span>
                                    <span class="item-name">${item.name}</span>
                                </label>
                            </div>
                        </label>
                        <div class="item-actions">
                            <button class="decrease-button" data-index="${index}">
                                <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                        <path d="M8 1l-7 7 7 7" stroke="#ea7f70" stroke-width="2" fill="none"
                                              fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"/>
                                    </g>
                                </svg>
                            </button>
                            <span class="item-quantity">${item.quantity}</span>
                            <button class="increase-button" data-index="${index}">
                                <svg class="icon-arrow-left" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                <g transform="translate(8, 8) rotate(180) translate(-8, -8)">
                                    <path d="M8 1l-7 7 7 7" stroke="#ea7f70" stroke-width="2" fill="none"
                                          fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
        `;
        itemContainer.innerHTML = itemHTML;
        listItemContainer.appendChild(itemContainer);
    });

    updateTotalAmount();
    attachButtonListeners();
}
function attachButtonListeners() {
    const increaseButtons = document.getElementsByClassName('increase-button');
    const decreaseButtons = document.getElementsByClassName('decrease-button');

    for (let i = 0; i < increaseButtons.length; i++) {
        increaseButtons[i].addEventListener('click', () => {
            const index = parseInt(increaseButtons[i].getAttribute('data-index'));
            listItems[index].quantity++;
            renderList();
        });
    }

    for (let i = 0; i < decreaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            const index = parseInt(decreaseButtons[i].getAttribute('data-index'));
            if (listItems[index].quantity > 1) {
                listItems[index].quantity--;
                renderList();
            }
        });
    }
}
function updateTotalAmount() {
    const totalAmount = listItems.reduce((total, item) => total + item.quantity, 0);
    totalAmountElement.textContent = totalAmount;
}

addButton.addEventListener('click', addItem);

renderList();
