import ImageKit from '@imagekit/nodejs';

const IMAGEKIT_PRIVATE_KEY = process.env.IMAGEKIT_PRIVATE_KEY

if (!IMAGEKIT_PRIVATE_KEY) {
    throw new Error("Add the imagekit private key in the .env file")
}

const imagekit = new ImageKit({
    privateKey: IMAGEKIT_PRIVATE_KEY
});

export default imagekit