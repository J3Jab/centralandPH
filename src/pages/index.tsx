import Head from 'next/head';
import ProductItem, {
	ProductProps,
} from '../components/ProductItem/ProductItem';
import TempProductItem from '../components/ProductItem/TempProductItem';
import { SimpleGrid, TextInput } from '@mantine/core';
import { useState, useEffect, useRef } from 'react';
import SearchIcon from '../components/Icons/SearchIcon';
import HomeChip from '../components/Chips/HomeChip';
import Link from 'next/link';

export default function IndexPage() {
	const [isLoading, setLoading] = useState(false);
	const [hotItems, setHotItems] = useState([]);
  const [newItems, setNewItems] = useState([])
	const [whatsHotChips, setWhatsHotChips] = useState([
		{ label: 'Games', isActive: false },
		{ label: 'Consoles', isActive: false },
		{ label: 'PC Parts', isActive: false },
		{ label: 'Peripherals', isActive: false },
	]);
	const [newlyListedChips, setNewlyListedChips] = useState([
		{ label: 'Games', isActive: false },
		{ label: 'Consoles', isActive: false },
		{ label: 'PC Parts', isActive: false },
		{ label: 'Peripherals', isActive: false },
	]);

	const handleSetActive = (label: String, setname: String) => {
		switch (setname) {
			case 'whatsHot':
				let newWhatsHotChips = whatsHotChips.map((chip) => {
					let returnChip = { ...chip };
					if (chip.label === label) returnChip.isActive = !chip.isActive;
					else returnChip.isActive = false;
					return returnChip;
				});
				setWhatsHotChips(newWhatsHotChips);
				break;
			case 'newlyListed':
				let newNewlyListedChips = newlyListedChips.map((chip) => {
					let returnChip = { ...chip };
					if (chip.label === label) returnChip.isActive = !chip.isActive;
					else returnChip.isActive = false;
					return returnChip;
				});
				setNewlyListedChips(newNewlyListedChips);
				break;
			default:
				break;
		}
	};

	// Update hotItems whenever data changes
	useEffect(() => {
		setLoading(true);
		fetch('/api/products/whats_hot')
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setHotItems(data);
				setLoading(false);
				// console.log(hotItems);
			});
      setLoading(true);
      fetch('/api/products/newly_listed')
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setNewItems(data);
				setLoading(false);
				// console.log(hotItems);
			});
	}, []);

	return (
		<>
			<Head>
				<title>Centraland</title>
			</Head>

			{/* <section className='py-10'>
				<form action='/all'>
					<div className='flex justify-center'>
						<TextInput
							placeholder='Search'
							radius={10}
							value={searchVal}
							className='w-1/2'
							onChange={(event) => {
								setSearchVal(event.currentTarget.value);
							}}
							icon={<SearchIcon size={14} />}
						/>
					</div>
				</form>
			</section> */}

			{/* What's Hot Section */}
			<section className=''>
				<div className='flex flex-col gap-5 px-20'>
					<div className='flex justify-between items-center'>
						<h2 className='section-header'>What&apos;s Hot?</h2>
						<Link href='/all'>
							<p className='text-app-mint-green underline'>See more</p>
						</Link>
					</div>

					{/* Chips */}
					<div className='flex flex-wrap gap-3'>
						{/* <HomeChip label='Graphic Cards' isActive={true} />
						<HomeChip label='PS5 Games' isActive={false} />
						<HomeChip label='Nintendo Switch Games' isActive={false} />
						<HomeChip label='Keyboards' isActive={false} />
						<HomeChip label='Monitors' isActive={false} /> */}
						{whatsHotChips.map((chip) => (
							<HomeChip
								key={chip.label}
								label={chip.label}
								isActive={chip.isActive}
								handleSetActive={handleSetActive}
								setname={'whatsHot'}
							/>
						))}
					</div>

					<SimpleGrid
						// cols={6}
						// spacing='xs'
						verticalSpacing='xl'
            breakpoints={[
              // { maxWidth: 'md', cols: 4, spacing: 'xs' },
              // { maxWidth: 'sm', cols: 2, spacing: 'xs' },
              { minWidth: 2560, cols: 8, spacing: 'xs' },
              { minWidth: 1440, cols: 6, spacing: 'xs' },
              { minWidth: 1200, cols: 4, spacing: 'xs' },
              { minWidth: 1080, cols: 3, spacing: 'xs' },
            ]}
						sx={{
							placeItems: 'center',
							alignItems: 'center',
						}}
					>
						{hotItems.map((item: ProductProps, index) => (
							<ProductItem key={index} {...item} />
						))}
					</SimpleGrid>
				</div>
			</section>

			{/* Newly Listed */}
			<section className=''>
				<div className='flex flex-col gap-5 px-20'>
					<div className='flex justify-between items-center'>
						<h2 className='section-header'>Newly Listed</h2>
						<Link href='/all'>
							<p className='text-app-mint-green underline'>See more</p>
						</Link>
					</div>

					{/* Chips */}
					<div className='flex flex-wrap gap-3'>
						{/* <HomeChip label='Graphic Cards' isActive={true} />
						<HomeChip label='Xbox Games' isActive={false} />
						<HomeChip label='Mousepads' isActive={false} />
						<HomeChip label='Mouse' isActive={false} />
						<HomeChip label='Keyboards' isActive={false} /> */}
						{newlyListedChips.map((chip) => (
							<HomeChip
								key={chip.label}
								label={chip.label}
								isActive={chip.isActive}
								handleSetActive={handleSetActive}
								setname={'newlyListed'}
							/>
						))}
					</div>

					<SimpleGrid
						verticalSpacing='xl'
            breakpoints={[
              // { maxWidth: 'md', cols: 4, spacing: 'xs' },
              // { maxWidth: 'sm', cols: 2, spacing: 'xs' },
              { minWidth: 2560, cols: 8, spacing: 'md' },
              { minWidth: 1440, cols: 6, spacing: 'md' },
              { minWidth: 1200, cols: 4, spacing: 'md' },
              { minWidth: 1080, cols: 3, spacing: 'md' },
            ]}
						sx={{
							placeItems: 'center',
							alignItems: 'center',
						}}
					>
						{newItems.map((item: ProductProps, index) => (
							<ProductItem key={index} {...item} />
						))}
					</SimpleGrid>
				</div>
			</section>

			{/* For You */}
		</>
	);
}
