import config from '../config/config';
import { Client, Databases} from "appwrite";

export class Service{
    client = new Client();
    databases;
    
    constructor(){
        this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    async saveCode({code, language, userId}){
        try {
            return await this.databases.createDocument(
              config.appwriteDatabaseId,
              config. appwriteCollectionId_userCode,
              userId,
              {
                code,
                language
              }  
            )
        } catch (error) {
            console.log("Appwrite service :: saveCode :: error", error)
        }
    }

    async updateCode(userId, {code, language}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config. appwriteCollectionId_userCode,
                userId,
                {
                    code,
                    language 
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updateCode :: error", error) 
        }
    }


    async getCode(userId) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config. appwriteCollectionId_userCode,
                userId
            )
        } catch (error) {
            console.log("Appwrite service :: getCode :: error", error);
            return false
        }
    }
}

const appwriteService = new Service()

export default appwriteService