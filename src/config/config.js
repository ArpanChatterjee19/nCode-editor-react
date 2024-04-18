const config = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),

    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),

    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),

    appwriteCollectionId_userCode: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_USER_CODE_DB),

    appwriteCollectionId_problemSet: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_CODING_PROBLEM_SET ),
    
    appwriteCollectionId_userSolutions: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_USER_SOLUTIONS ),
}

export default config