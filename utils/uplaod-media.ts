import createMedia from "@/actions/media/create-media";
import { upload } from "@imagekit/next"

const authenticator = async () => {
    try {
        const response = await fetch("/api/upload-auth");
        if (!response.ok) {
            const errorText = await response.text();
            return { error: `Request failed with status ${response.status}: ${errorText}` }
        }

        const data = await response.json();
        const { signature, expire, token, publicKey } = data;
        return { signature, expire, token, publicKey };
    } catch (error) {
        console.error("Authentication error:", error);
        return { error: "Authentication request failed" }
    }
};

const uploadMedia = async (file: File) => {

    const authParams = await authenticator();
    if (authParams.error) {
        return { error: authParams.error }
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
            const { fileType, url, fileId, height, width } = uploadResponse
            if (fileType && url && fileId && height && width) {
                const media = await createMedia({ type: fileType, url, fileId, height, width })
                if (media.error) return { error: media.error }
                return { fileId: media.mediaId as string }
            }
        } else {
            return { error: "Something went wrong uploading media" }
        }
    } catch (error) {
        console.error(error)
        return { error: "Something went wrong uploading media" }
    }
};

export default uploadMedia