### README for MyInvestor

* * *

## **Introduction**
![image](https://github.com/user-attachments/assets/4dd47d7d-c919-4b82-94e4-730ee8bcd397)
![image](https://github.com/user-attachments/assets/aea794ac-b65f-4771-a490-2292b7311557)
![image](https://github.com/user-attachments/assets/749a76c8-f533-475c-a0c7-2d0966917ead)

The `MyInvestor` is a React-based module that enables users to buy or sell stocks by interacting with a simple UI. It connects to a backend API to fetch stock details and perform stock transactions, updating the available share amount in the database in real-time.

* * *

## **Features**

* **View Stock Details**: Fetch stock data from the backend using the stock ID.
* **Increment/Decrement Quantity**: Adjust the number of shares to buy or sell.
* **Buy Stocks**: Increases the share amount for a given stock in the database.
* **Sell Stocks**: Decreases the share amount for a given stock with validation to prevent overselling.
* **Dynamic Subtotal Calculation**: Displays the subtotal price based on the selected quantity and the stock's current price.
* **Error Handling**: Provides alerts for errors, such as insufficient shares or API failures.

* * *

## **Setup and Installation**

1. **Clone the Repository**:
    
    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```
    
2. **Install Dependencies**:
    
    ```bash
    npm install
    ```
    
3. **Set Up Backend**:
    * go to .env update the MONGO_URI=ADD_YOUR_MONGO_URI
    * Ensure the backend provides API endpoints as described in the **Backend Requirements** section.
    * Update the base API URL in the `watchlistApiSlice`.
4. **Start the Development Server**:
    
    ```bash
    npm data:import
    npm run dev
    ```
    
5. **Navigate to the Application**:
    
    * Open a browser and go to `http://localhost:5173`.

* * *

## **Component Usage**

### **1. Fetch Stock Details**

The component fetches stock details using the stock ID from the URL parameters.

### **2. Buy and Sell Operations**

* **Buy**:
    * Increments the `shareAmount` in the database based on the selected quantity.
    * Displays a success message upon completion.
* **Sell**:
    * Validates if the selected quantity is less than or equal to the current `shareAmount`.
    * Decrements the `shareAmount` in the database.

* * *


## **License**

This project is licensed under the MIT License.

* * *

## **Contributors**

* **Your Name** - Developer
* **Your Team Members** - Collaborators

For any issues or contributions, please contact [your-email@example.com].
npm run data:import
