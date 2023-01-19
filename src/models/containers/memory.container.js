class MemoryContainer {

    constructor() {
        this.memoryStorage = [];
    }

    async create(data_to_save) {

       try {
            if( typeof data_to_save !== 'object' ) throw 'ERRROR: El elemento a guardar debe ser un objeto {...}';
            data_to_save.id = this.memoryStorage.length === 0 ? 1 : this.memoryStorage[ this.memoryStorage.length -1 ].id + 1
            data_to_save.timestamp = { create: Date.now(), update: null };
            this.memoryStorage.push( data_to_save );
            return data_to_save;
        }
        catch (error) {
            console.log(error);
        }

    }
    
    async read(id=null) {
        
        try {
            if( id === null ) return this.memoryStorage;
            else{
                if( typeof id !== 'number' ) throw 'ERRROR: El ID debe ser un numero.';
                let response = this.memoryStorage.find( item => item.id === id );
                response = response === undefined ? response = null : response;
                return response;
            }
        }
        catch (error) {
            console.log(error);
        }
        
    }

    async update(id, data_to_save) {

        try {
            if( typeof data_to_save !== 'object' ) throw 'ERRROR: El elemento a guardar debe ser un objeto {...}';
            if( typeof id !== 'number' ) throw 'ERRROR: El ID debe ser un numero.';
            let item_to_modify_index = this.memoryStorage.findIndex( item => item.id === id );
            if( item_to_modify_index === -1 ) return false

            data_to_save.timestamp = {
                create: this.memoryStorage[item_to_modify_index].timestamp.create,
                update: Date.now()
            }
          
            this.memoryStorage[item_to_modify_index] = data_to_save;
            return this.memoryStorage[item_to_modify_index]
        }
        catch (error) {
            console.log(error);
        }

    }
    
    async delete(id) {
        
        try {
            if( typeof id !== 'number' ) throw 'ERRROR: El ID debe ser un numero.';
            let index = this.memoryStorage.findIndex( item => item.id === id );
            if(index !== -1) {
                this.memoryStorage.splice(index,1);
                return true;
            }
            return false;
        }
        catch (error) {
            console.log(error);
        }

    }

}

module.exports = MemoryContainer;