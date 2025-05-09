
class userStorage {

    constructor(key) {
        this.key = key;
 
    }
   
    setStorage(data){
        localStorage.setItem(this.key,JSON.stringify(data))
    };
    getStorage(){
        return JSON.parse(localStorage.getItem(this.key)) || [];
    };
    removeItem(id){
        let userData = this.getStorage();
        if (userData && userData.length > 0){
            userData = userData.filter(item => item.uuid !== id);
            this.setStorage(userData);
            console.log(`${id} deleted successfully`)
        }
        else{
            console.log(`localStorage empty!`);
            return 

        }
    };
}

export const userTasksStorage = new userStorage('tasks');
export const userProjectStorage = new userStorage('projects');

