import HashMap from './HashMap.js';

const testHashMap = () => {
    const map = new HashMap();

    console.log("### Testing HashMap ###");

    // Test: Add key-value pairs
    map.set("name", "Alice");
    map.set("age", 25);
    map.set("city", "New York");
    console.log("Set values: ", map.entries()); // Should show all key-value pairs

    // Test: Get value by key
    console.log("Get 'name': ", map.get("name")); // Should return "Alice"
    console.log("Get 'age': ", map.get("age")); // Should return 25
    console.log("Get 'nonexistent': ", map.get("nonexistent")); // Should return null

    // Test: Has key
    console.log("Has 'name': ", map.has("name")); // Should return true
    console.log("Has 'country': ", map.has("country")); // Should return false

    // Test: Overwrite existing key
    map.set("name", "Bob");
    console.log("Overwrite 'name': ", map.get("name")); // Should return "Bob"

    // Test: Remove key
    console.log("Remove 'city': ", map.remove("city")); // Should return true
    console.log("Get 'city': ", map.get("city")); // Should return null
    console.log("Remove 'nonexistent': ", map.remove("nonexistent")); // Should return false

    // Test: Length of map
    console.log("Length: ", map.length()); // Should return 2 (name and age)

    // Test: Resize (force it by adding many keys)
    for (let i = 1; i <= 20; i++) {
        map.set(`key${i}`, i);
    }
    console.log("After resize, length: ", map.length()); // Should return 22 (20 + 2 existing keys)
    console.log("Keys: ", map.keys()); // Should list all keys
    console.log("Values: ", map.values()); // Should list all values

    // Test: Clear map
    map.clear();
    console.log("After clear, length: ", map.length()); // Should return 0
    console.log("Keys after clear: ", map.keys()); // Should return []

    console.log("### All tests completed ###");
};

// Run the test
testHashMap();
