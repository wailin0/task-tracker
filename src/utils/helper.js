import storage from "./storage";

export const uploadFile = async (file) => {
    const GET_FILE_UPLOAD_URL = `
mutation getImageUploadUrl {
  getImageUploadUrl(contentType: "image") {
    error
    imageName
    imageUploadUrl
    message
  }
}`;
    try {
        const token = await storage.getToken()
        const response = await fetch('http://52.74.41.188:8080/v1/graphql', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                query: GET_FILE_UPLOAD_URL
            }),
        });
        const fileUploadRes = await response.json();
        const fileUri = await fetch(file);
        const blob = await fileUri.blob();
        const uploadedImageUrl = await fetch(fileUploadRes.data.getImageUploadUrl.imageUploadUrl, {
            method: "PUT",
            headers: {
                "Content-Type": `image/*`,
                "x-amz-acl": "public-read",
            },
            body: blob,
        });
        return uploadedImageUrl.url.split("?")[0];
    } catch (e) {
        throw new Error(e);
    }
};
