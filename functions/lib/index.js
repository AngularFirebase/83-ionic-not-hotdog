"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
// Firebase
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
// Cloud Vision
const vision = require("@google-cloud/vision");
const visionClient = new vision.ImageAnnotatorClient();
const bucketName = 'firestarter-96e46-vision';
exports.imageTagger = functions.storage
    .bucket(bucketName)
    .object()
    .onChange((event) => __awaiter(this, void 0, void 0, function* () {
    try {
        const object = event.data;
        const filePath = object.name;
        const imageUri = `gs://${bucketName}/${filePath}`;
        const docId = filePath.split('.jpg')[0];
        console.log(2, docId);
        const docRef = admin.firestore().collection('photos').doc(docId);
        const results = yield visionClient.labelDetection(imageUri);
        const labels = results[0].labelAnnotations.map(obj => obj.description);
        console.log(3, results);
        return docRef.set({ labels });
    }
    catch (err) {
        console.log(err);
        return null;
    }
}));
//# sourceMappingURL=index.js.map