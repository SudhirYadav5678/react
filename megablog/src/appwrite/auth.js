import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";
export class AuthService{
    clinet= new Client();
    account;
    constructor(){ // constructer are self calling functions.
        this.clinet
         .setEndpoint(conf.appwriteUrl) 
         .setProject(conf.appwriteProjectID);

        this.account= new Account(this.clinet);
    }
    // account create 
    async createAccount({email, name, password }){
        try {
            const userAccount=await this.account.create(ID.unique(), email, name, password)
            if (userAccount) {
                //call another account for login
                return this.login({email, password})
            } else {
                
            }
        } catch (error) {
            throw error;
        }
    }
    
    // login
    async login({email, password}){
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            throw error;

        }
    }
    
    // userCurrentStatus
    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("this is appwrite error", error);
        }
        return null;
    }

    //logout
    async logOut(){
        try { await this.account.deleteSession();
        } catch (error) {
            
        }
    }


}

const authService= new AuthService(this)

export default authService;