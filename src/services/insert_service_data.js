import { fireStore, imageDb } from "../utils/firebase";
import { collection, addDoc } from "@firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import { v4 as uuidv4 } from "uuid";

// Function to upload images and return their URLs
export const insertImages = async (imageData, serviceType) => {
    const imageUrls = []; // Array to store image URLs

    for (const file of imageData) {
        const imgRef = ref(imageDb, `${serviceType}/${uuidv4()}`); // Create a reference for each image
        const snapshot = await uploadBytes(imgRef, file); // Upload image
        const url = await getDownloadURL(snapshot.ref); // Get download URL of uploaded image
        imageUrls.push(url); // Add URL to the array
    }

    return imageUrls; // Return the array of image URLs
};

// Function to insert service data into Firestore
export const insertServiceData = async (serviceType, serviceData) => {
    const collectionRef = collection(fireStore, serviceType);

    try {
        const imageUrls = await insertImages(serviceData.photo, serviceType); // Get URLs of uploaded images

        // Prepare data object without the `photo` field
        const { photo, ...otherData } = serviceData;

        const data = {
            serviceType: serviceType,
            name:otherData.name,
            boardingCapacity: otherData.capacity, // Add other service data
            price: otherData.price, // Add other service data
            displayImages: imageUrls, // Add image URLs to the data
        };

        console.log(data);
        
        await addDoc(collectionRef, data); // Add data to Firestore
        console.log("Document successfully written!");

    } catch (err) {
        console.error("Error adding document: ", err); // Log any errors
    }
};
