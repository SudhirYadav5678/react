import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client= new Client;
    databases; // this is variablwes in class
    bucket;
    constructor(){
        this.clinet
        .setEndpoint(conf.appwriteUrl) 
        .setProject(conf.appwriteProjectID);
        this.databases=new Databases(this.client)
        this.bucket=new Storage(this.client)
    }
    async createPost({title, slug, content, featuredImage, status, userId}){
            try {
                return await this.databases.createDocument(
                    conf.appwriteDatabase,
                    conf.appwriteCollection,
                    slug,
                    {
                        title,
                        content,
                        featuredImage,
                        status,
                        userId
                    }
                )
            } catch (error) {
                console.log("Appwrite service error", error);
    }
    }
    async updatePost(slug,{title, content, featuredImage, status}){
        try {
            await this.databases.updateDocument(
                conf.appwriteDatabase,
                conf.appwriteCollection,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                })
        } catch (error) {
            console.log("this is appwrite error update",error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabase,
                conf.appwriteCollection,
                slug,
                )
                return true;
        } catch (error) {
            console.log("this is appwrite error update",error);
            return false;
        }
    }

    //to get single post
    async getPost(slug){
         try {
            await this.databases.getDocument(
                conf.appwriteDatabase,
                conf.appwriteCollection,
                slug,
            )
         } catch (error) {
            console.log("appwrite service get", error);
         }
    }
    //to get multiple post with active 
    async getPosts(query=[Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabase,
                conf.appwriteCollection,
                query,
            )
        } catch (error) {
            console.log("appwrite service",error);
        }
    }

    //files uploading service 
    async uploadFiles(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucket,
                ID.unique,
                file
            )
        } catch (error) {
            console.log("uploading files error", error);
            return false;
        }
    }

    //delete files
    async deleteFiles(filesId){
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucket,
                filesId

            )
            return true;
        } catch (error) {
            console.log("appwrite delete file error", error);
            return false
        }
    }

    //files preview
    getFilesPreviews(filesId){
        this.bucket.getFilePreview(
            conf.appwriteBucket,
            filesId
        )
    }
};

const service= new Service();
export default service;