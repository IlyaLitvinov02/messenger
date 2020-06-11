import firebase from 'firebase/app';
import 'firebase/storage';

export const uploadMessageImage = (image, chatId) => {
    const root = firebase.storage().ref();
    const uniqueImageName = `${Math.floor(Date.now() * (Math.random() * 100))}${image.name}`
    const imageRef = root.child(`chats/${chatId}/images/${uniqueImageName}`);
    return imageRef.put(image);
}