import React, { useState } from 'react';
import './ItemList.css';

const ItemList = () => {
  const [items, setItems] = useState([]); // Array state
  const [inputValue, setInputValue] = useState(''); // Input field state

  // Function to add a new item
  const addItem = () => {
    if (inputValue.trim() !== "") {
      const newItem = {
        id: Date.now(), // Unique ID using timestamp
        text: inputValue
      };
      setItems([...items, newItem]); // Add new item to array
      setInputValue(''); // Clear input
    }
  };

  // Function to remove an item by ID
  const removeItem = (id) => {
    const updatedList = items.filter(item => item.id !== id);
    setItems(updatedList);
  };

  return (
    <div className="list-container">
      <h2>Dynamic Item List</h2>
      
      <div className="input-section">
        <input 
          type="text" 
          placeholder="Enter item name..." 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
        />
        <button onClick={addItem}>Add Item</button>
      </div>

      {/* Conditional Rendering: Show message if list is empty */}
      {items.length === 0 ? (
        <p className="empty-msg">No items in the list. Add some!</p>
      ) : (
        <ul>
          {/* List Rendering using map() */}
          {items.map((item) => (
            <li key={item.id} className="list-item">
              {item.text}
              <button onClick={() => removeItem(item.id)} className="delete-btn">
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemList;