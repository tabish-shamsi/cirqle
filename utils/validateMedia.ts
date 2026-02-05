export default function validateMedia(files: File[]) {
  if (files.length === 0) {
    return { error: "Please an image or video to continue" };
  }

  const images = files.filter((f) => f.type.startsWith("image"));
  const videos = files.filter((f) => f.type.startsWith("video"));

  if (videos.length > 0 && images.length > 0) {
    return { error: "You cannot mix images and videos" };
  }

  if (videos.length > 1) {
    return { error: "Only one video is allowed" };
  }

  if (images.length > 4) {
    return { error: "You can upload up to 4 images" };
  }

  const type: "image" | "video" = videos.length ? "video" : "image";

  return { type };
}