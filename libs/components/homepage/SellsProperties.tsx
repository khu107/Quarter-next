import { Box, Stack } from '@mui/material';
import React, { useState } from 'react';
import { Property } from '../../types/property/property';
import { useQuery } from '@apollo/client';
import { GET_LAST_SOLD_PROPERTY } from '../../../apollo/user/query';
import { T } from '../../types/common';
import { REACT_APP_API_URL } from '../../config';

export default function SellsProperties() {
	const [sellsProperties, setSellsProperties] = useState<Property | null>(null);
	const {
		loading: getPropertiesLoading,
		data: getPropertiesData,
		error: getPropertiesError,
		refetch: getPropertiesRefetch,
	} = useQuery(GET_LAST_SOLD_PROPERTY, {
		fetchPolicy: 'cache-and-network',
		variables: { input: '' },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setSellsProperties(data?.getLastSoldProperty);
		},
	});

	console.log('sellsProperties', sellsProperties);

	return (
		<Stack className={'sels-properties'}>
			<Stack className={'container'}>
				<Box component={'div'} className={'right'}>
					<span>Today Sells Properties</span>
					<p>
						Houzez allow you to design unlimited panels and real estate custom forms to capture leads and keep record of
						all information
					</p>

					<div style={{ marginBottom: '30px', marginTop: '20px' }}>
						<p>- Live Music Cocerts at Luviana</p>
						<p>- Our SecretIsland Boat Tour is Just for You</p>
						<p>- Live Music Cocerts at Luviana</p>
						<p>- Live Music Cocerts at Luviana</p>
					</div>
					<div className="option">
						<div>
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									gap: '5px',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<div>{sellsProperties?.propertyBeds}</div>
								<img src="/img/icons/bed.svg" alt="" />
							</div>
							<span> Bedrooms</span>
						</div>
						<div>
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									gap: '5px',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<div>{sellsProperties?.propertyRooms}</div>
								<img src="/img/icons/room.svg" alt="" />
							</div>
							<span> rooms</span>
						</div>
						<div>
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									gap: '5px',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<div>{sellsProperties?.propertySquare}</div>
								<img src="/img/icons/expand.svg" alt="" />
							</div>
							<span> square Ft</span>
						</div>
					</div>
					<div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
						<img
							src={`${REACT_APP_API_URL}/${sellsProperties?.propertyImages[1]}`}
							alt="agents"
							width={'200px'}
							height={'150px'}
						/>
						<img
							src={`${REACT_APP_API_URL}/${sellsProperties?.propertyImages[2]}`}
							alt="agents"
							width={'200px'}
							height={'150px'}
						/>
						<img
							src={`${REACT_APP_API_URL}/${sellsProperties?.propertyImages[0]}`}
							alt="agents"
							width={'200px'}
							height={'150px'}
						/>
					</div>
				</Box>
				<Box component={'div'} className={'left'}>
					<img src={`${REACT_APP_API_URL}/${sellsProperties?.propertyImages[0]}`} alt="agents" />
				</Box>
			</Stack>
		</Stack>
	);
}
