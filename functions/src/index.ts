import * as functions from 'firebase-functions';

// Firebase
import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);


// Cloud Vision
import * as vision from '@google-cloud/vision';
const visionClient =  new vision.ImageAnnotatorClient();

const bucketName = 'firestarter-96e46-vision';



export const imageTagger = functions.storage
    
    .bucket(bucketName)
    .object()
    .onChange( async event => {

            const object = event.data;
            const filePath = object.name;   

            const imageUri = `gs://${bucketName}/${filePath}`;

            const docId = filePath.split('.jpg')[0];
            console.log(2, docId)
            const docRef  = admin.firestore().collection('photos').doc(docId);
    

            const results = await visionClient.labelDetection(imageUri);
            const labels = results[0].labelAnnotations.map(obj => obj.description);

            console.log(3, results)


            return docRef.set({ labels })
                

});
