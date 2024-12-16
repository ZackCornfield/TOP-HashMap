export default class HashMap {
    constructor() {
        this.bucketsArray = new Array(16).fill(null);
        this.loadFactor = 0.75;
        this.capacity = this.bucketsArray.length;
        this.occupied = 0; 
    }

    hash(key) {
        let hashKey = 0;
        const prime = 11;
        for (let i = 0; i < key.length; i++) {
            hashKey += key.charCodeAt(i) * prime;
        }
        return hashKey % this.capacity;
    }

    resize() {
        const oldBuckets = this.bucketsArray;   
        this.capacity *= 2;
        this.bucketsArray = new Array(this.capacity).fill(null);

        oldBuckets.forEach((bucket) => {  
            if (bucket) {
                bucket.forEach(([key, value]) => {
                    this.set(key, value);
                });
            }
        });        
    }

    set(key, value) {
        const loadFactor = this.occupied / this.capacity;
        if (loadFactor > this.loadFactor) {
            this.resize();
        }
    
        const index = this.hash(key);
        if (!this.bucketsArray[index]) {
            this.occupied += 1;
            this.bucketsArray[index] = [[key, value]];
        } else {
            const bucket = this.bucketsArray[index];
            const itemIndex = bucket.findIndex((item) => item[0] === key);
            if (itemIndex !== -1) {
                bucket[itemIndex][1] = value; // Update value if key exists
            } else {
                bucket.push([key, value]); // Add new key-value pair
            }
        }
    }    

    get(key) {
        const index = this.hash(key);
        const bucket = this.bucketsArray[index];
        if (!bucket) {
            return null;
        }
        const item = bucket.find((item) => item[0] === key);
        return item ? item[1] : null; // Safely handle non-existing key
    }    

    has(key) {
        const index = this.hash(key);
        const bucket = this.bucketsArray[index];
        if (!bucket) {
            return false;
        }
        return bucket.some((item) => item[0] === key);
    }

    remove(key) {
        const index = this.hash(key);
        const bucket = this.bucketsArray[index];
        if (!bucket) {
            return false;
        }
        const itemIndex = bucket.findIndex((item) => item[0] === key);
        if (itemIndex === -1) {
            return false;
        }
        bucket.splice(itemIndex, 1);
        this.occupied -= 1;
        return true;
    }

    length() {
        let counter = 0;
        this.bucketsArray.forEach((bucket) => {
            if (bucket) {
                counter += bucket.length; // Count all entries in the bucket
            }
        });
        return counter;
    }    

    clear() {
        this.bucketsArray = new Array(16).fill(null);
        this.occupied = 0;
    }

    keys() {
        const keysArray = [];
        this.bucketsArray.forEach((bucket) => {
            if (bucket) {
                bucket.forEach(([key]) => keysArray.push(key));
            }
        });
        return keysArray;
    }

    values() {
        const valuesArray = [];
        this.bucketsArray.forEach((bucket) => {
            if (bucket) {
                bucket.forEach(([key, value]) => valuesArray.push(value)); // Fix destructuring
            }
        });
        return valuesArray;
    }    

    entries() {
        const entriesArray = [];
        this.bucketsArray.forEach((bucket) => {
            if (bucket) {
                bucket.forEach(([key, value]) => entriesArray.push([key, value]));
            }
        });
        return entriesArray;
    }
}