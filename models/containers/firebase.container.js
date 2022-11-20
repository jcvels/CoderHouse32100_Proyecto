const admin = require('firebase-admin')
const { getFirestore } = require("firebase-admin/firestore")
const firebaseConfig = require('../../config/databases.config').firebase;

const connect = () => {
    admin.initializeApp({
        credential: admin.credential.cert(firebaseConfig.credentials)
    })
}

connect();

class FirebaseContainer {

    constructor(collection){
        const db = getFirestore()
        this.query= db.collection(collection)
    }

    async create(data_to_save) {
        const  docRef = this.query.doc();
        return await docRef.set(data_to_save)
    }

    async read( id = null ) {
        if(id === null ) {
            const docRef = await this.query.get();
            const documents = docRef.docs;
            return documents.map(document =>{
                return { id:document.id, ...document.data() }
            });
        }
        else {
            const docRef = await this.query.doc(id);
            if(!docRef) throw 'Required document does not exist in our records';
            const document = await docRef.get()
            return document.data()
        }
    }

    async update(id, data_to_save) {
        const docRef = this.query.doc(id);
        if(!docRef) throw 'Required document does not exist in our records';
        return await docRef.update(data_to_save)
    }

    async delete(id){
        const docRef = this.query.doc(id)
        return await docRef.delete()
    }

}

module.exports = FirebaseContainer;