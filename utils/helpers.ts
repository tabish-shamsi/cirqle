import Notification, { NotificationType } from "@/models/Notification";

export const createNotification = async ({
  type,
  sender,
  reciever,
}: {
  type: NotificationType;
  sender: string;
  reciever: string;
}) => {
  try {
    await Notification.findOneAndDelete({ sender, reciever, type });

    await Notification.create({ sender, reciever, type });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong while sending notificaiton" };
  }
};
