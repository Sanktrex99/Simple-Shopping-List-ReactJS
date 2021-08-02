import React, { useState } from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faCircle, faCheckCircle, faPlus } from '@fortawesome/free-solid-svg-icons';

const App = () => {
	// HINT: each "item" in our list names a name, a boolean to tell if its been completed, and a quantity
	const [items, setItems] = useState([
		{
			itemName: "item 1",
			quantity: 1,
			isSelected: false
		},
		{
			itemName: "item 2",
			quantity: 2,
			isSelected: false
		}
	]);

	const [inputValue, setInputValue] = useState('');
	const [totalItemCount, setTotalItemCount] = useState(3);

	const handleAddButtonClick = () => {
		const newItem = {
			itemName: inputValue,
			quantity: 1,
			isSelected: false
		}
		if (newItem.itemName) {
			const newItems = [...items, newItem];
			setItems(newItems);
			setInputValue('');
		}
		else {
			alert("Enter a valid Name !");
		}
	}


	const handleQuantityIncrease = (index) => {
		const newItems = [...items]

		newItems[index].quantity++;
		setItems(newItems);
		calculateTotal(newItems);

	}

	const handleQuantityDecrease = (index) => {
		const newItems = [...items]
		if (newItems[index].quantity > 0) {
			newItems[index].quantity--;
			setItems(newItems);
			calculateTotal(newItems);
		}
		else {
			alert("Item Quantity cannot be Negative !");
		}
	}

	const toggleComplete = (index) => {
		const newItems = [...items]

		const selectedItem = newItems[index].itemName;

		newItems[index].isSelected = !newItems[index].isSelected;
		setItems(newItems);
		const filteredItems = newItems.filter((item) => item.itemName !== selectedItem);
		calculateTotal(filteredItems);

	}

	const calculateTotal = (itemList) => {
		var totalItemCount = itemList.reduce((total, item) => {
			return total + item.quantity;
		}, 0);
		setTotalItemCount(totalItemCount);
	}

	const handleItemEdit = (index) => {
		const newItems = [...items];

		var newItemName = prompt("Please enter a new name for the item:");
		if (newItemName) {
			newItems[index].itemName = newItemName;
			setItems(newItems);
		}
	}

	const handleItemRemove = (index) => {
		const newItems = [...items];

		const selectedItem = newItems[index].itemName;

		const filteredItems = newItems.filter((item) => item.itemName !== selectedItem);
		setItems(filteredItems);
		calculateTotal(filteredItems);
	}


	return (
		<div className='app-background'>
			<div className='main-container'>
				<div className='add-item-box'>
					<input value={inputValue} onChange={(event) => setInputValue(event.target.value)} className='add-item-input' placeholder='Add an item...' />
					<FontAwesomeIcon className="add-item-button" icon={faPlus} onClick={handleAddButtonClick} />
				</div>
				<div className='item-list'>
					{items.map((item, index) => <div className='item-container'>
						<div className='item-name'>
							{/* HINT: replace false with a boolean indicating the item has been completed or not */}
							{item.isSelected ? (
								<>
									<FontAwesomeIcon icon={faCheckCircle} onClick={() => toggleComplete(index)} />
									<span className='completed' onClick={() => toggleComplete(index)}>{item.itemName}</span>
									<button className="button-remove" onClick={() => handleItemRemove(index)}>Delete</button>

								</>
							) : (
								<>
									<FontAwesomeIcon icon={faCircle} onClick={() => toggleComplete(index)} />
									<span onClick={() => toggleComplete(index)}>{item.itemName}</span>
									<button className="button-edit" onClick={() => handleItemEdit(index)}>Edit</button>
								</>
							)}
						</div>
						<div className='quantity'>
							<button>
								<FontAwesomeIcon icon={faChevronLeft} onClick={() => handleQuantityDecrease(index)} />
							</button>
							<span> {item.quantity} </span>
							<button>
								<FontAwesomeIcon icon={faChevronRight} onClick={() => handleQuantityIncrease(index)} />
							</button>
						</div>
					</div>)}
				</div>
				<div className='total'>Total: {totalItemCount}</div>
			</div>
		</div>
	);
};

export default App;
