import { Box, Grid, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import CountUp from 'react-countup';
import { VisibilityObserver } from 'reactjs-visibility';

export default function CounterUp() {
	const [loading, setLoading] = useState(false);
	const onVisibilityChange = (isVisible: boolean) => {
		if (isVisible) {
			setLoading(true);
		}
	};

	const options = {
		rootMargin: '200px',
	};

	const data = [
		{ icon: '/img/area.png', end: 25, suffix: '+', label: 'Total Area Sq' },
		{ icon: '/img/apartment.png', end: 25, suffix: 'K+', label: 'Apartments Sold' },
		{ icon: '/img/excavator.png', end: 25, suffix: '+', label: 'Total Constructions' },
		{ icon: '/img/armchair.png', end: 25, suffix: '+', label: 'Apartio Rooms' },
	];

	return (
		<div style={{ background: '#F6F6F6' }}>
			<Stack className="container" justifyContent={'center'} height={'430px'} bg={'#F2F6F7'}>
				<Grid container spacing={4}>
					{data.map((item, index) => (
						<Grid item xs={12} sm={6} md={3} key={index} sx={{ textAlign: 'center' }}>
							<Box
								sx={{
									display: 'flex',
									gap: '15px',
									flexDirection: 'column',

									alignItems: 'center',
								}}
							>
								<img src={item.icon} alt="" width={100} />

								<Typography variant="h1" component="h1">
									<VisibilityObserver onChangeVisibility={onVisibilityChange} options={options}>
										<CountUp
											className="count-text"
											start={0}
											end={loading ? item.end : 0}
											suffix={item.suffix}
											duration={5}
										/>
									</VisibilityObserver>
								</Typography>
								<span style={{ fontWeight: 'bold' }}>{item.label}</span>
							</Box>
						</Grid>
					))}
				</Grid>
			</Stack>
		</div>
	);
}
