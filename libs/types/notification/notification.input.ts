import { NotificationGroup, NotificationStatus, NotificationType } from '../../enums/notification.enum';

export interface NotificationInput {
	notificationType: NotificationType;

	notificationStatus?: NotificationStatus.WAIT;

	notificationGroup: NotificationGroup;

	notificationTitle: string;

	notificationDesc?: string;

	authorId: string;

	receiverId: string;

	propertyId?: string;

	articleId?: string;
}
