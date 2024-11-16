# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### **High-Level Design (HLD) for `Network Usage Maps` Component**

---

#### **1\. Purpose**

The `UsageMaps` component is responsible for rendering a network usage map that displays regions, their respective network types (e.g., 4G, 5G), and usage statistics (e.g., 500MB, 1GB). It allows users to switch between different map styles, view network markers, and add new cities with usage details to the map.

#### **2\. Components and Subcomponents**

**Main Component**: `UsageMaps`

- **State**:
  - `mapStyle`: Manages the selected map style (default, satellite, or dark).
  - `cities`: Stores the list of cities to be displayed on the map.
  - `showCityForm`: Controls the visibility of the city addition form.
  - `newCity`: Stores the data of the new city being added (region, network, usage).

**Sub-Components**:

- **`ViewButton`**:
  - Represents the buttons for changing the map view (Standard, Satellite, Dark).
  - Takes in props for the icon, label, active state, and click handler.
- **`UsageScale`**:
  - A visual scale for the map usage (likely to show the usage in a readable manner).
- **Map and UI Elements**:
  - **`MapContainer`**: The core container for rendering the map (using React Leaflet).
  - **`TileLayer`**: The map tiles (varies based on the selected style).
  - **`CircleMarker`**: Represents the markers for cities on the map, with dynamic size and color based on usage.
  - **`Popup`**: Displays detailed information when a city marker is clicked.

#### **3\. Data Flow**

- **Initial Data**:
  - **`initialData`**: Populated with cities and their usage data (e.g., city region, coordinates, usage).
  - **`citiesList`**: A predefined list of cities that can be added to the map.
  - **`usageOptions`**: Available usage options for new city data.
- **User Interaction**:
  - **Map Style Toggle**:
    - Users can toggle between three map styles: Standard, Satellite, and Dark.
    - This triggers the `setMapStyle` function, which updates the map style.
  - **City Addition**:
    - A user clicks the "Add City" button, which reveals a form to select a region, network, and usage for a new city.
    - Once the city details are selected, the `handleAddCity` function is triggered, adding the new city to the map.
    - The `newCity` state is used to collect user input for region, network, and usage.
    - Upon adding a city, the form is hidden, and the city data is added to the `cities` state.

#### **4\. UI Flow**

1. **Header Section**:
   - Displays the title "Network Usage Map."
   - Contains map view control buttons: Standard, Satellite, and Dark views.
   - A button to toggle the visibility of the city addition form.
2. **Map Section**:
   - A `MapContainer` renders the map with the selected style.
   - For each city in the `cities` state, a `CircleMarker` is placed on the map.
   - Markers are dynamically sized and colored based on usage, using `getMarkerRadius` and `getColor` functions.
   - A `Popup` appears when a user clicks on a city marker, showing detailed city information.
3. **City Addition Form**:
   - A dropdown for selecting a region from `citiesList`.
   - Dropdowns for selecting network (5G, 4G) and usage (500MB, 1GB, etc.).
   - A button to submit the new city data to the map.

#### **5\. Functions and Logic**

- **`handleAddCity`**:
  - When the "Add City" button is clicked in the form, it checks if a valid city region is selected and adds it to the `cities` array. The city’s usage and network information are used to create a new entry in the `cities` array.
- **`getColor`**:
  - Determines the color of the circle marker based on usage values (e.g., less than 500MB, 1GB, etc.).
- **`getMarkerRadius`**:
  - Determines the size of the circle marker based on usage.

#### **6\. External Dependencies**

- **React**: For component structure, state management, and rendering.
- **React-Leaflet**: For embedding and interacting with Leaflet maps in a React app.
- **Lucide Icons**: For map view control buttons.
- **Leaflet**: Used for creating the interactive map and placing markers.
- **UsageScale Component**: Likely used to display the usage scale visually.

#### **7\. Styles and CSS**

- **CSS Classes**:
  - `.app`, `.container`, `.card`, `.controls`, `.add-city-button`, `.city-form`: Main classes for layout and structure.
  - `.view-button`: Custom button styles for map view toggles.
  - `.map-container`: Container for the map rendering.
  - `.leaflet-map`: Specific class for the map.
  - `.show`: A CSS class used to show or hide the city form.

---

### **Summary of Flow**

1. The component initializes with predefined city data (`initialData`).
2. The user can toggle between map styles (Standard, Satellite, Dark).
3. The user can add new cities by selecting from a dropdown of predefined cities, choosing the network type (e.g., 5G, 4G), and selecting usage.
4. Each city is displayed as a dynamic marker on the map, with varying colors and sizes based on usage.
5. A city’s details (region, network, usage) are shown in a popup when the marker is clicked.

### **Future Enhancements**

- **Validation**: Add validation for city form fields (e.g., check for empty values).
- **Error Handling**: Provide feedback if a city cannot be added due to missing data.
- **Dynamic Map Data**: Use real-time data to populate cities and usage information.

This is a high-level overview that provides a roadmap for understanding the component's structure and data flow. Let me know if you need more details\!
