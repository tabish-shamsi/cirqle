import { upload } from "@imagekit/next"

const authenticator = async () => {
    try {
        const response = await fetch("/api/upload-auth");
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token, publicKey } = data;
        return { signature, expire, token, publicKey };
    } catch (error) {
        console.error("Authentication error:", error);
        throw new Error("Authentication request failed");
    }
};

const uploadMedia = async (file: File) => {
    let authParams;

    try {
        authParams = await authenticator();
    } catch (authError) {
        console.error("Failed to authenticate for upload:", authError);
        return
    }

    const { signature, expire, token, publicKey } = authParams;
    const abortController = new AbortController();

    try {

        const uploadResponse = await upload({
            expire,
            token,
            signature,
            publicKey,
            file,
            fileName: file.name,
            folder: "cirqle",
            abortSignal: abortController.signal,
        });

        if (uploadResponse) {
            return { url: uploadResponse.url, imagekitId: uploadResponse.fileId, type: uploadResponse.fileType }
        }
    } catch (error) {
        console.error(error)
    }
};

export default uploadMedia