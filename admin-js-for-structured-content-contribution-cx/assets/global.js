/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

var selectorValue = '3';

const asyncQuerySelector = (container, selector) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const element = container.querySelector(selector);

            if (element) {
                resolve(element);
                return;
            } else {
                reject();
            }
        }, 100);
    });
};

const asyncFindElement = async (container, selector, timeout = 3000) => {
    let counter = 0;
    let timeoutExpired = false;
    const timer = setTimeout(() => (timeoutExpired = true), timeout);

    while (true) {
        if (timeoutExpired) {
            throw new Error(`Element not found: ${selector}`);
        }

        try {
            const element = await asyncQuerySelector(container, selector);
            clearTimeout(timer);
            return element;
        } catch {
            console.log(`#${counter++} attempt to find element: ${selector}`);
        }
    }
};


asyncFindElement(document, 'div[data-field-reference="type1234"]').then((type123) => {
	if(type123){
	    type123.querySelector('input[type="text"]').onclick = function(){
            createModal(type123.querySelector('input[type="text"]'));
            //this.value = selectorValue;
	    }
	}
}).catch(console.error)

async function callLiferayAPI(endpoint, method = 'GET', data = null) {

  const authToken = Liferay.authToken;

  console.log(`authToken: ${authToken}`); 
  const headers = {
    'x-csrf-token': authToken,
    'Content-Type': 'application/json'
  };

  const response = await Liferay.Util.fetch(endpoint, {
    method,
    headers,
    body: data ? JSON.stringify(data) : null
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function createModal(object1) {
    // Create the modal element
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Select an Option</h2>
        <div class="modal-custom-selector">
            <select id="optionSelector">
                <option value=""></option>
            </select>
        </div>
      </div>
    `;
  
    // Append the modal to the document body
    document.body.appendChild(modal);
  
    // Add event listeners
    const closeButton = modal.querySelector('.close');
    closeButton.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    const optionSelector = modal.querySelector('#optionSelector');

    // Fetch options from the REST API
    try {
        const apiEndpoint = 'http://localhost:8080/o/c/selectors/';
        const response = await callLiferayAPI(apiEndpoint);
        //const data = await response.json();
    
        console.log(`Response: ${response.items}`); 
        // Populate the select element with options
        response.items.forEach(item => {
            const option = document.createElement('option');
            option.value = item.value;
            option.textContent = item.option;
            optionSelector.appendChild(option);
          });
    
        // Add event listener for option selection
        optionSelector.addEventListener('change', () => {
        const selectedOption = optionSelector[optionSelector.selectedIndex].textContent;
        console.log(`Selected option: ${selectedOption}`);
        object1.value = selectedOption;
        modal.style.display = 'none';
        });
      } catch (error) {
        console.error('Error fetching options:', error);
      }
  
    // Show the modal and apply styles
    modal.style.display = 'block';
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
    modal.style.zIndex = '1';
  
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.backgroundColor = '#fff';
    modalContent.style.padding = '20px';
    modalContent.style.border = '1px solid #ccc';
    modalContent.style.top = '50%';
    modalContent.style.width = '50%';
    modalContent.style.margin = 'auto';
    modalContent.style.verticalAlign = 'middle';

    const modalCustomSelector = modal.querySelector('.modal-custom-selector');
    modalCustomSelector.style.paddingTop = '1rem';

    optionSelector.style.border = '1px solid #ccc';
    
  }
  
 
  