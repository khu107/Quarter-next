import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { useQuery, useReactiveVar } from '@apollo/client';
import { GET_NOTIFICATIONS } from '../../../apollo/user/query';
import { T } from '../../types/common';
import { Notification } from '../../types/notification/notification';
import { userVar } from '../../../apollo/store';
import { Badge } from '@mui/material';
import { NotificationStatus } from '../../enums/notification.enum';
export default function BasicPopover() {
	const user = useReactiveVar(userVar);
	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
	const [notification, setNotification] = React.useState<Notification[]>([]);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;
	console.log(notification);

	const {
		loading: getNotificationsLoading,
		data: getNotificationsData,
		error: getNotificationsError,
		refetch: getNotificationsRefetch,
	} = useQuery(GET_NOTIFICATIONS, {
		fetchPolicy: 'cache-and-network',
		variables: { input: '' },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			if (data?.getNotifications) setNotification(data?.getNotifications);
		},
	});

	return (
		<div>
			<Badge
				badgeContent={
					notification?.filter(
						(ele) => ele.receiverId === user._id && ele.notificationStatus === NotificationStatus.WAIT,
					).length
				}
				color="secondary"
			>
				<NotificationsOutlinedIcon onClick={handleClick} />
			</Badge>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				{notification?.map((ele: Notification) => {
					if (ele.receiverId === user._id) {
						return (
							<Typography key={ele._id} sx={{ p: 2 }}>
								{ele.notificationDesc}
							</Typography>
						);
					}
				})}
			</Popover>
		</div>
	);
}
